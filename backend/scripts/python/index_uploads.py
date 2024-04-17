import sys
import os
import pickle
import torch
from torch.utils.data import Dataset, DataLoader, dataloader
from annoy import AnnoyIndex
from PIL import Image
from transformers import CLIPProcessor, CLIPVisionModelWithProjection
import time


class ImageDataset(Dataset):
    def __init__(self, image_paths, processor):
        self.image_paths = image_paths
        self.processor = processor

    def __len__(self):
        return len(self.image_paths)

    def __getitem__(self, idx):
        image_path = self.image_paths[idx]
        image = Image.open(image_path).convert("RGB")
        processed = self.processor(images=image, return_tensors="pt")
        return processed['pixel_values'].squeeze(0)


def load_model():
    model = CLIPVisionModelWithProjection.from_pretrained("openai/clip-vit-base-patch32")
    processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")
    return model, processor


def embed_images(uploads_dir):
    model, processor = load_model()
    device = "cuda" if torch.cuda.is_available() else ("mps" if torch.backends.mps.is_available() else "cpu")
    model.to(device)

    if device in ["cuda", "mps"]:
        model = model.half()
        print(f"Using half precision on {device}")

    image_paths = [os.path.join(uploads_dir, fname) for fname in os.listdir(uploads_dir) if
                   os.path.isfile(os.path.join(uploads_dir, fname))]
    dataset = ImageDataset(image_paths, processor)
    data_loader = DataLoader(dataset, batch_size=96, shuffle=False, num_workers=4)

    embeddings_list = []
    with torch.no_grad():
        for pixel_values in data_loader:
            pixel_values = pixel_values.to(device)
            if device in ["cuda", "mps"]:
                pixel_values = pixel_values.half()
            embeddings_batch = model(pixel_values=pixel_values).image_embeds
            embeddings_list.append(embeddings_batch)

    all_embeddings = torch.cat(embeddings_list, dim=0).cpu().numpy()
    embeddings = {os.path.basename(image_paths[i]): all_embeddings[i] for i in range(len(image_paths))}

    return embeddings


def create_index(embeddings, index_dir):
    id_to_filename = {}
    index = AnnoyIndex(f=512, metric="angular")
    for i, (image_name, embedding) in enumerate(embeddings.items()):
        id_to_filename[i] = image_name
        index.add_item(i, embedding)
    index.build(128, 2)

    index.save(index_dir + "vector_index.ann")
    with open(index_dir + "id_to_filename.pkl", "wb") as f:
        pickle.dump(id_to_filename, f)


if __name__ == "__main__":
    if len(sys.argv) < 1:
        print("Usage: python3 index_uploads.py")
        sys.exit(1)

    uploads_directory = './uploads/'
    index_directory = './index/'

    start = time.time()

    embedding_dict = embed_images(uploads_directory)
    embedded = time.time()
    create_index(embedding_dict, index_directory)
    completed = time.time()
    print(f"\nTotal time: {completed - start} seconds | {embedded - start} seconds to embed | {completed - embedded} seconds to index")

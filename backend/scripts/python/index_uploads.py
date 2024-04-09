import sys
import os
import pickle
import torch
from annoy import AnnoyIndex
from PIL import Image
from transformers import CLIPProcessor, CLIPVisionModelWithProjection


def load_model():
    model = CLIPVisionModelWithProjection.from_pretrained("openai/clip-vit-base-patch32")
    processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")
    return model, processor


def embed_images(uploads_dir):
    model, processor = load_model()
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model.to(device)
    embeddings = {}

    count = 0
    for image_name in os.listdir(uploads_dir):
        count += 1
        image_path = os.path.join(uploads_dir, image_name)
        if os.path.isfile(image_path):
            image = Image.open(image_path).convert("RGB")

            # Process the image and prepare for the model
            inputs = processor(images=image, return_tensors="pt")
            inputs = {k: v.to(device) for k, v in inputs.items()}

            # Generate image embedding
            with torch.no_grad():
                outputs = model(**inputs)
                image_embedding = outputs.image_embeds
                image_embedding = image_embedding.cpu().numpy()
                embeddings[image_name] = image_embedding.squeeze()

            # For now, just print the embedding shape
    print(f"Upload Embedding Complete | {count} images")
    return embeddings


def create_index(embeddings, index_dir):
    id_to_filename = {}
    index = AnnoyIndex(f=512, metric="angular")
    for i, (image_name, embedding) in enumerate(embeddings.items()):
        id_to_filename[i] = image_name
        index.add_item(i, embedding)
    index.build(100, 2)

    index.save(index_dir + "vector_index.ann")
    with open(index_dir + "id_to_filename.pkl", "wb") as f:
        pickle.dump(id_to_filename, f)


if __name__ == "__main__":
    if len(sys.argv) < 1:
        print("Usage: python3 index_uploads.py")
        sys.exit(1)

    uploads_directory = './uploads/'
    index_directory = './index/'

    embedding_dict = embed_images(uploads_directory)
    create_index(embedding_dict, index_directory)

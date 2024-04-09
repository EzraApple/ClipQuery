import sys
import pickle
import json
import torch
from annoy import AnnoyIndex
from transformers import CLIPProcessor, CLIPVisionModelWithProjection, CLIPTextModelWithProjection
from PIL import Image


def load_resources(index_path, metadata_path):
    # Load the Annoy index
    index = AnnoyIndex(512, 'angular')
    index.load(index_path)

    # Load the metadata mapping
    with open(metadata_path, 'rb') as f:
        metadata = pickle.load(f)

    return index, metadata


def text_to_embedding(text):
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model = CLIPTextModelWithProjection.from_pretrained("openai/clip-vit-base-patch32").to(device)
    processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

    inputs = processor(text=text, return_tensors="pt")
    query_embedding = model(**inputs)
    return query_embedding.text_embeds[0]


def image_to_embedding(image_path):
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model = CLIPVisionModelWithProjection.from_pretrained("openai/clip-vit-base-patch32").to(device)
    processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

    image = Image.open(image_path)
    inputs = processor(images=image, return_tensors="pt")
    query_embedding = model(**inputs)
    return query_embedding.image_embeds[0]


def retrieve_closest(embedding, index, metadata, n):
    ids = index.get_nns_by_vector(embedding, n)
    nearest_filenames = {id: metadata[id] for id in ids}
    return nearest_filenames


if __name__ == '__main__':
    if len(sys.argv) < 4:
        print("Usage: python3 query_index.py <type_of_query> 'text' or 'image' <query_content> <number_of_results>")
        sys.exit(1)

    query_type = sys.argv[1]
    query_content = sys.argv[2]
    num_results = int(sys.argv[3])

    index, metadata = load_resources('index/vector_index.ann', 'index/id_to_filename.pkl')

    if query_type == 'text':
        query_embedding = text_to_embedding(query_content)
    elif query_type == 'image':
        query_embedding = image_to_embedding(query_content)
    else:
        print("Invalid query type. Use 'text' or 'image'.")
        sys.exit(1)

    results = retrieve_closest(query_embedding, index, metadata, num_results)
    print(json.dumps(results))
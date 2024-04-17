# CLIP Image Search Tool

## Introduction
Welcome to my CLIP Image Search tool—a personal endeavor to harness the power of [OpenAI's CLIP
model](https://openai.com/research/clip) for image and text-based search functionalities. This tool enables the embedding and 
indexing of image directories for image search capabilities using text or images queries.
It uses CLIP's vector embeddings and leverages [Spotify's ANNOY library](https://github.com/spotify/annoy) for efficient 
similarity searches. 

## Features
- **Image Upload**: Users can upload a directory of images to be indexed.
- **Text and Image Search**: Supports querying by both text and images.
- **Nearest Neighbor Display**: The 16 most similar images are displayed in response to a query.

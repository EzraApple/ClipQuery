# ClipQuery
<!--- current name choice lol-->
![unrelatd ai image](assets/image_grid.webp)
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

## Setup
To get this platform running on your local machine, follow these steps in your terminal:
1. **Clone the Repository**
```bash
git clone https://github.com/USERNAME/ClipQuery.git
cd ClipQuery
```
2. **Install Dependencies**
```bash
npm install
```
3. **Startup**
```bash
npm run start
```
4. **Navigate to Frontend**
```bash
VITE v5.1.5  ready in 215 ms
      ➜  Local:   http://localhost:5173/
```
Go to the link that appears in your terminal. It should default to ``5173``.
## Usage
1. Upload Images
     - Click the **Upload Directory** button to upload the images you want to search through
     - **Note:** This process may take a few minutes depending on how large your upload is. Each image must go through the CLIP model, and then an index is created from the embeddings.
3. Search Uploads
     - Use the search bar to enter a text query or upload an image to search by image.
     - The results will display the 16 nearest images based on the query.
  
## Technology Stack

### Backend
- **Express.js**: Manages server-side logic for uploading directories and queries. Routes to the necessary python scripts, and returns results to the frontend.
- **Python**: Alongside Node.js, Python scripts are used for specific machine learning tasks that involve image and text processing.
  - **CLIP (Contrastive Language–Image Pre-training)**: A model developed by OpenAI, used to generate 512-dimensional vectors from images and text. This vector representation is crucial for performing content-based searches. Python scripts handle the interaction with the CLIP model, ensuring that inputs are appropriately preprocessed and embeddings are generated accurately.
  - **ANNOY (Approximate Nearest Neighbors Oh Yeah)**: A library for performing nearest neighbors searches. After images and text are converted into vector embeddings by the CLIP model, these vectors are indexed using ANNOY to facilitate efficient and fast retrieval of the most relevant images based on the query. 

### Frontend
- **React**: Provides the user interface, enabling users to upload images, enter text queries, and view search results dynamically. It communicates with the backend via Axios to post data and retrieve results.

### Data Handling
- **Node.js & Express.js**: While Python handles machine learning operations, Node.js with Express.js is used for overall server management, including request handling, file uploads, and serving query results.

## CIFAR100 Demo

I uploaded the CIFAR100 Training Dataset (50,000 32x32 PNG images in 100 classes) and searches by class label. The following are some screenshots of the first 8 results for each query. I think it worked pretty well.
___
<img width="1700" alt="squirrel query" src="https://github.com/EzraApple/ClipQuery/assets/99758970/341ab120-65cb-4bda-b45a-d8e128cd41c3">
<img width="1700" alt="bridge query" src="https://github.com/EzraApple/ClipQuery/assets/99758970/7c88319e-8ce5-4285-875f-2d4a705a3e9f">
<img width="1700" alt="train query" src="https://github.com/EzraApple/ClipQuery/assets/99758970/1c2b5c0b-0d8e-4836-9a7b-9ea6f25d5146">
<img width="1700" alt="palm tree query" src="https://github.com/EzraApple/ClipQuery/assets/99758970/1407a010-7eb0-489c-9b8f-3bf33822d80c">

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
To get this platform running on your local machine, follow these steps:
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

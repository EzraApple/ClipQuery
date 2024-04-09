import axios from 'axios';

const sendQuery = async (query) => {
    let host = "http://localhost:3000";
    let endpoint, data;

    if (typeof query === 'string') {
        endpoint = '/upload/text';
        data = JSON.stringify({ query });
    } else if (typeof query === 'object' && query instanceof File) {
        endpoint = '/upload/image';
        // Convert the image to Base64 and then send
        data = await fileToBase64(query);
        data = JSON.stringify({ image: data }); // Assuming the backend expects a property named 'image'
    } else {
        throw new Error('Query must be a string or a File object.');
    }

    try {
        return await axios.post(host + endpoint, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error sending query:', error);
        // Handle error
    }
};

const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            // Remove the beginning of the string ("data:image/png;base64,") if your backend doesn't expect it
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export default sendQuery;

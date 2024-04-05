import axios from 'axios';

const sendQuery = async (query) => {
    let host = "http://localhost:3000"
    let endpoint = '/upload/text';
    let data = JSON.stringify({ query });

    if (typeof query === 'object' && query instanceof File) {
        endpoint = '/upload/image';
        data = new FormData();
        data.append('file', query);
    }

    try {
        return await axios.post(host + endpoint, data, {
            headers: {
                'Content-Type': typeof query === 'object' ? 'multipart/form-data' : 'application/json',
            },
        });
    } catch (error) {
        console.error('Error sending query:', error);
        // Handle error
    }
};
export default sendQuery
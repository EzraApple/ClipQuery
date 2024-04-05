import axios from "axios";

const sendFiles = async (files, batchSize = 100) => {
    // Determine the total number of batches
    const totalBatches = Math.ceil(files.length / batchSize);

    for (let i = 0; i < totalBatches; i++) {
        const batchStart = i * batchSize;
        const batchEnd = Math.min(batchStart + batchSize, files.length);
        const formData = new FormData();
        console.log(batchStart, batchEnd)
        // Add files for this batch to FormData
        for (let j = batchStart; j < batchEnd; j++) {
            formData.append('files[]', files[j]);
        }

        try {
            // Use axios for consistency, as it was imported
            const response = await axios.post('http://localhost:3000/upload/directory', formData, {
                headers: {
                    // Axios sets Content-Type to multipart/form-data with boundary automatically
                }
            });

            console.log(`Batch ${i + 1}/${totalBatches}:`, response.data.message);
        } catch (error) {
            console.error('Error uploading batch:', error);
            // Optionally, break or return here if you want to stop processing further batches on error
        }
    }
};
export default sendFiles
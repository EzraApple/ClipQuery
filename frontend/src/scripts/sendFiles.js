import axios from "axios";

const sendFiles = async (files, setIndexing, batchSize = 10) => {
    // Determine the total number of batches
    const totalBatches = Math.ceil(files.length / batchSize);
    const totalFiles = files.length;

    setIndexing(true)
    for (let i = 0; i < totalBatches; i++) {
        const batchStart = i * batchSize;
        const batchEnd = Math.min(batchStart + batchSize, files.length);
        const formData = new FormData();
        let isLastBatch = i === totalBatches - 1

        for (let j = batchStart; j < batchEnd; j++) {
            formData.append('files[]', files[j]);
        }

        formData.append('currentBatch', i + 1);
        formData.append('totalBatches', totalBatches);
        formData.append('totalFiles', totalFiles);
        formData.append('isLastBatch', isLastBatch);

        try {

            const response = await axios.post('http://localhost:3000/upload/directory', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.indexingComplete) {
                console.log('It should re-enable')
                setIndexing(false); // Re-enable inputs
            }
            console.log(`Batch ${i + 1}/${totalBatches}:`, response.data.message);
        } catch (error) {
            console.error('Error uploading batch:', error);
            // Optionally, break or return here if you want to stop processing further batches on error
        }
    }
};
export default sendFiles
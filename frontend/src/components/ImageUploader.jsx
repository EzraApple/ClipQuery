import React from 'react';
import {Button, Input, VStack} from '@chakra-ui/react';

const ImageUploader = ({ onImageUpload, isDisabled }) => {
    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            onImageUpload(file)
        }
    };

    return (
        <VStack>
            <Input
                disabled={isDisabled}
                type="file"
                accept="image/*"
                onChange={handleUpload}
                style={{ display: 'none' }}
                id="image-upload"
            />
            <label htmlFor="image-upload">
                <Button as="span" colorScheme="purple">
                    Search with Image
                </Button>
            </label>
        </VStack>
    );
};

export default ImageUploader;

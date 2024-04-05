// ImageUploader.jsx
import React, {useState} from 'react';
import {Button, Input, useToast, VStack} from '@chakra-ui/react';

const ImageUploader = ({ onImageUpload }) => {
    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            onImageUpload(file)
        }
    };

    return (
        <VStack>
            <Input type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} id="image-upload" />
            <label htmlFor="image-upload">
                <Button as="span" colorScheme="purple">
                    Upload Image
                </Button>
            </label>
        </VStack>
    );
};

export default ImageUploader;

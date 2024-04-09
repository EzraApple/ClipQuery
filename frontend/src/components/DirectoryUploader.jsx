import React from 'react';
import {Button, Input, useToast, VStack} from '@chakra-ui/react';

const DirectoryUploader = ({ onDirectoryUpload }) => {
    const toast = useToast();
    const handleDirectoryUpload = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            toast({
                title: "Directory uploaded successfully.",
                description: `${files.length} files loaded from the directory.`,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        }
        onDirectoryUpload(files)
    };

    return (
        <VStack>
            <Input webkitdirectory="true" type="file" accept="image/*" onChange={handleDirectoryUpload} style={{ display: 'none' }} id="dir-upload" />
            <label htmlFor="dir-upload">
                <Button as="span" colorScheme="purple">
                    Upload Directory
                </Button>
            </label>
        </VStack>
    );
};

export default DirectoryUploader;

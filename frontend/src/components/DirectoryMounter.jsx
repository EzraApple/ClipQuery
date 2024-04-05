import React from 'react';
import { Button, useToast } from '@chakra-ui/react';

const DirectoryMounter = ({ onDirectoryUpload }) => {
    const toast = useToast();
    const handleDirectoryChange = (event) => {
        const files = event.target.files;
        // Check if any files were selected
        if (files.length > 0) {
            toast({
                title: "Directory mounted successfully.",
                description: `${files.length} files loaded from the directory.`,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        }
        onDirectoryUpload(files)
    };

    return (
        <Button as="label">
            Upload Directory
            <input
                type="file"
                webkitdirectory="true"
                style={{ display: 'none' }}
                onChange={handleDirectoryChange}
            />
        </Button>
    );
};

export default DirectoryMounter;

import React from 'react';
import {Box, HStack, useToast} from '@chakra-ui/react';
import DirectoryMounter from './DirectoryMounter';
import TextInput from './TextInput';
import ImageUploader from './ImageUploader';
import sendQuery from "../scripts/sendQuery.js"
import sendFiles from "../scripts/sendFiles.js"

const SearchBar = ({onSearchSubmit}) => {
    const toastFn = useToast();
    const toast = (query) => {
        toastFn({
            title: "Query Received",
            description: `${query}`,
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };
    const handleSearchSubmit = async (query) => {
        const response = await sendQuery(query)
        onSearchSubmit(response.data)
    };
    const handleImageUpload = async (file) => {
        const response = await sendQuery(file)
        onSearchSubmit(response.data)
    }
    const handleDirectoryUpload = async (files) => {
        const response = await sendFiles(files)
        console.log(response)
    }

    return (
        <HStack width="100%" justifyContent="space-between" spacing={4} bg="dark.800" borderRadius="md" padding={"1vh"}>
            <Box flexShrink={"0"}><DirectoryMounter onDirectoryUpload={handleDirectoryUpload}/></Box>
            <Box flex={"3"}><TextInput onSearchSubmit={handleSearchSubmit}/></Box>
            <Box flexShrink={"0"}><ImageUploader onImageUpload={handleImageUpload}/></Box>
        </HStack>
    );
};

export default SearchBar;

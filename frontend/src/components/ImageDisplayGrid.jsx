import {SimpleGrid, Center, Spinner, VStack, Text} from '@chakra-ui/react';
import ImageTile from './ImageTile';
import React from "react";

const ImageDisplayGrid = ({ images, isLoading }) => {
    if (isLoading) {
        return (
            <VStack w="100%" h="100px">
                <Text>Searching...</Text>
                <Spinner size="xl" />
            </VStack>
        );
    }
    return (
        <SimpleGrid columns={[2, null, 3, 4]} spacing="20px">
            {images.map((image, index) => (
               <ImageTile key={index} imageUrl={image.imageData} title={image.fileName} />
            ))}
        </SimpleGrid>
    );
};

export default ImageDisplayGrid;

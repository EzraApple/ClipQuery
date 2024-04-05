import React from 'react';
import {Button, Image, Text, useColorModeValue, VStack} from '@chakra-ui/react';

const ImageTile = ({ imageUrl, title }) => {
    // Use color mode values from the theme for dynamic styling based on the theme
    const bgColor = useColorModeValue('dark.700', 'dark.800');
    const hoverBgColor = useColorModeValue('dark.600', 'purple.600');
    const textColor = useColorModeValue('white', 'gray.200');

    const handleDownloadImage = () => {
        const anchor = document.createElement('a');
        anchor.href = imageUrl;
        anchor.download = title || 'downloaded-image';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    };

    return (
        <VStack
            spacing="4px"
            _hover={{
                bg: hoverBgColor,
                transform: 'scale(1.02)',
                transition: 'transform .2s ease-in-out, background-color .2s',
            }}
            cursor="pointer"
            borderRadius="xl"
            overflow="hidden"
            p="4"
            bgColor={bgColor}
        >
            <Image src={imageUrl} boxSize="20vh" objectFit="cover" borderRadius="md" />
            <Text fontSize="sm" color={textColor}>
                {title}
            </Text>
            <Button variant={"solid"} size="sm" onClick={handleDownloadImage}>Download</Button>
        </VStack>
    );
};

export default ImageTile;

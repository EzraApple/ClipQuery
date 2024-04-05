// ImageDisplayGrid.jsx
import { SimpleGrid } from '@chakra-ui/react';
import ImageTile from './ImageTile';

const ImageDisplayGrid = ({ images }) => {
    return (
        <SimpleGrid columns={[2, null, 3, 4]} spacing="20px">
            {images.map((image, index) => (
                <ImageTile key={index} imageUrl={image.imageData} title={image.fileName} />
            ))}

        </SimpleGrid>
    );
};

export default ImageDisplayGrid;

import SearchBar from "./components/SearchBar.jsx";
import ImageDisplayGrid from "./components/ImageDisplayGrid.jsx";
import {Box, Container, VStack} from "@chakra-ui/react";
import {useState} from "react";

function App() {
    const [images, setImages] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const handleNewImages = (newImages) => {
        setImages(newImages);
        setIsLoading(false)
    }

    const startLoading = () => {
        setIsLoading(true); // Start loading when search is submitted
    }

    return(
        <VStack spacing={8}>
            <Box width="100vw">
                <SearchBar onSearchSubmit={handleNewImages} onStartSearch={startLoading}/>
            </Box>
            <Container maxWidth="container.xl" flex="1">
                <ImageDisplayGrid images={images} isLoading={isLoading}/>
            </Container>
        </VStack>
    );
}

export default App;
import SearchBar from "./components/SearchBar.jsx";
import ImageDisplayGrid from "./components/ImageDisplayGrid.jsx";
import {Box, Container, VStack} from "@chakra-ui/react";
import {useState} from "react";

function App() {
    const [images, setImages] = useState([])

    const addImage = (image) => {
        setImages([...images, image]);
        console.log(images)
    }

    const resetImages = () => {
        setImages([]);
    }
    return(
        <VStack spacing={8}>
            <Box width="100vw">
                <SearchBar onSearchSubmit={addImage}/>
            </Box>
            <Container maxWidth="container.xl" flex="1">
                <ImageDisplayGrid images={images}/>
            </Container>
        </VStack>
    );
}

export default App;
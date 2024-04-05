// theme.jsx
import { extendTheme } from '@chakra-ui/react';

const colors = {
    dark: {
        900: '#181818', // Very dark grey for backgrounds
        800: '#1A202C', // Dark grey for components
        700: '#2D3748', // Lighter grey for hover states or borders
        600: '#4A5568', // A new, even lighter grey, suitable for secondary text or less emphasized components
        500: '#718096', // A lighter grey, great for placeholders, disabled state, or secondary information
        400: '#A0AEC0', // Very light grey, useful for background of selected items in a list or input borders
    },
    blue: {
        500: '#3182CE', // Existing medium blue for primary buttons or links
        600: '#2B6CB0', // Existing slightly darker blue for button hover states
        700: '#2563EB', // A new, darker blue for more contrast or active states
        800: '#1D4ED8', // An even darker blue, good for deeper contrast or additional UI elements
        900: '#1E40AF', // A very dark blue, useful for subtle backgrounds or as an accent color
    },
    purple: {
        500: '#6B46C1', // Medium purple for accents or highlights
        600: '#553C9A', // Darker purple for accents or hover states
    },
};

const styles = {
    global: {
        // Styles for the `body`
        body: {
            bg: 'dark.900',
            color: 'white',
            lineHeight: 'base',
        },
        'h1, h2, h3, h4, h5, h6': {
            color: 'purple.500',
        },
        h1: {
            fontSize: '2xl', // For example, 2xl. Adjust size as needed.
            fontWeight: 'bold',
            lineHeight: 'shorter', // Makes the line-height tighter for large text
            color: 'blue.500', // This will make h1 elements stand out.
        },
        p: {
            fontSize: 'md', // Medium size text for paragraphs
            lineHeight: 'tall', // A taller line-height for improved readability
            color: 'white', // Keeping the text readable against the dark background
        },
    },
};

const components = {
    Button: {
        variants: {
            solid: (props) => ({
                bg: props.colorMode === 'dark' ? 'blue.500' : 'blue.600',
                _hover: {
                    bg: 'blue.700',
                },
            }),
        },
    },
    Input: {
        // Customize the input component to fit the theme
        variants: {
            outline: {
                field: {
                    borderColor: 'blue.500',
                    _hover: {
                        borderColor: 'blue.600',
                    },
                    _focus: {
                        boxShadow: `0 0 0 1px var(--chakra-colors-blue-500)`,
                    },
                },
            },
        },
    },
    // Additional component customizations can be added here
    Image: {
        // Assuming you want to customize Chakra's Image component for tiles
        baseStyle: {
            maxW: '100%',
            borderRadius: 'md', // Adds a slight rounded corner
        },
    },
};

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
};

const theme = extendTheme({ colors, components, styles, config });

export default theme;

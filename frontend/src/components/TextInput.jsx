import React, {useState} from 'react';
import {Button, HStack, Input} from '@chakra-ui/react';

const TextInput = ({ onSearchSubmit, isDisabled }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the form from causing a page reload
        onSearchSubmit(searchQuery); // Trigger the search with the current query
    };

    return (
        <form onSubmit={handleSubmit}>
            <HStack>
                <Input
                    disabled={isDisabled}
                    placeholder="Search with text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </HStack>
        </form>
    );
};

export default TextInput;

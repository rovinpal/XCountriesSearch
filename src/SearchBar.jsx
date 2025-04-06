import React from "react";

const Search = ({ searchCountry, onSearchChange }) => {
    return (
        <input 
            type="text" 
            placeholder="Search for countries..."
            value={searchCountry}
            onChange={onSearchChange}
            style={{
                height: "35px",
                width: "800px"
            }}
        />
    );
};

export default Search;
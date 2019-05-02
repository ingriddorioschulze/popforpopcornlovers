import React from "react";

const SearchBox = ({ searchfield, searchChange }) => {
    return (
        <div className="search-box">
            <input
                className="search-box-input"
                type="search"
                placeholder="search"
                onChange={searchChange}
            />
        </div>
    );
};

export default SearchBox;

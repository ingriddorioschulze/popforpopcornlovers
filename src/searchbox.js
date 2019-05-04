import React from "react";
import { connect } from "react-redux";
import { search } from "./actions";

const SearchBox = ({ results, search }) => {
    return (
        <div className="search-box-area">
            <div className="search-box">
                <input
                    className="search-box-input"
                    type="text"
                    placeholder="search"
                    onChange={e => search(e.target.value)}
                />
                <div className="search-results">
                    {results.map(result => (
                        <div className="results-list-item" key={result.id}>
                            {result.first_name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        results: state.searchResults
    };
};

const mapDispatchToProps = dispatch => {
    return {
        search(text) {
            dispatch(search(text));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBox);

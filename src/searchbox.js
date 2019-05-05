import React from "react";
import { connect } from "react-redux";
import { search, closeSearchResults } from "./actions";
import { Link } from "react-router-dom";

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.eventListener = this.eventListener.bind(this);
    }

    eventListener() {
        this.props.closeSearchResults();
    }

    componentDidMount() {
        document.body.addEventListener("click", this.eventListener);
    }

    componentWillUnmount() {
        document.body.removeEventListener("click", this.eventListener);
    }

    render() {
        const { results, search, resultsVisible } = this.props;
        return (
            <div className="search-box-area">
                <div className="search-box">
                    <input
                        className="search-box-input"
                        type="text"
                        placeholder="search"
                        onChange={e => search(e.target.value)}
                    />
                    {resultsVisible && (
                        <div className="search-results">
                            {results.map(result => (
                                <div
                                    className="results-list-item"
                                    key={result.id}
                                >
                                    <Link to={`/user/${result.id}`}>
                                        {result.first_name}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        results: state.searchResults,
        resultsVisible: state.resultsVisible
    };
};

const mapDispatchToProps = dispatch => {
    return {
        search(text) {
            dispatch(search(text));
        },
        closeSearchResults() {
            dispatch(closeSearchResults());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBox);

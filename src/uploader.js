import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="change-image">
                <div>Choose image</div>
                <input
                    className="upload-image"
                    name="upload-image"
                    type="file"
                    accept="image/*"
                />
                <div className="image-modal-close">&times;</div>
            </div>
        );
    }
}

import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.uploadProfilePicture = this.uploadProfilePicture.bind(this);
    }

    uploadProfilePicture(e) {
        const formData = new FormData();
        formData.append("picture", e.target.files[0]);
        axios
            .post("/uploadProfilePicture", formData, {
                headers: {
                    "content-type": "multipart/form-data"
                }
            })
            .then(response => {
                this.props.setImage(response.data.url);
            });
    }

    render() {
        return (
            <div className="upload-image-container">
                <div>Choose image</div>
                <input
                    onChange={this.uploadProfilePicture}
                    className="upload-image-input"
                    name="upload-image"
                    type="file"
                    accept="image/*"
                />
                <div className="upload-image-modal-close">&times;</div>
            </div>
        );
    }
}

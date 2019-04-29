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
            <div className="upload-image-area">
                <div className="upload-image-container">
                    <div className="upload-image-text">
                        edit your profile picture
                    </div>
                    <input
                        onChange={this.uploadProfilePicture}
                        className="upload-image-input"
                        name="upload-image"
                        id="file"
                        type="file"
                        accept="image/*"
                    />
                    <label htmlFor="file">
                        <span className="choose-file">choose a file</span>
                    </label>
                    <div
                        onClick={this.props.closeModal}
                        className="upload-image-modal-close"
                    >
                        &times;
                    </div>
                </div>
            </div>
        );
    }
}

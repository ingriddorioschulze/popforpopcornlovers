import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            draft: props.bio || ""
        };
        this.save = this.save.bind(this);
        this.switchToEdit = this.switchToEdit.bind(this);
    }

    switchToEdit() {
        this.setState({ editing: true });
    }

    save() {
        axios
            .put("/editbio", {
                bio: this.state.draft
            })
            .then(() => {
                this.props.setBio(this.state.draft);
                this.setState({ editing: false });
            });
    }
    render() {
        if (this.state.editing === true) {
            return (
                <div className="bio-save">
                    <textarea
                        className="bio-save-textarea"
                        onChange={e => {
                            this.setState({ draft: e.target.value });
                        }}
                        value={this.state.draft}
                    />
                    <div>
                        <button className="bio-save-button" onClick={this.save}>
                            Save
                        </button>
                    </div>
                </div>
            );
        }
        if (!this.props.bio) {
            return <button onClick={this.switchToEdit}>Add Bio</button>;
        } else {
            return (
                <div className="bio-edit">
                    {this.props.bio}
                    <div>
                        <button
                            className="bio-edit-button"
                            onClick={this.switchToEdit}
                        >
                            Edit
                        </button>
                    </div>
                </div>
            );
        }
    }
}

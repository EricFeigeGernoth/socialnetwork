import axios from "../axios";
import { Component } from "react";

export class BioEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            noBio: true,
            bioInfo: null,

            // You may want to set some defaults here
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitBio = this.submitBio.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.handleBioChange = this.handleBioChange.bind(this);
        // May wanna bind some methods here
    }

    handleChange(e) {
        this.setState(
            {
                bioInfo: e.target.value,
            },
            () =>
                console.log(this.props.bio, "this.state: ", this.state.bioInfo)
        );
    }

    toggleEditMode() {
        // To toggle the editMode state variable.
        if (this.state.edit == false) {
            this.setState({ edit: true });
        } else {
            this.setState({ edit: false });
        }
    }

    handleBioChange(event) {
        console.log(event);
        this.setState(
            {
                bioInfo: event.target.value,
            },
            () =>
                console.log(
                    this.props.bio,
                    "this.state bioInfo: ",
                    this.state.bioInfo
                )
        );
        // To keep track of the bio the user types
    }

    submitBio() {
        console.log("in submitBio");
        axios
            .post("/bioedit", this.state)
            .then(({ data }) => {
                console.log("data Bio after post", data);
                this.props.setBio(data.bio);
                this.toggleEditMode();
            })
            .catch((err) => console.log("error", err));
        // 1. Post the new bio the user typed (you should read it from this.state.draft)
        // 2. Set the new bio in the state of App
    }

    render() {
        return (
            <section id={"bio-editor"}>
                {this.state.edit && (
                    <div className="editBox">
                        <textarea
                            name="editMode"
                            onChange={this.handleBioChange}
                            defaultValue={this.props.bio}
                        ></textarea>
                        <button
                            className="buttonStyling"
                            onClick={this.submitBio}
                        >
                            Save
                        </button>
                    </div>
                )}
                {!this.state.edit && !this.state.bioInfo && (
                    <div className="addBio">
                        <button
                            className="buttonStyling"
                            onClick={this.toggleEditMode}
                        >
                            add Bio
                        </button>
                    </div>
                )}
                {!this.state.edit && this.state.bioInfo && (
                    <div className="startEdit">
                        <button
                            className="buttonStyling"
                            onClick={this.toggleEditMode}
                        >
                            Edit your existing Bio
                        </button>
                    </div>
                )}
            </section>
        );
    }
}
// Uploader will also need to be passed a method to be able to close itself ;)
// <div>
//     <input
//         type="text"
//         name="bio"
//         placeholder="bio"
//         onChange={this.handleChange}
//     ></input>
//     <button onClick={() => this.submitBio()}>
//         Add Bio
//     </button>
// </div>

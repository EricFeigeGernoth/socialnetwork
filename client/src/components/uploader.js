import { Component } from "react";
import axios from "../axios";
export class Uploader extends Component {
    constructor(props) {
        super(props);

        // Initialize the state
        this.state = { file: null };
        // Method 1 to preserve context: bind the method in the constructor
        this.handleChange = this.handleChange.bind(this);
        this.upload = this.upload.bind(this);
    }

    handleChange(e) {
        console.log("handleChange is running");
        console.log("e.target: ", e.target.files);
        this.file = e.target.files[0];
    }

    upload() {
        console.log("click on button");
        console.log(this.file);
        // we use FormData to send files over to the server!
        var formData = new FormData();
        //the file MUST go in formData
        //but I'm putting them here for convenience
        // ie it's nice to put all of the data we're sending over to the server
        // in one place
        formData.append("file", this.file);

        console.log("formData: ", formData);
        axios
            .post("/upload", formData)
            .then((response) => {
                console.log("data", response.data.profile_pic);
                this.props.setProfilePic(response.data.profile_pic);
                this.props.hideUploader();
            })
            .catch((err) => {
                console.log("err in POST /upload: ", err);
            });
    }

    render() {
        return (
            <div id="uploadsection">
                <div className="uploader">
                    <h1>Upload your Profile Picture</h1>
                    <div className="uploadBottom">
                        <input
                            className="inputImages"
                            onChange={this.handleChange}
                            type="file"
                            name="file"
                            accept="image/*"
                        ></input>
                        <button className="buttonStyling" onClick={this.upload}>
                            Upload
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

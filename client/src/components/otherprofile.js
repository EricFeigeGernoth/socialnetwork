import React from "react";
import axios from "../axios";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("I am in componentDidMOunt", this.state);
        axios.get(`/user/${this.props.match.params.id}.json`).then((resp) => {
            console.log("resp after post user", resp);
            if (resp.data.invalid || resp.data.userIsViewingSelf) {
                console.log("I am looking at myself");
                this.props.history.push("/"); //maybe render an error message instead of redirecting?
            } else {
                this.setState(resp.data);
                console.log("after post, ", this.state);
                console.log("this.state.resp", this.state);
            }
        });
        // // const { data } = axios.get(`/user/${this.props.match.params.id}.json`);

        // console.log("I am after post new user");
        // console.log(data);
        // this.setState(data);
    }
    render() {
        console.log("this.state while rendering otherprofile", this.state);
        return (
            <div>
                <h1> You are watching a different profile</h1>
                <h1>
                    {this.state.first} {this.state.last}
                </h1>
                <p> the bio of this person: {this.state.bio}</p>
                <img
                    id="profilepicture"
                    src={this.state.profile_pic || "defaultuser.png"}
                />
            </div>
        );
    }
}

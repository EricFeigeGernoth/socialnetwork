import React from "react";
import axios from "../axios";

import FriendButton from "./friendbutton";

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
                console.log("this.state.id", this.state.id);
                console.log(
                    "this.props.match.params.id",
                    this.props.match.params.id
                );
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
            <section id={"main_profile"}>
                <div className="profileBox">
                    <div className="otherProfile">
                        <div className="imgContainer">
                            <img
                                id="inProfilePic"
                                src={
                                    this.state.profile_pic || "defaultuser.png"
                                }
                            />
                        </div>

                        <div>
                            <h1 className="header3">
                                {this.state.first} {this.state.last}
                            </h1>
                        </div>
                        <div>
                            {" "}
                            <p className="nameName2"> {this.state.bio}</p>
                        </div>
                        <div>
                            <FriendButton
                                otherId={this.props.match.params.id}
                            />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

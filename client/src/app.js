import { Component } from "react";
// Use the CSURF axios instance ;)
import axios from "./axios";

import { BrowserRouter, Route } from "react-router-dom";

// Those are from named exports, it will look differently if you have default exports ;)
import Logo from "./components/logo";
import ProfilePic from "./components/profile-pic.js";
import { Uploader } from "./components/uploader.js";
import Profile from "./components/profile.js";
import OtherProfile from "./components/otherprofile";
import FindPeople from "./components/findpeople";

export class App extends Component {
    constructor(props) {
        super(props);

        // Initialize the state
        this.state = {
            user: {},
            uploaderVisible: false,
        };

        // Method 1 to preserve context: bind the method in the constructor
        // this.showUploader = this.showUploader.bind(this);
        this.setProfilePic = this.setProfilePic.bind(this);
        this.hideUploader = this.hideUploader.bind(this);
        this.showUploader = this.showUploader.bind(this);
        this.setBio = this.setBio.bind(this);
    }

    componentDidMount() {
        // 1. Fetch the user data when our App component mounts
        console.log("I am in componentDidMount");
        axios.get("/user").then((res) => {
            console.log("res in mount", res);
            this.setState({ user: res.data });
            // 2. Update the state when you get the the user's data
            // ...
        });
    }

    // Method to update the profilePic state after upload. To be passed down to <Uploader />
    setProfilePic(newProfile_Pic) {
        this.setState((prevState) => {
            return {
                user: {
                    ...prevState.user,
                    profile_pic: newProfile_Pic,
                },
            };
        });
    }

    setBio(newBio) {
        console.log(newBio);
        this.setState((prevState) => {
            return {
                user: {
                    ...prevState.user,
                    bio: newBio,
                },
            };
        });
    }

    // You will also need a way to hide the uploader. Or you may want to change this to a toggle function
    showUploader() {
        this.setState({ uploaderVisible: true });
    }

    hideUploader() {
        this.setState({ uploaderVisible: false });
    }

    render() {
        return (
            <section id={"app"}>
                <div className="head">
                    <Logo />
                    <ProfilePic
                        first={this.state.user.first}
                        last={this.state.user.last}
                        profile_pic={this.state.user.profile_pic}
                        // You may want to shorten the 3 lines above with: {...this.state.user}

                        // This method is bound in the constructor, so we're good!
                        showUploader={this.showUploader}
                    />
                </div>

                <BrowserRouter>
                    <div>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    first={this.state.user.first}
                                    last={this.state.user.last}
                                    profile_pic={this.state.user.profile_pic}
                                    showUploader={this.showUploader}
                                    setBio={this.setBio}
                                    bio={this.state.user.bio}
                                />
                            )}
                        />
                        <Route
                            path="/user/:id"
                            render={(props) => (
                                <OtherProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                        <Route path="/users" component={FindPeople} />
                    </div>
                </BrowserRouter>

                {this.state.uploaderVisible && (
                    // Uploader will also need to be passed a method to be able to close itself ;)
                    <Uploader
                        // Method 2 to preserve context: use an arrow function to capture the current context
                        setProfilePic={this.setProfilePic}
                        hideUploader={this.hideUploader}
                    />
                )}
            </section>
        );
    }
}

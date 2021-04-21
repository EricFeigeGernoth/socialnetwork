import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };

        // this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state: ", this.state)
        );
    }

    handleClick() {
        console.log("clicked the button");
        axios
            .post("/login", this.state)
            .then(({ data }) => {
                console.log("data handleClick", data);

                console.log("data", data);
                if (data.success) {
                    console.log("success");
                    location.replace("/");
                } else {
                    this.setState({
                        error: true,
                    });
                    console.log("wow");
                }
            })
            .catch((err) => console.log("error", err));
    }

    render() {
        return (
            <div className="bodyBox">
                <div className="regLogBox">
                    <h1 className="header1">Step In</h1>

                    {this.state.error && (
                        <p className="error">oops!!! something went wrong!!</p>
                    )}
                    <div className="inputFields">
                        <div className="input">
                            <input
                                type="text"
                                name="email"
                                placeholder="email"
                                onChange={(e) => this.handleChange(e)}
                            ></input>
                        </div>
                        <div className="input">
                            {" "}
                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                onChange={(e) => this.handleChange(e)}
                            ></input>
                        </div>
                        <div className="button">
                            {" "}
                            <button onClick={() => this.handleClick()}>
                                login
                            </button>
                        </div>

                        <Link to="/">
                            <p className="subtitle">
                                Click to go to Registration
                            </p>
                        </Link>
                        <Link to="/resetpassword">
                            <p className="subtitle">Reset your password</p>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

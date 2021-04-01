import axios from "axios";
import { Component } from "react";

export default class Registration extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };

        // this.handleChange = this.handleChange.bind(this);
    }

    //What we need to do:
    //1. render 4 input fields+button
    // 2. capture the user input and store it somewhere
    // 3. when user submits. send the data to the server
    // if something goes wrong, condiditionally render an error message
    // if everything goes to perfection, redirect the user '/'

    handleChange(e) {
        // console.log("handleChange is running for every inputfield");
        // console.log("handleChange e.target.value", e.target.value);
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state: ", this.state)
        );
    }

    handleClick() {
        console.log("clicked the button");
        // axios
        //     .post("/register", this.state)
        //     .then(({ data }) => {
        //         console.log("data handleClick", data);
        //         //TO DO:
        //         //if everything went well, redirect the user to "/"
        //         //if something went wrong, conditionally render an error message

        //         if (data) {
        //             location.replace("/");
        //         } else {
        //             this.setState({
        //                 error: true,
        //             });
        //             console.log("wow");
        //         }
        //     })
        //     .catch((err) => console.log("error", err));
    }

    render() {
        return (
            <div>
                <h1>This is our registration component</h1>

                {this.state.error && (
                    <p className="error">oops!!! something went wrong!!</p>
                )}
                <input
                    type="text"
                    name="first"
                    placeholder="first"
                    onChange={(e) => this.handleChange(e)}
                ></input>
                <input
                    type="text"
                    name="last"
                    placeholder="last"
                    onChange={(e) => this.handleChange(e)}
                ></input>
                <input
                    type="text"
                    name="email"
                    placeholder="email"
                    onChange={(e) => this.handleChange(e)}
                ></input>
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => this.handleChange(e)}
                ></input>
                <button onClick={() => this.handleClick()}>register</button>
            </div>
        );
    }
}

import React, { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            initial: true,
            verify: false,
            final: false,
        };
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state: ", this.state)
        );
    }

    resetClick() {
        console.log("clicked the button");
        axios
            .post("/resetpassword", this.state)
            .then(({ data }) => {
                console.log("data resetClick", data);

                if (data.verify) {
                    console.log("successful first step reset");
                    this.setState({
                        initial: false,
                        verify: true,
                    });
                } else {
                    this.setState({
                        error: true,
                    });
                    console.log("wow");
                }
            })
            .catch((err) => console.log("error", err));
    }

    verifyNewPassword() {
        console.log("clicked the button");
        axios
            .post("/resetpassword/verify", this.state)
            .then(({ data }) => {
                console.log("data verifyNewPassword", data);

                if (data.final) {
                    console.log("successful first step reset");
                    this.setState({
                        verify: false,
                        final: true,
                    });
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
            <React.Fragment>
                {this.state.error && (
                    <p className="error">oops!!! something went wrong!!</p>
                )}
                {this.state.initial == true && (
                    <div>
                        <input
                            type="text"
                            name="email"
                            placeholder="email"
                            onChange={(e) => this.handleChange(e)}
                        ></input>
                        <button onClick={() => this.resetClick()}>
                            Reset password
                        </button>
                    </div>
                )}
                {this.state.verify == true && (
                    <div>
                        <input
                            type="text"
                            name="code"
                            placeholder="code"
                            onChange={(e) => this.handleChange(e)}
                        ></input>
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            onChange={(e) => this.handleChange(e)}
                        ></input>
                        <button onClick={() => this.verifyNewPassword()}>
                            Verify your new Passowrd
                        </button>
                    </div>
                )}
                {this.state.final == true && (
                    <div>
                        <h1>Successful changed your password</h1>
                    </div>
                )}
                <Link to="/login">Click to go to Login</Link>
            </React.Fragment>
        );
    }
}

// if (this.state.initial == true) {
//     return (
//         <div>
//             <input
//                 type="text"
//                 name="email"
//                 placeholder="email"
//                 onChange={(e) => this.handleChange(e)}
//             ></input>
//             <button onClick={() => this.handleClick()}>
//                 Reset password
//             </button>
//         </div>
//     );
// }
// // if (this.state.step == 2) {
// //     return (
// //         <div>
// //             <input name="code" />
// //             <input name="password" />
// //         </div>
// //     );
// // }
// return (
//     <div>
//         <h1>Reset your password!!!</h1>
//         {this.state.step == 1 && (
//             <div>
//                 <input name="email" />
//             </div>
//         )}
//         {this.state.step == 2 && (
//             <div>
//                 <input name="code" />
//                 <input name="password" />
//             </div>
//         )}
//     </div>
// );

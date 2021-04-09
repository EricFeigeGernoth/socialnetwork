import React from "react";
import axios from "../axios";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {
        const { data } = axios.get(`/user/${this.props.match.params.id}.json`);
        if (data.invalid == true) {
            this.props.history.push("/");
        }
        this.setState(data);
    }
    render() {
        return (
            <div>
                <h1>
                    {this.state.first} {this.state.last}
                </h1>
            </div>
        );
    }
}

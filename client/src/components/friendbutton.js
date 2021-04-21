import { useState, useEffect } from "react";
import axios from "../axios";

export default function FriendButton(props) {
    const [button, setButtons] = useState([]);

    useEffect(() => {
        console.log("I am in first useEffect");
        console.log("props.otherId", props.otherId);
        axios.get(`/friendship/${props.otherId}`).then((result) => {
            console.log("back after axios");
            console.log(result.data);
            if (result.data.noFriends) {
                setButtons("Add as Friend");
            } else if (result.data.cancelAsk) {
                setButtons("Cancel Friend Request?");
            } else if (result.data.accept) {
                setButtons("Accept Friend Request?");
            } else if (result.data.friends) {
                console.log("We are friends");
                setButtons("Would you like to end your friendship!");
            }
        });
    }, []);

    function handleChange(e) {
        console.log("I clicked the button");
        console.log("button", button);
        axios
            .post(`/handlefriends/${props.otherId}/${button}`)
            .then((result) => {
                console.log(result);
                if (result.data.friends) {
                    console.log("We are friends");
                    setButtons("Would you like to end your friendship!");
                } else if (result.data.noFriends) {
                    setButtons("Add as Friend");
                } else if (result.data.cancelAsk) {
                    setButtons("Cancel Friend Request?");
                } else if (result.data.accept) {
                    setButtons("Accept Friend Request?");
                }
            });
    }

    return (
        <div className="button">
            <button className="buttonStyling" onClick={(e) => handleChange(e)}>
                {button}
            </button>
        </div>
    );
}

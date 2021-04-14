import { useState, useEffect } from "react";
import axios from "../axios";

export default function FriendButton() {
    const [button, setButtons] = useState([]);

    // useEffect(() => {
    //     let abort = false;
    //     axios.get(`/users/${query}`).then((result) => {
    //         console.log(result.data);
    //         if (!abort) {
    //             setMembers(result.data);
    //         }
    //     });
    //     return () => {
    //         // cleanup function
    //         abort = true;
    //     };
    // });

    return (
        <div>
            <p>I am inside of FriendButton</p>
            <button>Add Friend</button>
        </div>
    );
}

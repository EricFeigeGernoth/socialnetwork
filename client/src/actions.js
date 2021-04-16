//src action.js
import axios from "./axios";

export function receiveFriendsWannabes() {
    console.log("I am here");
    return axios
        .get("wannabees")
        .then((result) => {
            console.log("action.js receive", result.data);
            // the object being returned here is called an "action"
            return {
                type: "RECEIVE_FRIENDS_WANNABES",
                friendships: result.data,
                // array we got back from the server
            };
        })
        .catch((err) => {
            console.log("err: ", err);
        });
}

export async function acceptFriend() {
    const { data } = await axios.post();
    return {
        type: "ACCEPT_FRIEND",
    };
}

export function unfriend() {}

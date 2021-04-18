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

export function acceptFriend(otherId) {
    console.log("otherId", otherId);
    return axios.post(`/acceptfriends/${otherId}`).then((result) => {
        console.log("hello", result.data[0]);
        return {
            type: "ACCEPT_FRIEND",
            friendaccepted: result.data[0],
        };
    });
}

export function unfriend(otherId) {
    console.log("otherId", otherId);

    return axios.post(`/unfriend/${otherId}`).then((result) => {
        console.log("hello", result.data[0]);
        return {
            type: "DELETE_FRIEND",
            frienddeleted: result.data[0],
        };
    });
}

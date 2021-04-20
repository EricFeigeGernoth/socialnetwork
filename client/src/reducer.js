// src/reducer.js

import { onlineUsers } from "./actions";

export default function (state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS_WANNABES") {
        state = {
            ...state,
            friendships: action.friendships,
        };
    }

    if (action.type == "ACCEPT_FRIEND") {
        console.log("action.friendaccepted", action.friendaccepted);
        state = {
            ...state,
            friendships: state.friendships.map((user) => {
                if (user.id == action.friendaccepted.sender_id) {
                    return {
                        ...user,
                        accepted: true,
                    };
                } else {
                    return user;
                }
            }),
        };
    }
    if (action.type == "DELETE_FRIEND") {
        console.log("action.frienddeleted", action.frienddeleted);
        state = {
            ...state,
            friendships: state.friendships.filter((user) => {
                console.log("user.id", user.id);

                if (user.id != action.frienddeleted.sender_id) {
                    return { ...user };
                }
            }),
        };
    }
    if (action.type == "NEW_MESSAGE") {
        state = {
            ...state,
            newMessages: [...state.newMessages, action.newMessage],
        };
    }
    if (action.type == "TEN_MESSAGES") {
        state = {
            ...state,
            newMessages: action.tenMessages,
        };
    }
    if (action.type == "ONLINE_USERS") {
        state = {
            ...state,
            onlineUsers: action.onlineUsers,
        };
    }
    if (action.type == "USER_JOINED") {
        console.log("FINE LOOKING");
        state = {
            ...state,
            onlineUsers: [...state.onlineUsers, action.newUser],
        };
    }
    if (action.type == "USER_LEFT") {
        state = {
            ...state,
            onlineUsers: state.onlineUsers.filter((userLeft) => {
                userLeft.id != action.onlineUsers;
            }),
        };
    }
    return state;
}

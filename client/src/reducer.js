// src/reducer.js

export default function (state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS_WANNABES") {
        state = {
            ...state,
            friendships: action.friendships,
        };
    }
    return state;
}

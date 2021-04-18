import io from "socket.io-client";
import { newMessage, tenMessages } from "./actions";

// import { chatMessages, chatMessage } from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
        socket.on("mostRecentMsgs", (msgs) => {
            console.log("mostRecentMsgs", msgs);
            store.dispatch(tenMessages(msgs));
        });
        socket.on("addChatMsg", (msg) => {
            let parsedMSG = JSON.parse(msg);
            console.log("parsedMSG", parsedMSG);
            store.dispatch(newMessage(parsedMSG));
        });
        // socket.on("chatMessages", (msgs) => store.dispatch(chatMessages(msgs)));

        // socket.on("chatMessage", (msg) => store.dispatch(chatMessage(msg)));
    }
};

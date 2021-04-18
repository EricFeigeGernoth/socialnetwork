import { useEffect, useRef } from "react";
import { socket } from "../socket";
import { useSelector } from "react-redux";

export default function Chat() {
    const elemRef = useRef();
    const newMessages = useSelector((state) => state && state.newMessages);
    console.log("newMessage", newMessages);
    if (newMessages != undefined) {
        console.log(newMessages.message);
    }

    // this will be undefined for you right now!!
    // console.log('here are my last 10 chat messages: ', chatMessages);

    // you'll want to run this useEffect everytime we get a newChatMsg
    useEffect(() => {
        // console.log('chat hooks component has mounted');
        // console.log('elementRef is: ', elemRef);
        // console.log('scrollTop: ', elemRef.current.scrollTop);
        // console.log('clientHeight: ', elemRef.current.clientHeight);
        // console.log('scrollHeight: ', elemRef.current.scrollHeight);

        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [newMessages]);

    const keyCheck = (e) => {
        console.log("keyCheck value before Enter", e.target.value);
        if (e.key === "Enter") {
            e.preventDefault(); // this will prevent going to the next line
            socket.emit("My amazing chat message", e.target.value);
            e.target.value = ""; // clears input field after we click enter
        }
    };

    return (
        <div>
            <p className="chat-title">Welcome to Chat</p>
            <div className="chat-messages-container" ref={elemRef}>
                {/* <p>{newMessage.first}</p> */}
                {newMessages &&
                    newMessages.map((msg) => {
                        return (
                            <div className="comment" key={msg.id}>
                                <img
                                    id="profilepicture"
                                    src={msg.profile_pic || "defaultuser.png"}
                                />
                                <p>
                                    {msg.first} {msg.last}
                                </p>
                                <p>{msg.message}</p>
                            </div>
                        );
                    })}
            </div>
            <textarea
                placeholder="Add your message here"
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}

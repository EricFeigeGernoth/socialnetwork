import { useEffect, useRef } from "react";
import { socket } from "../socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Chat() {
    const elemRef = useRef();
    const newMessages = useSelector((state) => state && state.newMessages);
    const onlineUsers = useSelector((state) => state && state.onlineUsers);
    console.log("newMessage", newMessages);
    if (newMessages != undefined) {
        console.log(newMessages.message);
    }
    console.log("onlineUsers", onlineUsers);
    useEffect(() => {
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
                {newMessages &&
                    newMessages.map((msg) => {
                        return (
                            <div className="comment" key={msg.id}>
                                <Link to={"/user/" + msg.sender_id}>
                                    <img
                                        id="profilepicture"
                                        src={
                                            msg.profile_pic || "defaultuser.png"
                                        }
                                    />
                                </Link>
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
            <div>
                <p>Friends online</p>
                {onlineUsers &&
                    onlineUsers.map((onUser) => {
                        return (
                            <div className="comment" key={onUser.id}>
                                <Link to={"/user/" + onUser.id}>
                                    <img
                                        id="profilepicture"
                                        src={
                                            onUser.profile_pic ||
                                            "defaultuser.png"
                                        }
                                    />
                                </Link>
                                <p>
                                    {onUser.first} {onUser.last}
                                </p>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

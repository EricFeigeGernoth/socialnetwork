import { useState, useEffect } from "react";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { receiveFriendsWannabes } from "../actions";

export default function Friends() {
    const dispatch = useDispatch();
    const friends = useSelector(
        (state) =>
            state.friendships &&
            state.friendships.filter(
                (friendships) => friendships.accepted == true
            )
    );
    const wannabees = useSelector(
        (state) =>
            state.friendships &&
            state.friendships.filter(
                (friendships) => friendships.accepted == false
            )
    );
    useEffect(() => {
        dispatch(receiveFriendsWannabes()).then(() => {
            console.log("friends", friends);
            console.log("wannabees", wannabees);
        });
    }, []);
    console.log("friends", friends);
    console.log("wannabees", wannabees);
    return (
        <div>
            <p>I am inside of FriendButton</p>
        </div>
    );
}

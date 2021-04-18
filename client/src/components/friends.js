import { useState, useEffect } from "react";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { receiveFriendsWannabes, acceptFriend, unfriend } from "../actions";
import { Link } from "react-router-dom";

export default function Friends() {
    // const [button, setButtons] = useState([]);
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
        dispatch(receiveFriendsWannabes());
    }, []);

    function handleFriends() {
        console.log("I clicked the button");
        // dispatch(unfriend()).then((data) => {
        //     console.log("friends data", data);
        //     console.log("friendship ended");
        // });
    }
    // function handleWannabees() {
    //     console.log("I clicked the button");
    //     console.log("vaule", wannabee.id);

    //     // dispatch(acceptFriend()).then((data) => {
    //     //     console.log("wannabee data", data);
    //     //     console.log("Friendship accepted");
    //     // });
    // }

    console.log("1friends", friends);
    console.log("1wannabees", wannabees);
    return (
        <div>
            <p>Your Friends</p>
            {friends &&
                friends.map((friend) => {
                    return (
                        <div className="friendsList" key={friend.id}>
                            <Link to={"/user/" + friend.id}>
                                <img
                                    id="profilepicture"
                                    src={
                                        friend.profile_pic || "defaultuser.png"
                                    }
                                />
                                <p>
                                    {friend.first} {friend.last}
                                </p>
                            </Link>
                            <button
                                onClick={() => dispatch(unfriend(friend.id))}
                            >
                                End Friendship
                            </button>
                        </div>
                    );
                })}
            ;<p>Your wannabee Friends</p>
            {wannabees &&
                wannabees.map((wannabee) => {
                    return (
                        <div className="wannabeeList" key={wannabee.id}>
                            <Link to={"/user/" + wannabee.id}>
                                <img
                                    id="profilepicture"
                                    src={
                                        wannabee.profile_pic ||
                                        "defaultuser.png"
                                    }
                                />
                                <p>
                                    {wannabee.first} {wannabee.last}
                                </p>
                            </Link>
                            <button
                                onClick={() =>
                                    dispatch(acceptFriend(wannabee.id))
                                }
                            >
                                Accept Friendshiprequest
                            </button>
                        </div>
                    );
                })}
            ;
        </div>
    );
}

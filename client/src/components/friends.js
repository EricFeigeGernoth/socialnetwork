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

    console.log("1friends", friends);
    console.log("1wannabees", wannabees);
    return (
        <div className="searchFrameWork">
            <div className="searchBox">
                <p className="header3">The friends you made along the way</p>
                <div className="wannabeeList">
                    {friends &&
                        friends.map((friend) => {
                            return (
                                <div className="wannabee" key={friend.id}>
                                    <div>
                                        <Link to={"/user/" + friend.id}>
                                            <img
                                                id="profilepicture"
                                                src={
                                                    friend.profile_pic ||
                                                    "defaultuser.png"
                                                }
                                            />
                                        </Link>
                                    </div>{" "}
                                    <div>
                                        <p className="nameName">
                                            {friend.first} {friend.last}
                                        </p>
                                    </div>
                                    <div>
                                        <button
                                            className="buttonStyling2"
                                            onClick={() =>
                                                dispatch(unfriend(friend.id))
                                            }
                                        >
                                            End Friendship
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    ;
                </div>
                <p className="header3">New Acquaintances</p>
                <div className="wannabeeList">
                    {wannabees &&
                        wannabees.map((wannabee) => {
                            return (
                                <div className="wannabee" key={wannabee.id}>
                                    <div>
                                        <Link to={"/user/" + wannabee.id}>
                                            <img
                                                id="profilepicture"
                                                src={
                                                    wannabee.profile_pic ||
                                                    "defaultuser.png"
                                                }
                                            />
                                        </Link>
                                    </div>
                                    <div>
                                        <p className="nameName">
                                            {wannabee.first} {wannabee.last}
                                        </p>
                                    </div>
                                    <div>
                                        <button
                                            className="buttonStyling2"
                                            onClick={() =>
                                                dispatch(
                                                    acceptFriend(wannabee.id)
                                                )
                                            }
                                        >
                                            Accept Friendshiprequest
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                </div>
                ;
            </div>
        </div>
    );
}

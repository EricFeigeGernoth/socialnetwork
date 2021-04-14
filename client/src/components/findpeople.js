import { useState, useEffect } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

export default function FindPeople() {
    console.log("I am in findpeople");

    const [members, setMembers] = useState([]);
    const [query, setQuery] = useState("");

    const handleChange = (e) => {
        // console.log("handleChange is running!");
        console.log("e.target.value", e.target.value);
        setQuery(e.target.value);
    };

    useEffect(() => {
        let abort = false;
        axios.get(`/users/${query}`).then((result) => {
            console.log(result.data);
            if (!abort) {
                setMembers(result.data);
            }
        });
        return () => {
            // cleanup function
            abort = true;
        };
    }, [query]);

    useEffect(() => {
        console.log("I am in mounting");
        let abort = false;
        axios.get("/users").then((result) => {
            console.log("data", result.data);
            setMembers(result.data);
            // console.log("members", members);
            // console.log("member", member);
        });
    }, []);

    return (
        <div>
            <h1>Find People</h1>
            <div>
                <p>Type in your friends and find them</p>
                <input onChange={handleChange}></input>
            </div>
            {members.map((member) => {
                return (
                    <div className="membersProfile" key={member.id}>
                        <Link to={"/user/" + member.id}>
                            <img
                                id="profilepicture"
                                src={member.profile_pic || "defaultuser.png"}
                            />
                            <p>
                                {member.first} {member.last}
                            </p>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

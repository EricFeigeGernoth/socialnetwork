import { useState, useEffect } from "react";
import axios from "../axios";

export default function FindPeople() {
    console.log("I am in findpeople");

    const [members, setMembers] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        console.log("I am in mounting");
        let abort = false;
        axios.get("/users").then((data) => {
            console.log(data);
            setMembers(data);
        }, []);
        // const { data } = await axios.get("/users");
        // console.log("data: ", data);
        // if (!abort) {
        //     // if block runs if "abort" is false
        //     setCountries(data);
        // }
    });

    return (
        <div>
            <h1>Find People</h1>
            <div>
                {members.map((member) => {
                    <div className="membersProfile" key={member.id}>
                        {member.first} {member.last}
                    </div>;
                })}
            </div>
        </div>
    );
}

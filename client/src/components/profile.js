import { BioEditor } from "./bio-editor.js";
import ProfilePic from "./profile-pic.js";

export default function Profile(props) {
    // All the props need to be passed down from <App />
    return (
        <section id={"main_profile"}>
            <div className="profileBox">
                <div className="imgAndName">
                    {" "}
                    <img
                        id="inProfilePic"
                        src={props.profile_pic || "defaultuser.png"}
                        onClick={() => props.showUploader()}
                    />
                    <div className="nameName">
                        <h2>
                            {props.first} {props.last}
                        </h2>
                        <h3>{props.bio}</h3>
                        <BioEditor bio={props.bio} setBio={props.setBio} />
                    </div>
                </div>
            </div>
        </section>
    );
}

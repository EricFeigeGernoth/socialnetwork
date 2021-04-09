import { BioEditor } from "./bio-editor.js";
import ProfilePic from "./profile-pic.js";

export default function Profile(props) {
    // All the props need to be passed down from <App />
    return (
        <section id={"main_profile"}>
            <ProfilePic
                profile_pic={props.profile_pic}
                showUploader={props.showUploader}
            />
            <h2>
                {props.first} {props.last}
            </h2>
            <h3>{props.bio}</h3>
            <BioEditor bio={props.bio} setBio={props.setBio} />
        </section>
    );
}

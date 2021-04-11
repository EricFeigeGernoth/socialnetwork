export default function ProfilePic(props) {
    console.log("ProfilePic props", props);

    return (
        <section id={"profilePicSection"}>
            {/* <h2>Wow {props.first} a picture! You may click it</h2> */}
            <img
                id="profilepicture"
                src={props.profile_pic || "defaultuser.png"}
                onClick={() => props.showUploader()}
            />
        </section>
    );
}

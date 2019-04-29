import React from "react";

export default function Profile({
    profilePic,
    firstname,
    lastname,
    bioEditor
}) {
    return (
        <div className="profile">
            {profilePic}
            <div>
                <div className="profile-name">{`${firstname} ${lastname}`}</div>
                {bioEditor}
            </div>
        </div>
    );
}

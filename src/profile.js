import React from "react";

export default function Profile({
    profilePic,
    firstname,
    lastname,
    bioEditor
}) {
    return (
        <div className="profile">
            <div className="profile-area">
                {profilePic}
                <div>
                    <div className="profile-name">{`${firstname} ${lastname}`}</div>
                    {bioEditor}
                </div>
            </div>
        </div>
    );
}

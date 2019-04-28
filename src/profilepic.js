import React from "react";

export default function ProfilePic({
    image,
    firstname,
    lastname,
    clickHandler
}) {
    return (
        <img
            className="profile-picture-image"
            onClick={clickHandler}
            src={image || "/default.jpg"}
            alt={`${firstname} ${lastname}`}
        />
    );
}

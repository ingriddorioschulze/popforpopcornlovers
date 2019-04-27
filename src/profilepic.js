import React from "react";

export default function ProfilePic({
    image,
    firstname,
    lastname,
    clickHandler
}) {
    return <img onClick={clickHandler} src={image || "/default.jpg"} />;
}

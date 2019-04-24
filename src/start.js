import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";

// let elem;

// if (location.pathname == "/welcome") {
//     elem = <Welcome />;
// } else {
//     elem = <img src="/logo.gif" />;
// }

ReactDOM.render(<Welcome />, document.querySelector("main"));

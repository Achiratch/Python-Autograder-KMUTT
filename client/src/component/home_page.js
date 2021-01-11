import React from "react";
import auth from "./auth";
export const HomePage = props => {
    return (
        <div>
            <h1>Python</h1>
            <button type="button" class="btn btn-primary" onClick={() => {
                auth.logout(() => {
                    props.history.push("/");
                });
            }}>Logout</button>
        </div>
    )
}
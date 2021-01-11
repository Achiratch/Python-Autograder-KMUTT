import React from "react";
import auth from "./auth";

export const LandingPage = (props) => {
    return (
        <div>
            <h1>Sign in your account</h1>
            <button onClick={
                () => {
                    auth.login(() => {
                        props.history.push("/home")
                    })
                }
            
            }>Login</button>
        </div>
    )
}

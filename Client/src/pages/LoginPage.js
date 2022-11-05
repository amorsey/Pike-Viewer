import React from 'react'
import { useEffect } from "react"

const LoginPage = () => {
    // Devlopment or Production
    // const redirectURL = "https://tcs-scheduler.herokuapp.com"
    const redirectURL = "http://localhost:3000/week-view"

    const handleClick = () => {
        console.log("click")
        location.href = `https://pike13.com/oauth/authorize?client_id=Ks6unve0aR6E7VVYiPW2co0L6xdAWuZ53aaKl5yb&response_type=code&redirect_uri=${redirectURL}`
    }


    return (
        <div>
            <button onClick={handleClick}>Login</button>
        </div>
    )
}

export default LoginPage

import React from 'react'
import { useEffect } from "react"
import './LoginPage.css'

const LoginPage = () => {
    // const redirectURL = "https://tcs-scheduler.herokuapp.com"
    const redirectURL = "http://localhost:3000/week-view"
    const client_id = "Ks6unve0aR6E7VVYiPW2co0L6xdAWuZ53aaKl5yb"
    let loginURL = (
      "https://pike13.com/oauth/authorize" +
      "?client_id=Ks6unve0aR6E7VVYiPW2co0L6xdAWuZ53aaKl5yb" +
      "&response_type=code" +
      `&redirect_uri=${redirectURL}`
    )
    const handleClick = () => {
        location.href = loginURL
    }
    return (
        <div>
            <button onClick={handleClick}>Login</button>
        </div>
    )
}

export default LoginPage

import React from 'react'

const LoginPage = () => {
    const redirectURL = "https://tcs-scheduler.herokuapp.com"
    const handleClick = () => {
        console.log("click")
        location.href = `https://pike13.com/oauth/authorize?client_id=Ks6unve0aR6E7VVYiPW2co0L6xdAWuZ53aaKl5yb&response_type=code&redirect_uri=${redirectURL}/week-view`
    }

    return (
        <div>
            <button onClick={handleClick}>Login</button>
        </div>
    )
}

export default LoginPage

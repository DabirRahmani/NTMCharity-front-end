import { Button } from 'antd';
import React from 'react'
import SignUpRequest from '../../../../core/login-signup/signupRequest'

const SignUp = () => 
{

    const clicked=({username="1121", password="11", email="12441"})=>
    {
        SignUpRequest({username, password, email})
        .then((Response)=>
        {
            if(Response.data.success === "1")
            {
                console.log("signup successful")
            }
            else if (Response.data.success === "0")
            {
                if(Response.data.status === "emailUsernameError")
                {
                    console.log("email and username are used")
                }
                if(Response.data.status === "usernameError")
                {
                    console.log("username is used")
                }
                if(Response.data.status === "emailError")
                {
                    console.log("email is used")
                }
            }
        })
        
    }


    return( 
        <div>
            <h1>signup</h1>
            <Button onClick={clicked}>click me</Button>
        </div>
        
        
    )
}

export default SignUp

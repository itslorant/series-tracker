import axios from "axios";
import React, { useEffect } from "react";

import useHttp from "../hooks/http";

export default function User(){
    useEffect(()=>{
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + process.env.REACT_APP_WEB_API_KEY;
        const userToken = localStorage.getItem('token')
        axios.post(url,{idToken: userToken}).then(response=>console.log(response.data.users[0])).catch(error=>console.log(error))

    },[])

    return(<React.Fragment><p>Hello User!</p></React.Fragment>)
}
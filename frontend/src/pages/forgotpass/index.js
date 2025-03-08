import React, { useState } from "react";
import Login from "../login";
import { Button } from "@mui/material";

const Forgotpass = () => {

    const [back, setBack] = useState(false);

    const handleBack = () => {
        setBack(true);
    }
    return (
        (back) ? <Login /> :
        <Button onClick={() => {handleBack()}}>Quay về trang đăng nhập</Button>
    )
};  

export default Forgotpass;
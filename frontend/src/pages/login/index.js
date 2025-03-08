import React, { useState } from "react";
import { Box, 
        Button, 
        Stack } from "@mui/material";
import Introduce from "../introduce";

const Login = () => {

    const [back, setBack] = useState(false);

    const handleBack = () => {
        setBack(true);
    }

    return (
        (back) ? <Introduce /> :
        <Stack spacing={2}>
            <Button onClick={handleBack}>Quay về</Button>
        </Stack>
    )
};

export default Login;
import React, { useState } from "react";
import { Box, 
        Button, 
        Paper, 
        Stack,
        Card, 
        Typography,
        TextField,
        Link,
        Checkbox,
        FormControlLabel} from "@mui/material";
import Introduce from "../introduce";
import Forgotpass from "../forgotpass";
import Register from "../register";

import PeopleIcon from '@mui/icons-material/People';
import KeyIcon from '@mui/icons-material/Key';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Login = () => {

    const [back, setBack] = useState(false);
    const [fogot, setFogot] = useState(false);
    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [username, setUsername] = useState("");
    const handleForgotPass = () => {
        setFogot(true);
        console.log('fogot: '+fogot);
    }

    const handleBack = () => {
        setBack(true);
        console.log('back: '+back);
    }

    const handleLogin = () => {
        setLogin(true);
        console.log('login: '+login);
    }

    const handleRegister = () => {
        setRegister(true);
        console.log('register: '+register);
    }
    return (
        (register) ? <Register /> :
        (fogot) ? <Forgotpass /> :
        (back) ? <Introduce /> :
        <Paper>
            <Stack direction={"row"} spacing={4}>
                <Stack>
                    <img src="/images/log.jpg" 
                        alt="login"
                        style={{width: '710px', 
                                }}
                    />
                </Stack>
                <Stack sx={{width: '750px', marginTop: '100px',
                            justifyContent: 'center',
                            alignItems: 'center'}}>
                    <Typography variant="h3" 
                                color="primary" 
                                spacing={2}>Đăng Nhập</Typography>
                    <TextField id="tf-user" 
                                label="Tên đăng nhập"
                                required
                                value={username}
                                placeholder="Tên đăng nhập"
                                onChange={(e) => setUsername(e.target.value)}
                                error={username === ""}
                                helperText={username === "" ? "Tên đăng nhập không được trống" : ""}
                                slotProps={
                                    {
                                        input: {
                                            startAdornment: (
                                                <PeopleIcon color="primary" sx={{marginRight: '10px'}}/>
                                            )
                                        }
                                    }
                                }
                                sx={{margin: '20px 0',
                                    width: '360px'}}
                                />
                    <TextField id="tf-pass" 
                                label="Mật khẩu"
                                type={showPass ? "text" : "password"}
                                placeholder="Mật khẩu"
                                autoComplete="current-password"
                                required
                                slotProps={
                                    {
                                        input: {
                                            startAdornment: (
                                                <KeyIcon color="primary" sx={{marginRight: '10px'}}/>
                                            ),
                                            endAdornment: (
                                                showPass ?
                                                <VisibilityOffIcon color="primary" 
                                                                sx={{marginLeft: '10px'}}
                                                                onClick={() => {setShowPass(false)}}/> :
                                                <VisibilityIcon color="primary" 
                                                                    sx={{marginLeft: '10px'}}
                                                                    onClick={() => {setShowPass(true)}}/>
                                            )
                                        }
                                    }
                                }
                                sx={{width: '360px'}}
                                />
                    <Stack direction={"row"} spacing={8}>
                        <FormControlLabel control={<Checkbox />} label="Lưu đăng nhập"/>
                        <Link color="secondary"
                            onClick={handleForgotPass}
                            component={"button"}>
                            Quên mật khẩu?
                        </Link>
                    </Stack>
                    <Button variant="contained" 
                            sx={{width: '178px', 
                                height: '32px', 
                                margin: '24px 16px 16px 16px',
                                color: '#fff',
                                borderRadius: '10px'}}
                            onClick={() => {handleLogin()}}>
                        Đăng Nhập
                    </Button>
                    <Typography variant="body1"
                                sx={{fontSize: '14px'}}>
                        -Bạn chưa có tài khoản?-
                    </Typography>
                    <Button variant="contained" 
                            color="secondary"
                            sx={{width: '178px', 
                                height: '32px', 
                                margin: '16px 16px 4px 16px',
                                color: '#fff',
                                borderRadius: '10px'}}
                            onClick={() => {handleRegister()}}>
                        Đăng Ký
                    </Button>
                    <Button variant="text" 
                            startIcon={<KeyboardBackspaceIcon />}
                            sx={{margin: '4px 0',
                                color: '#000',
                                fontWeight: 200}}
                            onClick={() => {handleBack()}}>
                        Quay về
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    )
};

export default Login;
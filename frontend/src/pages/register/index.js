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

import Login from "../login";

import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import KeyIcon from '@mui/icons-material/Key';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Register = () => {

    const [back, setBack] = useState(false);
    const [register, setRegister] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showPass2, setShowPass2] = useState(false);
    const [username, setUsername] = useState("");

    const handleBack = () => {
        setBack(true);
    }

    const handleRegister = () => {
        setRegister(true);
    }
    return (
        (back) ? <Login /> :
        <Paper>
            <Stack direction={"row"} spacing={4}>
                <Stack>
                    <img src="/images/reg.png" 
                        alt="register"
                        style={{width: '710px', 
                                }}
                    />
                </Stack>
                <Stack sx={{width: '750px', marginTop: '100px',
                            justifyContent: 'center',
                            alignItems: 'center'}}>
                    <Typography variant="h3" 
                                color="primary" 
                                spacing={2}>Đăng Ký</Typography>
                    <TextField id="tf-name" 
                                label="Họ và tên"
                                required
                                placeholder="Họ và tên"
                                slotProps={
                                    {
                                        input: {
                                            startAdornment: (
                                                <PersonIcon color="primary" sx={{marginRight: '10px'}}/>
                                            )
                                        }
                                    }
                                }
                                sx={{margin: '20px 0',
                                    width: '360px'}}
                                />
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
                    <TextField id="tf-pass2" 
                                label="Nhập lại mật khẩu"
                                type={showPass2 ? "text" : "password"}
                                placeholder="Nhập lại mật khẩu"
                                autoComplete="current-password"
                                required
                                slotProps={
                                    {
                                        input: {
                                            startAdornment: (
                                                <LockIcon color="primary" sx={{marginRight: '10px'}}/>
                                            ),
                                            endAdornment: (
                                                showPass2 ?
                                                <VisibilityOffIcon color="primary" 
                                                                sx={{marginLeft: '10px'}}
                                                                onClick={() => {setShowPass2(false)}}/> :
                                                <VisibilityIcon color="primary" 
                                                                    sx={{marginLeft: '10px'}}
                                                                    onClick={() => {setShowPass2(true)}}/>
                                            )
                                        }
                                    }
                                }
                                sx={{width: '360px', margin: '20px 0'}}
                                />
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

export default Register;
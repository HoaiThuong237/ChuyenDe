import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../login";
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

import KeyIcon from '@mui/icons-material/Key';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Forgotpass = () => {

    const [back, setBack] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showPass2, setShowPass2] = useState(false);

    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/login');
        setBack(true);
    }
    return (
        <Paper>
            <Stack direction={"row"} spacing={4}>
                <Stack>
                    <img src="/images/forgotpass.jpg" 
                        alt="forgotpass"
                        style={{width: '710px', 
                                }}
                    />
                </Stack>
                <Stack sx={{width: '750px', marginTop: '100px',
                            justifyContent: 'center',
                            alignItems: 'center'}}>
                    <Typography variant="h3" 
                                color="primary" 
                                spacing={2}>Đổi mật khẩu</Typography>
                    <TextField id="tf-pass" 
                                label="Mật khẩu mới"
                                type={showPass ? "text" : "password"}
                                placeholder="Mật khẩu mới"
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
                                                <VisibilityIcon color="primary" 
                                                                sx={{marginLeft: '10px'}}
                                                                onClick={() => {setShowPass(false)}}/> :
                                                <VisibilityOffIcon color="primary" 
                                                                    sx={{marginLeft: '10px'}}
                                                                    onClick={() => {setShowPass(true)}}/>
                                            )
                                        }
                                    }
                                }
                                sx={{width: '360px', margin: '20px 0'}}
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
                                                <VisibilityIcon color="primary" 
                                                                sx={{marginLeft: '10px'}}
                                                                onClick={() => {setShowPass2(false)}}/> :
                                                <VisibilityOffIcon color="primary" 
                                                                    sx={{marginLeft: '10px'}}
                                                                    onClick={() => {setShowPass2(true)}}/>
                                            )
                                        }
                                    }
                                }
                                sx={{width: '360px', margin: '20px 0'}}
                                />
                    <Button variant="contained" 
                            sx={{width: '178px', 
                                height: '32px', 
                                margin: '24px 16px 16px 16px',
                                color: '#fff',
                                borderRadius: '10px'}}>
                        Xác nhận
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

export default Forgotpass;
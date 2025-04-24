import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

import PeopleIcon from '@mui/icons-material/People';
import KeyIcon from '@mui/icons-material/Key';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Login = () => {

    const [identifier, setIdentifier] = useState(""); 

    const [showPass, setShowPass] = useState(false);
    const [Password, setPassword] = useState("");
    const [rememberLogin, setRememberLogin] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!identifier || !Password) {
            setError("Vui lòng nhập đầy đủ thông tin.");
            return;
        }


        // deploy
        try {
            const response = await fetch("https://sql-monan.onrender.com/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ login: identifier, Password }),
            });

            //localhost

            // try {
            //     const response = await fetch("http://localhost:5000/login", {
            //         method: "POST",
            //         headers: { "Content-Type": "application/json" },
            //         body: JSON.stringify({ login: identifier, Password }),
            //     });
    
            const data = await response.json();
            console.log(data);

            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(data.user));
                if (rememberLogin) {
                    localStorage.setItem("rememberLogin", "true");
                }
                else {
                    localStorage.removeItem("rememberLogin");
                  }
                    alert("Đăng nhập thành công!");

                    console.log("User in localStorage:", localStorage.getItem("user"));
                    console.log("Remember Login:", localStorage.getItem("rememberLogin"));

                    navigate("/bepnhaminh");  
            } else {
                setError(data.message || "Thông tin đăng nhập không chính xác.");
            }
        } catch (error) {
            setError("Không thể kết nối đến server.");
        }
    };
        return (
            <Paper>
                <Stack direction={"row"} spacing={4}>
                    <Stack>
                        <img src="/images/log.jpg" 
                            alt="login"
                            style={{ width: '710px' }}
                        />
                    </Stack>
                    <Stack sx={{ width: '750px', marginTop: '100px', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h3" color="primary">Đăng Nhập</Typography>
                        
                        <TextField 
                            label="Email hoặc Username"
                            required
                            value={identifier}
                            placeholder="Nhập email hoặc username"
                            onChange={(e) => setIdentifier(e.target.value)}
                            error={!identifier}
                            helperText={!identifier ? "Không được để trống" : ""}
                            sx={{ margin: '20px 0', width: '360px' }}
                            InputProps={{ startAdornment: <PeopleIcon color="primary" sx={{ marginRight: '10px' }} /> }}
                        />
    
                        <TextField 
                            label="Mật khẩu"
                            type={showPass ? "text" : "password"}
                            required
                            value={Password}
                            placeholder="Nhập mật khẩu"
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ width: '360px' }}
                            InputProps={{
                                startAdornment: <KeyIcon color="primary" sx={{ marginRight: '10px' }} />,
                                endAdornment: showPass 
                                    ? <VisibilityIcon color="primary" sx={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => setShowPass(false)} /> 
                                    : <VisibilityOffIcon color="primary" sx={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => setShowPass(true)} />
                            }}
                        />
    
                        <Stack direction={"row"} spacing={8}>
                            <FormControlLabel 
                                control={<Checkbox checked={rememberLogin} 
                                        onChange={(e) => setRememberLogin(e.target.checked)} />}
                                label="Lưu đăng nhập"
                            />
                            <Link color="secondary" onClick={() => navigate('/quenmatkhau')} component={"button"}>
                                Quên mật khẩu?
                            </Link>
                        </Stack>
    
                        {error && <Typography color="error">{error}</Typography>}
    
                        <Button variant="contained" 
                                sx={{ width: '178px', 
                                      height: '32px', margin: '24px 16px 16px 16px', 
                                      borderRadius: '10px', color: 'white' }}
                                onClick={handleLogin}>
                            Đăng Nhập
                        </Button>
    
                        <Typography variant="body1" sx={{ fontSize: '14px' }}>
                            - Bạn chưa có tài khoản? -
                        </Typography>
    
                        <Button variant="contained" 
                                color="secondary"
                                sx={{ width: '178px', 
                                    height: '32px', 
                                    margin: '16px 16px 4px 16px', 
                                    borderRadius: '10px' , color: 'white'}}
                                onClick={() => navigate('/dangky')}>
                            Đăng Ký
                        </Button>
                        <Button variant="text" 
                                startIcon={<KeyboardBackspaceIcon />}
                                sx={{ margin: '4px 0', color: '#000' }}
                                onClick={() => navigate(-1)}>
                            Quay về
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        );
    };
    
    export default Login;
    

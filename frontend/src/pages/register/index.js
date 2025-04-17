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

import Login from "../login";

import EmailIcon from '@mui/icons-material/Email';
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
    const [Password, setPassword] = useState("");
    const [Password2, setPassword2] = useState("");
    const [Name, setName] = useState("");
    const [Username, setUsername] = useState(""); // Đổi username -> username
    const [Email, setEmail] = useState(""); // Thêm email
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
        setBack(true);
    };

    const handleRegister = async () => {
        if (Username === "" || Password === "" || Name === "" || Password2 === "" || Email === "") {
            setError("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        if (Password !== Password2) {
            setError("Mật khẩu không khớp nhau.");
            return;
        }

        console.log("Dữ liệu gửi lên:", { Name, Username, Email, Password });

        // Gửi request đăng ký đến API backend
        try {
            const response = await fetch("https://sql-monan.onrender.com/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Name, Username, Email, Password })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Đăng ký thành công! Hãy đăng nhập.");
                navigate("/login");
            } else {
                setError(data.message || "Có lỗi xảy ra, vui lòng thử lại.");
            }
        } catch (error) {
            setError("Không thể kết nối đến server.");
        }

        setRegister(true);
    };

    return (
        (back) ? <Login /> :
        <Paper>
            <Stack direction={"row"} spacing={4}>
                <Stack>
                    <img src="/images/reg.png" 
                        alt="register"
                        style={{width: '710px'}}
                    />
                </Stack>
                <Stack sx={{width: '750px', marginTop: '100px', justifyContent: 'center', alignItems: 'center'}}>
                    <Typography variant="h3" color="primary">Đăng Ký</Typography>

                    <TextField 
                        id="tf-name" label="Họ và tên" required
                        value={Name} onChange={(e) => setName(e.target.value)}
                        placeholder="Họ và tên"
                        sx={{margin: '20px 0', width: '360px'}}
                        InputProps={{ startAdornment: <PersonIcon color="primary" sx={{marginRight: '10px'}}/> }}
                    />

                    <TextField 
                        id="tf-email" label="Email" required
                        value={Email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        sx={{margin: '20px 0', width: '360px'}}
                        InputProps={{ startAdornment: <EmailIcon color="primary" sx={{marginRight: '10px'}}/> }}
                    />

                    <TextField 
                        id="tf-user" label="Tên đăng nhập" required
                        value={Username} onChange={(e) => setUsername(e.target.value)}
                        placeholder="Tên đăng nhập"
                        error={Username === ""}
                        helperText={Username === "" ? "Tên đăng nhập không được trống" : ""}
                        sx={{margin: '20px 0', width: '360px'}}
                        InputProps={{ startAdornment: <PeopleIcon color="primary" sx={{marginRight: '10px'}}/> }}
                    />

                    <TextField 
                        id="tf-pass" label="Mật khẩu" type={showPass ? "text" : "Password"} required
                        value={Password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mật khẩu"
                        sx={{width: '360px'}}
                        InputProps={{ 
                            startAdornment: <KeyIcon color="primary" sx={{marginRight: '10px'}}/>,
                            endAdornment: showPass ? 
                                <VisibilityIcon color="primary" sx={{marginLeft: '10px', cursor: 'pointer'}} onClick={() => setShowPass(false)}/> :
                                <VisibilityOffIcon color="primary" sx={{marginLeft: '10px', cursor: 'pointer'}} onClick={() => setShowPass(true)}/>
                        }}
                    />

                    <TextField 
                        id="tf-pass2" label="Nhập lại mật khẩu" type={showPass2 ? "text" : "Password"} required
                        value={Password2} onChange={(e) => setPassword2(e.target.value)}
                        placeholder="Nhập lại mật khẩu"
                        sx={{width: '360px', margin: '20px 0'}}
                        InputProps={{ 
                            startAdornment: <LockIcon color="primary" sx={{marginRight: '10px'}}/>,
                            endAdornment: showPass2 ? 
                                <VisibilityIcon color="primary" sx={{marginLeft: '10px', cursor: 'pointer'}} onClick={() => setShowPass2(false)}/> :
                                <VisibilityOffIcon color="primary" sx={{marginLeft: '10px', cursor: 'pointer'}} onClick={() => setShowPass2(true)}/>
                        }}
                    />

                    {error && <Typography color="error">{error}</Typography>}

                    <Button 
                        variant="contained" color="secondary"
                        sx={{width: '178px', height: '32px', margin: '16px 16px 4px 16px', color: '#fff', borderRadius: '10px'}}
                        onClick={handleRegister}
                    >
                        Đăng Ký
                    </Button>

                    <Button 
                        variant="text" startIcon={<KeyboardBackspaceIcon />}
                        sx={{margin: '4px 0', color: '#000', fontWeight: 200}}
                        onClick={handleBack}
                    >
                        Quay về
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default Register;
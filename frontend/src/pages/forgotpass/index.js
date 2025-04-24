import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Fade
} from "@mui/material";

import KeyIcon from '@mui/icons-material/Key';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

const Forgotpass = () => {
  const [login, setLogin] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleResetPassword = async () => {
    if (newPass !== confirmPass) {
      setMessage("Mật khẩu không khớp.");
      setSuccess(false);
      setOpenDialog(true);
      return;
    }

    try {
      const res = await axios.post("https://sql-monan.onrender.com/forgot-password", {
        login,
        newPassword: newPass,
      });

      setMessage(res.data.message);
      setSuccess(true);
      setOpenDialog(true);
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      setMessage(err.response?.data?.error || "Lỗi không xác định.");
      setSuccess(false);
      setOpenDialog(true);
    }
  };

  return (
    <Paper>
      <Stack direction={"row"} spacing={4}>
        <Stack>
          <img src="/images/forgotpass.jpg" alt="forgotpass" style={{ width: '100%', height: '100%' }} />
        </Stack>
        <Stack sx={{ width: '750px', marginTop: '100px', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h3" color="primary">Đổi mật khẩu</Typography>
          <TextField
            label="Nhập Email hoặc Username"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            sx={{ width: '360px', margin: '20px 0' }}
          />
          <TextField
            label="Mật khẩu mới"
            type={showPass ? "text" : "password"}
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            sx={{ width: '360px', margin: '20px 0' }}
            InputProps={{
              startAdornment: <KeyIcon color="primary" sx={{ marginRight: '10px' }} />,
              endAdornment: showPass
                ? <VisibilityIcon sx={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => setShowPass(false)} />
                : <VisibilityOffIcon sx={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => setShowPass(true)} />
            }}
          />
          <TextField
            label="Nhập lại mật khẩu"
            type={showPass2 ? "text" : "password"}
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            sx={{ width: '360px', margin: '20px 0' }}
            InputProps={{
              startAdornment: <LockIcon color="primary" sx={{ marginRight: '10px' }} />,
              endAdornment: showPass2
                ? <VisibilityIcon sx={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => setShowPass2(false)} />
                : <VisibilityOffIcon sx={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => setShowPass2(true)} />
            }}
          />
          <Button variant="contained"
            onClick={handleResetPassword}
            sx={{ width: '178px', height: '32px', margin: '24px 16px 16px 16px', color: '#fff', borderRadius: '10px' }}>
            Xác nhận
          </Button>
          <Button variant="text"
            startIcon={<KeyboardBackspaceIcon />}
            onClick={handleBack}
            sx={{ margin: '4px 0', color: '#000', fontWeight: 200 }}>
            Quay về
          </Button>
        </Stack>
      </Stack>

   
      <Dialog open={openDialog} TransitionComponent={Fade} keepMounted onClose={() => setOpenDialog(false)}>
        <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: '22px' }}>
          {success ? "🎉 Thành công!" : "❗ Thất bại"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpenDialog(false)}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ minWidth: '300px', textAlign: 'center' }}>
          <DialogContentText sx={{ fontSize: '18px' }}>
            {message}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

export default Forgotpass;

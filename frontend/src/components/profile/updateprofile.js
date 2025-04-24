
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Avatar, Box, Button, 
//          Dialog, DialogActions, 
//          DialogContent, DialogTitle, 
//          IconButton, Stack, 
//          TextField, Typography } from "@mui/material";
// import { SmallDialog, MediumDialog, LargeDialog } from "../../theme/dialog";
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
// import KeyIcon from '@mui/icons-material/Key';
// import LockIcon from '@mui/icons-material/Lock';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import CloseIcon from '@mui/icons-material/Close';

// const UpdateProfile = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));
  
//   const [hover, setHover] = useState(false);
//   const [showPass, setShowPass] = useState(false);
//   const [showPass2, setShowPass2] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleBack = () => {
//     navigate(-1);
//   }

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSubmit = async () => {
//     // Kiểm tra mật khẩu mới và mật khẩu xác nhận có khớp không
//     if (newPassword !== confirmPassword) {
//       alert("Mật khẩu mới và mật khẩu xác nhận không khớp!");
//       return;
//     }

//     // Gửi yêu cầu thay đổi mật khẩu đến API
//     try {
//       const response = await fetch("http://localhost:5000/forgot-password", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           login: user.Email, // Hoặc user.Username nếu bạn muốn dùng tên đăng nhập
//           newPassword: newPassword,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert(data.message);
//         setOpen(false); // Đóng dialog sau khi thay đổi thành công
//       } else {
//         alert(data.error || "Có lỗi xảy ra!");
//       }
//     } catch (error) {
//       console.error("Error changing password:", error);
//       alert("Đã có lỗi khi thay đổi mật khẩu!");
//     }
//   };

//   return (
//     <div>
//       <IconButton onClick={handleBack}>
//         <ArrowBackIcon />
//       </IconButton>
//       <Stack spacing={4} sx={{ paddingLeft: '30%', paddingRight: '30%', paddingTop: '5%', paddingBottom: '5%' }}>
//         <Box sx={{ position: "relative", width: 100, height: 100, borderRadius: "50%" }}
//           onMouseEnter={() => setHover(true)}
//           onMouseLeave={() => setHover(false)}>
//           <Avatar src="/broken-image.jpg" sx={{ bgcolor: 'primary.main', color: 'white', width: '100px', height: '100px' }} />
//           {hover &&
//             (
//               <Box sx={{
//                 position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
//                 display: "flex", justifyContent: "center", alignItems: "center",
//                 backgroundColor: "rgba(0, 0, 0, 0.5)", borderRadius: "50%",
//               }}>
//                 <IconButton color="primary" component="label">
//                   <PhotoCameraIcon />
//                 </IconButton>
//               </Box>
//             )
//           }
//         </Box>
//         <TextField label={user.Username} disabled variant="outlined" />
//         <TextField label={user.Name} variant="outlined" />
//         <TextField label={user.Email} variant="outlined" />
//         <Button variant="contained" onClick={() => setOpen(true)} sx={{ color: 'white' }}>
//           Đổi mật khẩu
//         </Button>
//         <Stack direction={"row"} spacing={2}>
//           <Button variant="contained" color="secondary" sx={{ color: 'white', width: '50%' }}>
//             Cập nhật
//           </Button>
//           <Button variant="contained" color="error" onClick={handleBack} sx={{ color: 'white', width: '50%' }}>
//             Hủy
//           </Button>
//         </Stack>
//       </Stack>

//       <MediumDialog open={open}>
//         <DialogTitle sx={{ backgroundColor: '#ff9800', color: '#fff' }}>
//           <IconButton onClick={handleClose} sx={{ color: 'white', position: 'absolute', right: '1rem', top: '1rem' }}>
//             <CloseIcon />
//           </IconButton>
//           <Typography variant="h4">Đổi mật khẩu</Typography>
//         </DialogTitle>
//         <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//           <TextField id="tf-pass" label="Mật khẩu mới" type={showPass ? "text" : "password"} placeholder="Mật khẩu mới"
//             autoComplete="current-password" required onChange={(e) => setNewPassword(e.target.value)}
//             sx={{ width: '360px', margin: '20px 0' }}
//             slotProps={{
//               input: {
//                 startAdornment: <KeyIcon color="primary" sx={{ marginRight: '10px' }} />,
//                 endAdornment: showPass ?
//                   <VisibilityIcon color="primary" sx={{ marginLeft: '10px' }} onClick={() => setShowPass(false)} /> :
//                   <VisibilityOffIcon color="primary" sx={{ marginLeft: '10px' }} onClick={() => setShowPass(true)} />
//               }
//             }}
//           />
//           <TextField id="tf-pass2" label="Nhập lại mật khẩu" type={showPass2 ? "text" : "password"} placeholder="Nhập lại mật khẩu"
//             autoComplete="current-password" required onChange={(e) => setConfirmPassword(e.target.value)}
//             sx={{ width: '360px', margin: '20px 0' }}
//             slotProps={{
//               input: {
//                 startAdornment: <LockIcon color="primary" sx={{ marginRight: '10px' }} />,
//                 endAdornment: showPass2 ?
//                   <VisibilityIcon color="primary" sx={{ marginLeft: '10px' }} onClick={() => setShowPass2(false)} /> :
//                   <VisibilityOffIcon color="primary" sx={{ marginLeft: '10px' }} onClick={() => setShowPass2(true)} />
//               }
//             }}
//           />
//         </DialogContent>
//         <DialogActions sx={{ padding: '10px' }}>
//           <Button variant="contained" color="secondary" onClick={handleSubmit} sx={{ color: 'white', width: '120px' }}>
//             Xác nhận
//           </Button>
//           <Button variant="contained" color="error" sx={{ color: 'white', width: '120px' }} onClick={handleClose}>
//             Hủy
//           </Button>
//         </DialogActions>
//       </MediumDialog>
//     </div>
//   );
// };

// export default UpdateProfile;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar, Box, Button, Dialog, DialogActions,
  DialogContent, DialogTitle, IconButton, Stack,
  TextField, Typography, Snackbar, InputAdornment
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import KeyIcon from '@mui/icons-material/Key';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState(storedUser.Name);
  const [email, setEmail] = useState(storedUser.Email);
  const [hover, setHover] = useState(false);
  const [avatar, setAvatar] = useState(storedUser.avatarUrl || "");

  const [openPwd, setOpenPwd] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const showMessage = (msg) => setSnackbar({ open: true, message: msg });
  const handleBack = () => navigate(-1);

  const handleUpdateProfile = async () => {
    if (!name.trim() || !email.trim()) {
      showMessage("Tên và email không được để trống.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Username: storedUser.Username,
          Name: name,
          Email: email
        })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        showMessage(data.message);
      } else {
        showMessage(data.error || "Cập nhật thất bại.");
      }
    } catch (err) {
      console.error(err);
      showMessage("Lỗi khi gọi API.");
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      showMessage("Mật khẩu mới và mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login: storedUser.Email,
          newPassword
        })
      });

      const data = await response.json();
      if (response.ok) {
        showMessage(data.message);
        setOpenPwd(false);
        setNewPassword("");
        setConfirmPassword("");
      } else {
        showMessage(data.error || "Có lỗi xảy ra!");
      }
    } catch (error) {
      console.error("Error:", error);
      showMessage("Lỗi khi thay đổi mật khẩu.");
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setAvatar(imgUrl);
      // TODO: upload to server nếu cần
    }
  };

  return (
    <div>
      <IconButton onClick={handleBack}>
        <ArrowBackIcon />
      </IconButton>

      <Stack spacing={4} sx={{ px: "30%", py: "5%" }}>
        <Box
          sx={{ position: "relative", width: 100, height: 100, borderRadius: "50%" }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Avatar src={avatar} sx={{ width: 100, height: 100 }} />
          {hover && (
            <Box sx={{
              position: "absolute", inset: 0,
              display: "flex", justifyContent: "center", alignItems: "center",
              bgcolor: "rgba(0,0,0,0.5)", borderRadius: "50%"
            }}>
              <IconButton component="label" color="primary">
                <PhotoCameraIcon />
                <input type="file" hidden onChange={handleAvatarChange} />
              </IconButton>
            </Box>
          )}
        </Box>

        <TextField label="Username" value={storedUser.Username} disabled variant="outlined" />
        <TextField label="Tên đầy đủ" value={name} onChange={e => setName(e.target.value)} />
        <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} />

        <Button variant="contained" onClick={() => setOpenPwd(true)} color="info">
          Đổi mật khẩu
        </Button>

        <Stack direction="row" spacing={2}>
          <Button fullWidth variant="contained" color="secondary" onClick={handleUpdateProfile}>
            Cập nhật
          </Button>
          <Button fullWidth variant="contained" color="error" onClick={handleBack}>
            Hủy
          </Button>
        </Stack>
      </Stack>

      <Dialog open={openPwd} onClose={() => setOpenPwd(false)}>
        <DialogTitle>
          Đổi mật khẩu
          <IconButton onClick={() => setOpenPwd(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            margin="normal"
            label="Mật khẩu mới"
            type={showPass ? "text" : "password"}
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><KeyIcon /></InputAdornment>,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass(!showPass)}>
                    {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Nhập lại mật khẩu"
            type={showPass2 ? "text" : "password"}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment>,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass2(!showPass2)}>
                    {showPass2 ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChangePassword} variant="contained" color="primary">Xác nhận</Button>
          <Button onClick={() => setOpenPwd(false)} variant="outlined" color="error">Hủy</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: "" })}
      />
    </div>
  );
};

export default UpdateProfile;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, 
         Dialog, 
         DialogActions, 
         DialogContent, 
         DialogTitle, 
         IconButton,
         Stack, 
         TextField,
         Typography} from "@mui/material";
import { SmallDialog, MediumDialog, LargeDialog } from "../../theme/dialog";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import KeyIcon from '@mui/icons-material/Key';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';

const UpdateProfile = () => {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const [hover, setHover] = useState(false)
    const [showPass, setShowPass] = useState(false);
    const [showPass2, setShowPass2] = useState(false);
    const [open, setOpen] = useState(false);
    

    const handleBack = () => {
        navigate(-1)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton onClick={handleBack}>
                <ArrowBackIcon />
            </IconButton>
            <Stack spacing={4} sx={{paddingLeft: '30%', 
                                    paddingRight: '30%', 
                                    paddingTop: '5%',
                                    paddingBottom: '5%'}}>
                <Box  sx={{ position: "relative", 
                            width: 100, height: 100, 
                            borderRadius: "50%" }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}>
                    <Avatar src="/broken-image.jpg" 
                            sx={{bgcolor: 'primary.main', 
                                color: 'white',
                                width: '100px',
                                height: '100px'}}/>
                    {hover && 
                        (
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    borderRadius: "50%",
                                }}
                                >
                                <IconButton color="primary" component="label">
                                    <PhotoCameraIcon />
                                    {/* <input
                                    type="file"
                                    hidden
                                    ref={fileInputRef}
                                    accept="image/*"
                                    onChange={(e) => e.target.files && handleUpload(e.target.files[0])}
                                    /> */}
                                </IconButton>
                                </Box>
                        )
                    }
                </Box>
                <TextField label={user.Username} disabled 
                            variant="outlined"
                            />
                <TextField label={user.Name}
                            variant="outlined"/>
                <TextField label={user.Email}
                            variant="outlined"/>
                <Button variant="contained"
                        onClick={() => setOpen(true)}
                        sx={{color: 'white'}}>
                    Đổi mật khẩu
                </Button>
                <Stack direction={"row"} spacing={2}>
                    <Button variant="contained" color="secondary"
                            sx={{color: 'white', width: '50%'}}>
                        Cập nhật
                    </Button>
                    <Button variant="contained" color="error"
                            onClick={handleBack}
                            sx={{color: 'white', width: '50%'}}>
                        Hủy
                    </Button>
                </Stack>
            </Stack>
            <MediumDialog open={open}>
                <DialogTitle sx={{
                    backgroundColor: '#ff9800',
                    color: '#fff'}}>
                        <IconButton onClick={handleClose} 
                                    sx={{color: 'white',
                                        position: 'absolute', 
                                        right: '1rem', top: '1rem'}}>
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h4">Đổi mật khẩu</Typography>
                </DialogTitle>
                <DialogContent dividers sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
                </DialogContent>
                <DialogActions sx={{padding: '10px'}}>
                    <Button variant="contained" 
                            color="secondary"
                            onClick={handleSubmit}
                            sx={{color: 'white', width: '120px'}}
                    >Xác nhận</Button>
                    <Button variant="contained"
                            color="error"
                            sx={{color: 'white', width: '120px'}}
                            onClick={handleClose}
                    >Hủy</Button>
                </DialogActions>
            </MediumDialog>
        </div>
    )
};

export default UpdateProfile;
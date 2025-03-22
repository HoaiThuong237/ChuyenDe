import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, 
         IconButton,
         Stack, 
         TextField} from "@mui/material";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const UpdateProfile = () => {

    const navigate = useNavigate();

    const [hover, setHover] = useState(false)

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <div>
            <IconButton onClick={handleBack}>
                <ArrowBackIcon />
            </IconButton>
            <Stack spacing={2} sx={{paddingLeft: '30%', paddingRight: '30%'}}>
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
                <TextField label="Tên" 
                            variant="outlined"/>
                <Stack direction={"row"} spacing={2}>
                    <Button variant="contained"
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
        </div>
    )
};

export default UpdateProfile;
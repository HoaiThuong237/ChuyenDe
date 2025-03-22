import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, 
         Button, 
         Card, 
         CardActionArea, 
         CardContent, 
         CardHeader, 
         CardMedia, 
         Grid2, 
         IconButton, 
         Paper, 
         Stack, 
         Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Profile = () => {

    const navigate = useNavigate()
    const handleOpenUpdateProfile = () => {
        navigate("/home/update-profile");
    }

    const handleBack = () =>{
        navigate(-1)
    }

    return (
        <Stack>
            <IconButton onClick={handleBack}
                sx={{width: '40px'}}>
                <ArrowBackIcon />
            </IconButton>
            <Stack spacing={2} flexGrow={1}
                    sx={{width: '100%', paddingLeft: '25%', paddingRight: '25%'}}>
                <Stack direction={"row"} spacing={2}>
                    <Avatar src="/broken-image.jpg" 
                            sx={{bgcolor: 'primary.main', 
                                color: 'white'}} />
                    <Stack>
                        <Typography variant="h4">Admin</Typography>
                        <Typography variant="body2">@Admin</Typography>
                    </Stack>
                </Stack>
                <Button variant="contained"
                        sx={{color: 'white'}}
                        onClick={handleOpenUpdateProfile}>
                    Chỉnh sửa thông tin cá nhân
                </Button>
                <Stack spacing={2} alignItems={"center"} paddingTop={8} paddingBottom={10}>
                    <img src="/images/emptybowl.jpg" alt="emptybowl"
                        height={200}
                    />
                    <Typography variant="h4">Bạn chưa có công thức nào.</Typography>
                    <Typography variant="body1">Hãy tạo một công thức nào!</Typography>
                </Stack>
            </Stack>
        </Stack>
    )
};

export default Profile;
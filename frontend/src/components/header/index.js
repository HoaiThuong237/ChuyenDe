import React, { useState } from "react";
import { Paper, 
        TextField, 
        Box, 
        Button, 
        Stack,
        Typography,
        IconButton,
        Avatar,
        AppBar,
        Menu,
        MenuItem,
        Card,
        ListItemIcon,
        ListItemText} from "@mui/material";
import { useNavigate } from "react-router-dom";

import AddIcon from '@mui/icons-material/Add';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {

    const user = JSON.parse(localStorage.getItem("user"));
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleOpenProfile = () => {
        navigate("/bepnhaminh/trangcanhan");
    }

    const handleOpenAddRecipe = () => {
        navigate("/bepnhaminh/themcongthuc");
    }
    const handleLogout = () => {
        localStorage.removeItem("rememberLogin");
        window.location.href = "/gioithieu";
    }
    return (
        <Paper direction="row" elevation={1}
                sx={{
                    position: 'sticky',
                    top: "10px",
                    width: '100%', // Chiếm toàn bộ chiều rộng
                    height: '70px', // Hoặc có thể đặt là 'auto' nếu muốn linh hoạt
                    zIndex: 1100, // Giữ trên các thành phần khác
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    px: 2,
                    margin: '0 10px 0 0'
                }}>
            <Stack direction="row" spacing={2}
                    alignItems={"center"}
                    sx={{width: '100%', height: '100%'}}>
                <Stack direction="row" 
                       spacing={2} 
                       flexGrow={1}
                       sx={{cursor: 'pointer'}}
                       onClick={() => navigate("/bepnhaminh")}>
                    <img src='/images/logo.png' alt='logo'
                        style={{width: '40px', 
                                height: '40px', 
                                margin: '0 0 0 3px'}}/>
                    <Typography variant='h2' 
                                color='primary' 
                                style={{margin: '8px 0 0 5px', 
                                        fontSize: '20px'}}>
                    Bếp Nhà Mình
                    </Typography>
                </Stack>
                <Stack direction={"row"} spacing={2} flexGrow={2}>
                    <TextField 
                        size="small" fullWidth
                        placeholder="Tìm kiếm..."
                        slotProps={
                            {
                                input: {
                                    startAdornment: (
                                        <IconButton color="primary">
                                            <SearchIcon />
                                        </IconButton>
                                    )
                                }
                            }
                        }
                    />
                    <Button variant="contained"
                             sx={{borderRadius: '8px',
                                  height: '40px', width: '120px',
                                  color: 'white'}}>
                        Tìm kiếm
                    </Button>
                </Stack>
                <IconButton onClick={handleClick}>
                    <Avatar src="/broken-image.jpg" sx={{bgcolor: 'primary.main', color: 'white'}}/>
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}
                        slotProps={{paper: {sx: {width: '300px'}}}}>
                    <MenuItem sx={{pointerEvents: 'none'}}>
                        <Stack direction="row" spacing={2}>
                            <Avatar src="/broken-image.jpg" sx={{bgcolor: 'primary.main', color: 'white'}}/>
                            <Stack>
                            <Typography variant="body1">{user.Name}</Typography>
                            <Typography variant="body2">@{user.Username}</Typography>
                            </Stack>
                        </Stack>
                    </MenuItem>
                    <MenuItem onClick={handleOpenProfile} divider= {true}>Trang cá nhân</MenuItem>
                    <MenuItem onClick={handleLogout} >
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText>Đăng xuất</ListItemText>
                    </MenuItem>
                </Menu>
                <Button variant="contained" 
                        startIcon={<RestaurantIcon />}
                        onClick={handleOpenAddRecipe}
                        sx={{borderRadius: '8px', 
                             height: '40px', 
                             width: '170px', 
                             color: 'white'}}>
                    Thêm công thức
                </Button>
            </Stack>
        </Paper>
    )   
}

export default Header
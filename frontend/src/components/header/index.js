import { Paper, 
        TextField, 
        Box, 
        Button, 
        Stack,
        Typography,
        IconButton,
        Avatar,
        AppBar,
        Card} from "@mui/material";
import React from "react";
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {

    const handleLogout = () => {
        localStorage.removeItem("rememberLogin");
        window.location.href = "/introduce";
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
                    px: 2, // Thêm padding ngang cho đẹp
                    margin: '0 10px 0 0'
                }}>
            <Stack direction="row" spacing={2}
                    alignItems={"center"}
                    sx={{width: '100%', height: '100%'}}>
                <Stack direction="row" 
                       spacing={2} 
                       flexGrow={1}>
                    <img src='/images/logo.png' alt='logo'
                        style={{width: '40px', 
                                height: '40px', 
                                margin: '0 0 0 3px',
                                cursor: 'pointer'}}/>
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
                                        <IconButton>
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
                <IconButton>
                    <Avatar sx={{bgcolor: 'primary.main', color: 'white'}}>A</Avatar>
                </IconButton>
                <Button variant="contained" onClick={handleLogout}>Logout</Button>
            </Stack>
        </Paper>
    )   
}

export default Header
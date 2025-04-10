import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, 
         IconButton, 
         Box, 
         Stack, 
         Typography, 
         Button, 
         List, 
         ListItem, 
         ListItemIcon, 
         ListItemText, 
         ListItemButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import AssistantIcon from '@mui/icons-material/Assistant';

const Nav = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  return (
    <Box>
      {/* Drawer - Thanh điều hướng */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? 300 : 70,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            margin: '10px',
            borderRadius: '8px',
            width: open ? 300 : 70,
            transition: "width 0.3s ease-in-out",
            overflowX: "hidden",
          },
        }}
      >
        {/* Nút Toggle */}
        <IconButton
          onClick={() => setOpen(!open)}
          sx={{
            position: "absolute",
            top: 10,
            right: open ? 10 : 15,
            transition: "right 0.3s ease-in-out",
          }}
        >
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>

        {/* Nội dung thanh điều hướng */}
        <Box sx={{ p: 2 }}>{open ? 
          <Stack>
            <Stack direction="row" spacing={2}
                    onClick={() => navigate('/')}
                    sx={{cursor: 'pointer'}}>
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
            <List>
              <ListItemButton>
                <ListItemIcon><SearchIcon/></ListItemIcon>
                <ListItemText primary="Tìm kiếm"/>
              </ListItemButton>
              <ListItemButton onClick={() => navigate('/ai')}>
                <ListItemIcon><AssistantIcon/></ListItemIcon>
                <ListItemText primary="AI"/>
              </ListItemButton>
            </List>
          </Stack>
         : 
          <Stack>
            <img src='/images/logo.png' alt='logo'
                  onClick={() => navigate('/')}
                  style={{
                    marginTop: '40px',
                    cursor: 'pointer'
                  }}
            />
            <IconButton color="primary" sx={{marginTop: '15px'}}>
              <SearchIcon sx={{
                          width: '40px',
                          height: '40px',
                        }}/>
            </IconButton>
            <IconButton color="primary" onClick={() => navigate('/ai')}>
  <AssistantIcon sx={{ width: '40px', height: '40px' }} />
</IconButton>

          </Stack>
         }</Box>
      </Drawer>
    </Box>
  );
};

export default Nav;

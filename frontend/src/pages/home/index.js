import React from "react";
import { Paper, Stack } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import HomeComponent from "../../components/home";
import Profile from "../../components/profile";
import Header from "../../components/header";
import Nav from "../../components/nav";
import UpdateProfile from "../../components/profile/updateprofile";

const Home = () => {
    return(
        <Stack direction={"row"} spacing={2} sx={{margin: '10px'}}>
            <Nav />
            <Paper sx={{flexGrow: 1, paddingBottom: '10px'}}>
                <Stack spacing={2} >
                    <Header />
                    <Routes>
                        <Route path="/" element={<HomeComponent />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="update-profile" element={<UpdateProfile />} />
                    </Routes>
                </Stack>
            </Paper>
        </Stack>    
    )
};

export default Home;
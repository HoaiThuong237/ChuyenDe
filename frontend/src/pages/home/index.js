import React from "react";
import { Paper, Stack } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import HomeComponent from "../../components/home";
import Profile from "../../components/profile";
import Header from "../../components/header";
import Nav from "../../components/nav";
import UpdateProfile from "../../components/profile/updateprofile";
import Recipes from "../../components/recipes";
import AddRecipe from "../../components/recipes/addrecipe";

const Home = () => {
    return(
        <Stack direction={"row"} spacing={2} sx={{margin: '10px'}}>
            <Nav />
            <Paper sx={{flexGrow: 1, paddingBottom: '10px', height: '100vh', overflow: 'auto'}}>
                <Stack spacing={2} >
                    <Header />
                    <Routes>
                        <Route index element={<HomeComponent />} />
                        <Route path="trangcanhan" element={<Profile />} />
                        <Route path="capnhattrangcanhan" element={<UpdateProfile />} />
                        <Route path="congthuc" element={<Recipes />} />
                        <Route path="themcongthuc" element={<AddRecipe />} />
                    </Routes>
                </Stack>
            </Paper>
        </Stack>    
    )
};

export default Home;
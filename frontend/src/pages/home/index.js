import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Paper, Stack } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import HomeComponent from "../../components/home";
import Profile from "../../components/profile";
import Header from "../../components/header";
import Nav from "../../components/nav";
import UpdateProfile from "../../components/profile/updateprofile";
import Recipes from "../../components/recipes";
import AddRecipe from "../../components/recipes/addrecipe";
import UpdateRecipe from "../../components/recipes/updaterecipe";
import Search from "../../components/search";
import ManagementUsers from "../../components/management/users";
import ManagementRecipes from "../../components/management/recipes";
import ManagementIngredients from "../../components/management/ingredients";

const Home = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    
    return(
        <Stack direction={"row"} spacing={2} sx={{margin: '10px', height: '100vh', overflow: 'hidden'}}>
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
                        <Route path="capnhatcongthuc" element={<UpdateRecipe />} />
                        <Route path="timkiem" element={<Search />} />
                        <Route path="quanlynguoidung" element={<ManagementUsers />} />
                        <Route path="quanlycongthuc" element={<ManagementRecipes />} />
                        <Route path="quanlynguyenlieu" element={<ManagementIngredients />} />
                        <Route path="*" element={<div>404 - Không tìm thấy trang</div>} />
                    </Routes>
                </Stack>
            </Paper>
        </Stack>    
    )
};

export default Home;
import React from "react";
import { Paper, Stack } from "@mui/material";
import HomeComponent from "../../components/home";
import Header from "../../components/header";
import Nav from "../../components/nav";

const Home = () => {
    return(
        <Stack direction={"row"} spacing={2}>
            <Nav />
            <Stack spacing={2}>
                <Header />
                <HomeComponent />
            </Stack>
        </Stack>
    )
};

export default Home;
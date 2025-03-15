import React from "react";
import { Paper, Stack } from "@mui/material";
import HomeComponent from "../../components/home";
import Header from "../../components/header";
import Nav from "../../components/nav";

const Home = () => {
    return(
        <Stack direction={"row"} spacing={2} sx={{margin: '10px'}}>
            <Nav />
            <Paper sx={{flexGrow: 1}}>
                <Stack spacing={0} >
                    <Header />
                    <HomeComponent />
                </Stack>
            </Paper>
        </Stack>    
    )
};

export default Home;
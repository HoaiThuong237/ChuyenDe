import { Box, Paper, Stack } from "@mui/material";
import React from "react";

const HomeComponent = () => {
    return (
        <Paper sx={{
                    height: '100%',
                    top: '10px',
                    position: 'sticky'}}>
            <Box sx={{
                height: '1700px',
                overflowY: 'auto',
            }}>
                Home
            </Box>
        </Paper>
    )
};

export default HomeComponent;
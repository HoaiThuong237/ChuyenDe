import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, 
        Card, 
        CardContent, 
        CardMedia, 
        Grid2, 
        Paper, 
        Stack, 
        Typography,
        CardHeader,
        Avatar,
        CardActions,
        CardActionArea} from "@mui/material";
import Recipes from "../recipes";

const HomeComponent = () => {

    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://sql-monan.onrender.com/recipes")
        .then((response) => {
            setRecipes(response.data);
        })
        .catch((error) => {
            console.error("Lỗi khi lấy danh sách món ăn:",error);
        });
    }, []);
    const handleOpenRecipes = (recipe) => {
        navigate("congthuc", { state: recipe });   
        console.log(recipe);
    }


    return (
        <Grid2 container spacing={2} justifyContent="center">
            {recipes.map((recipe) => (
                <Grid2 item xs={12} sm={6} md={4} key={recipe.ID}>
                    <Card 
                        sx={{ width: 360, cursor: 'pointer', 
                                    display: "flex", 
                                    flexDirection: "column", 
                                    height: "100%" ,
                                }}>
                        <CardActionArea sx={{ height: "100%", 
                                            display: "flex", 
                                            flexDirection: "column" }}
                                            onClick={() => handleOpenRecipes(recipe)}>
                            <CardMedia 
                                component="img"
                                height={140}
                                image={`https://sql-monan.onrender.com/${recipe.Image_url}` || "/images/default.jpg"}  
                                alt={recipe.Title}
                                sx={{ objectFit: "cover" }}
                            />
                            <CardContent sx={{ flexGrow: 1 , minHeight: 100, width: "100%"}}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {recipe.Title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary"
                                        sx={{
                                            display: "-webkit-box",
                                            WebkitBoxOrient: "vertical",
                                            WebkitLineClamp: 1, // Chỉ hiển thị 1 dòng
                                            overflow: "hidden",
                                            textOverflow: "ellipsis"
                                        }}>
                                    {recipe.Description}
                                </Typography>
                            </CardContent>
                            <CardHeader
                                avatar={
                                    <Avatar src={recipe.Avatar_url} sx={{bgcolor: 'primary.main', color: 'white'}}/>
                                }
                                title={`${recipe.Author}`}
                                subheader={new Date(recipe.Created_at).toLocaleDateString("vi-VN")}                            />
                        </CardActionArea>
                    </Card>
                </Grid2>
            ))}
        </Grid2>
    )
};

export default HomeComponent;
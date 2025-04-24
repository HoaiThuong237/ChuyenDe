import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
        CardActionArea,
        IconButton} from "@mui/material";
import Recipes from "../recipes";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Search = () => {

    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get("q");

    useEffect(() => {
        axios.get(`http://localhost:5000/recipes/search?q=${searchTerm}`)
        .then((response) => {
            setRecipes(response.data);
        })
        .catch((error) => {
            console.error("Lỗi khi tìm kiếm:", error);
        })
    }, [searchTerm]);

    const handleOpenRecipes = (recipe) => {
        navigate("/bepnhaminh/congthuc", { state: recipe });   
        console.log(recipe);
    }

    const handleBack = () => {
        navigate("/bepnhaminh");
    }

    return (
        <Box sx={{ p : 2}}>
            <IconButton onClick={handleBack} 
                        sx={{width: '40px'}}>
                <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" gutterBottom>
                Kết quả tìm kiếm cho: "{searchTerm}"
            </Typography>
            <Grid2 container spacing={2} justifyContent="center">
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
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
                                        image={`http://localhost:5000/${recipe.Image_url}` || "/images/default.jpg"}  
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
                                            <Avatar src={`http://localhost:5000/${recipe.AuthorAvatar}`} sx={{bgcolor: 'primary.main', color: 'white'}}/>
                                        }
                                        title={`${recipe.Author}`}
                                        subheader={new Date(recipe.Created_at).toLocaleDateString("vi-VN")}                            />
                                </CardActionArea>
                            </Card>
                        </Grid2>
                    ))) : (
                    <Typography variant="body1">
                        Không tìm thấy kết quả phù hợp.
                    </Typography>  
                    ) 
                }
            </Grid2>
        </Box>
    )
};

export default Search;
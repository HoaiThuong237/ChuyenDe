import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Avatar, 
         Button, 
         Card, 
         CardActionArea, 
         CardActions, 
         CardContent, 
         CardHeader, 
         CardMedia, 
         Grid2, 
         IconButton, 
         Paper, 
         Stack, 
         Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Profile = () => {

    const user = JSON.parse(localStorage.getItem("user"));
    const [recipes, setRecipes] = useState([]);

    const navigate = useNavigate()

    const fetchUserRecipes = async () => {
        try {
            const res = await axios.get(`https://sql-monan.onrender.com/recipes/user/${user.ID}`);
            setRecipes(res.data);
            console.log(res.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách món ăn:", error);
        }
    }

    useEffect(() => {
        if(user?.ID) fetchUserRecipes();
    }, [user])

    const handleOpenUpdateProfile = () => {
        navigate("/bepnhaminh/capnhattrangcanhan");
    }

    const handleBack = () =>{
        navigate(-1)
    }
    const handleOpenRecipes = (recipe) => {
        navigate("/bepnhaminh/congthuc", { state: recipe });   
        console.log(recipe);
    }

    const handleEditRecipe = (recipe) => {
        navigate("/bepnhaminh/capnhatcongthuc", { state: recipe });   
        console.log(recipe);
    }

    const handleDeleteRecipe = async (ID) => {
        console.log("ID: ",ID);
        console.log(recipes.RecipeID);
        const confirmDelete = window.confirm("Bạn chắc chắn muốn xóa công thức này?");
        if (confirmDelete) {
            try {
                await axios.put(`https://sql-monan.onrender.com/recipes/delete/${ID}`);
                alert("Xóa công thức thành công!");
                // Cập nhật lại danh sách sau khi xóa
                setRecipes(prev => prev.filter(recipe => recipe.RecipeID !== ID));
                fetchUserRecipes();
            } catch (error) {
                console.error("Lỗi khi xóa công thức:", error);
            }
        }
    };

    return (
        <Stack>
            <IconButton onClick={handleBack}
                sx={{width: '40px'}}>
                <ArrowBackIcon />
            </IconButton>
            <Stack spacing={2} flexGrow={1}
                    sx={{width: '100%', paddingLeft: '25%', paddingRight: '25%'}}>
                <Stack direction={"row"} spacing={2}>
                <Avatar src={user.Avatar_url ? `http://localhost:5000/${user.Avatar_url}` : "/images/default-avatar.jpg"}                            
                        sx={{bgcolor: 'primary.main', 
                        color: 'white'}} />
                    <Stack>
                        <Typography variant="h4">{user.Name}</Typography>
                        <Typography variant="body2">@{user.Username}</Typography>
                    </Stack>
                </Stack>
                <Button variant="contained"
                        sx={{color: 'white'}}
                        onClick={handleOpenUpdateProfile}>
                    Chỉnh sửa thông tin cá nhân
                </Button>
                {recipes.length === 0 ? (
                    <Stack spacing={2} alignItems={"center"} paddingTop={8} paddingBottom={10}>
                        <img src="/images/emptybowl.jpg" alt="emptybowl"
                            height={200}
                        />
                        <Typography variant="h4">Bạn chưa có công thức nào.</Typography>
                        <Typography variant="body1">Hãy tạo một công thức nào!</Typography>
                    </Stack>
                ) : (
                    <Grid2 container spacing={2} justifyContent="center">
                        {recipes.map((recipe) => (
                            <Grid2 item xs={12} sm={6} md={4} key={recipe.ID}>
                            <Card
                                sx={{
                                width: 600,
                                cursor: "pointer",
                                display: "flex",
                                flexDirection: "row",
                                height: 100, // Chiều cao cố định để ảnh và card content đều nhau
                                }}
                            >
                                <CardActionArea
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    width: "100%",
                                    height: "100%",
                                }}
                                onClick={() => handleOpenRecipes(recipe)}
                                >
                                <CardMedia
                                    component="img"
                                    image={`https://sql-monan.onrender.com/${recipe.Image_url}` || "/images/default.jpg"}
                                    alt={recipe.Title}
                                    sx={{
                                    width: 250, // Cố định chiều rộng ảnh
                                    height: "100%",
                                    objectFit: "cover",
                                    flexShrink: 0,
                                    }}
                                />
                                <CardContent
                                    sx={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    padding: 2,
                                    minWidth: 0,
                                    }}
                                >
                                    <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="div"
                                    noWrap
                                    sx={{ fontWeight: "bold" }}
                                    >
                                    {recipe.Title}
                                    </Typography>
                                    <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: 2,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                    >
                                    {recipe.Description}
                                    </Typography>
                                </CardContent>
                                </CardActionArea>
                                <CardActions sx={{ justifyContent: "flex-end", 
                                                flexDirection: "column" }}>
                                    <IconButton color="secondary"
                                                onClick={() => handleEditRecipe(recipe)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error"
                                                onClick={() => handleDeleteRecipe(recipe.RecipeID)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                            </Grid2>
                        ))}
                    </Grid2>

                )
                }
            </Stack>
        </Stack>
    )
};

export default Profile;
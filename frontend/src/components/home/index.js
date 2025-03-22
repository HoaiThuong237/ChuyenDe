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
import React from "react";

const recipes = [
    {
        id: 1,
        title: "Chicken",
        description: "A delicious chicken dish with a crispy golden crust.",
        image: "/images/chicken.jpg",
        altText: "Chicken",
        avatarSrc: "/broken-image.jpg",
        author: "Chef John",
        date: "March 17, 2025"
    },
    {
        id: 2,
        title: "Beef Steak",
        description: "Juicy beef steak cooked to perfection with garlic butter.",
        image: "/images/beefsteak.jpg",
        altText: "Beef Steak",
        avatarSrc: "/broken-image.jpg",
        author: "Chef Alice",
        date: "March 16, 2025"
    },
    {
        id: 3,
        title: "Salmon Salad",
        description: "Healthy grilled salmon with fresh greens and lemon dressing. Delicious!",
        image: "/images/salmonsalad.jpg",
        altText: "Salmon Salad",
        avatarSrc: "/broken-image.jpg",
        author: "Chef Emma",
        date: "March 15, 2025"
    },
    {
        id: 4,
        title: "Cake",
        description: "Delecious chocolate cake with fresh berries.",
        image: "/images/cake.jpg",
        altText: "Cake",
        avatarSrc: "/broken-image.jpg",
        author: "Chef Emma",
        date: "March 14, 2025"
    },
    {
        id: 5,
        title: "Egg",
        description: "Delicious, fresh.",
        image: "/images/egg.jpg",
        altText: "Egg",
        avatarSrc: "/broken-image.jpg",
        author: "Chef Alice",
        date: "March 15, 2025"
    },


];

const HomeComponent = () => {
    return (
        <Grid2 container spacing={2} justifyContent="center">
            {recipes.map((recipe) => (
                <Grid2 item xs={12} sm={6} md={4} key={recipe.id}>
                    <Card 
                        sx={{ width: 360, cursor: 'pointer', 
                                    display: "flex", 
                                    flexDirection: "column", 
                                    height: "100%" ,
                                }}>
                        <CardActionArea sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                            <CardMedia 
                                component="img"
                                height={140}
                                image={recipe.image}
                                alt={recipe.altText}
                                sx={{ objectFit: "cover" }}
                            />
                            <CardContent sx={{ flexGrow: 1 , minHeight: 100, width: "100%"}}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {recipe.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary"
                                        sx={{
                                            display: "-webkit-box",
                                            WebkitBoxOrient: "vertical",
                                            WebkitLineClamp: 1, // Chỉ hiển thị 1 dòng
                                            overflow: "hidden",
                                            textOverflow: "ellipsis"
                                        }}>
                                    {recipe.description}
                                </Typography>
                            </CardContent>
                            <CardHeader
                                avatar={
                                    <Avatar src={recipe.avatarSrc} sx={{bgcolor: 'primary.main', color: 'white'}}/>
                                }
                                title={recipe.author}
                                subheader={recipe.date}
                            />
                        </CardActionArea>
                    </Card>
                </Grid2>
            ))}
        </Grid2>
    )
};

export default HomeComponent;
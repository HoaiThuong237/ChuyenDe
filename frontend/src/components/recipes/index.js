import React, {useEffect, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Stack,
         IconButton,
         Box,
         Typography,
         Avatar,
         TextField,
 } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';

const Recipes = () => {
    
    const navigate = useNavigate();
    const location = useLocation();

    const recipe = location.state;
    console.log('recipe', recipe);

    const [commentCount, setCommentCount] = useState(0);
    

    const handleBack = () =>{
        navigate(-1)
    }

    useEffect(() => {
        const fetchCommentCount = async () => {
            try {
                const res = await axios.get(`http://localhost:5000//recipes/${recipe.Recipe_id}/comments`);
                setCommentCount(res.data.Comment_Count);
            } catch (error) {
                console.error("Lỗi khi lấy số lượng bình luận:", error);
            }
        };
    
        if (recipe?.Recipe_id) {
            fetchCommentCount();
        }
    }, [recipe]);
    console.log('commentCount', commentCount);

    return (
        <Stack spacing={2}>
            <IconButton onClick={handleBack}
                         sx={{width: '40px'}}>
                <ArrowBackIcon />
            </IconButton>
            <Stack p={2} spacing={2}>
                <Stack direction={"row"} spacing={2}>
                    <Box >
                        <img src={recipe.Image_url} alt={recipe.Title} style={{width: '400px', height: '300px'}}/>
                    </Box>
                    <Stack spacing={2}>
                        <Typography variant="h3">{recipe.Title}</Typography>
                        <Stack direction={"row"} spacing={2}>
                            <Avatar src={recipe.Avatar_url} sx={{ bgcolor: 'primary.main', color: 'white' }} />
                            <Stack spacing={0}>
                                <Typography variant="body1">{recipe.Author}</Typography>
                                <Typography variant="body2">
                                {new Date(recipe.Created_at).toLocaleDateString("vi-VN")}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Typography variant="body1" sx={{paddingLeft: '40px'}}>
                            {recipe.Description}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                    <Stack spacing={2} width={'40%'}>
                        <Typography variant="h4">Nguyên liệu</Typography>
                        <Stack component="ul" sx={{ pl: 2 }}>
                            {recipe.Ingredients.map((ingredient, index) => (
                            <Typography component="li" variant="body1" key={index}>
                                {ingredient.Name} - {ingredient.Quantity}
                            </Typography>
                            ))}
                        </Stack>
                    </Stack>
                    <Stack spacing={2} width={'60%'}>
                        <Typography variant="h4">Hướng dẫn</Typography>
                        <Typography variant="body1">
                            {recipe.Instruction.split(/\r?\n/).map((line, index) => (
                                <span key={index}>
                                {line}
                                <br />
                                </span>
                            ))}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack spacing={2}  sx={{paddingTop: '40px'}}>
                    <Typography variant="h4">Bình luận ({commentCount})</Typography>
                    <Stack direction={"row"} spacing={2}>
                        <Avatar src={recipe.Avatar_url} sx={{ bgcolor: 'primary.main', color: 'white' }} />
                        <TextField variant="outlined" 
                                    placeholder="Nhập bình luận" 
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                        <IconButton color="primary">
                                            <SendIcon />
                                        </IconButton>
                                        ),
                                    }}
                        />
                    </Stack>
                    {commentCount === 0 && (
                            <Typography variant="body1" 
                                        sx={{paddingLeft: '350px'}}>
                                Hãy trở thành người đầu tiên bình luận về công thức này!
                            </Typography>
                        )}
                </Stack>
            </Stack>
        </Stack>
    )
};

export default Recipes;
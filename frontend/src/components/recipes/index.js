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
    const user = JSON.parse(localStorage.getItem('user'));

    const recipe = location.state;
    console.log('recipe', recipe);

    const [comments, setComments] = useState([]);
    const [commentCount, setCommentCount] = useState(0);
    const [commentText, setCommentText] = useState('');
    

    const handleBack = () =>{
        navigate(-1)
    }

    //comment
    const fetchComments = async () => {
        try {
            const res = await axios.get(`https://sql-monan.onrender.com/recipes/${recipe.RecipeID}/comments/list`);
            setComments(res.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách bình luận:", error);
        }
    };
    useEffect(() => {
        if (recipe?.RecipeID) {
            fetchComments();
        }
    }, [recipe]);

    //dem so luong binh luan
    const fetchCommentCount = async () => {
        try {
            const res = await axios.get(`https://sql-monan.onrender.com/recipes/${recipe.RecipeID}/comments`);
            setCommentCount(res.data.Comment_Count);
        } catch (error) {
            console.error("Lỗi khi lấy số lượng bình luận:", error);
        }
    };
    useEffect(() => {    
        if (recipe?.RecipeID) {
            fetchCommentCount();
        }
    }, [recipe]);
    console.log('commentCount', commentCount);
    console.log('recipe.Recipe_id', recipe.RecipeID);

    //them binh luan
    const handleAddComment = async () => {
        if (!commentText.trim()) return;

        try {
            await axios.post(`https://sql-monan.onrender.com/recipes/${recipe.RecipeID}/comments/add`, {
                userId: user.ID,
                commentText: commentText.trim(),
            });
            setCommentText('');
            fetchComments();
            fetchCommentCount();
        } catch (error) {
            console.error("Lỗi khi thêm bình luận:", error);
        }        
    }
    return (
        <Stack spacing={2}>
            <IconButton onClick={handleBack}
                         sx={{width: '40px'}}>
                <ArrowBackIcon />
            </IconButton>
            <Stack p={2} spacing={2}>
                <Stack direction={"row"} spacing={2}>
                    <Box >
                        <img src={`https://sql-monan.onrender.com/${recipe.Image_url}`} alt={recipe.Title} style={{width: '400px', height: '300px'}}/>
                    </Box>
                    <Stack spacing={2}>
                        <Typography variant="h3">{recipe.Title}</Typography>
                        <Stack direction={"row"} spacing={2}>
                            <Avatar src={`http://localhost:5000/${recipe.AuthorAvatar}`} sx={{ bgcolor: 'primary.main', color: 'white' }} />
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
                        <Avatar src={`http://localhost:5000/${user.Avatar_url}`} sx={{ bgcolor: 'primary.main', color: 'white' }} />
                        <TextField variant="outlined" 
                                    placeholder="Nhập bình luận" 
                                    fullWidth
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                                    InputProps={{
                                        endAdornment: (
                                        <IconButton color="primary" onClick={handleAddComment}>
                                            <SendIcon />
                                        </IconButton>
                                        ),
                                    }}
                        />
                    </Stack>
                    {commentCount === 0 ? 
                        (
                            <Typography variant="body1" 
                                        sx={{paddingLeft: '350px'}}>
                                Hãy trở thành người đầu tiên bình luận về công thức này!
                            </Typography>
                        )
                    :
                        (
                            <Stack component="ul" sx={{ pl: 2 }}>
                                {comments.map((comment, index) => (
                                    <Box component="li" sx={{ padding: '10px', listStyle: 'none' }} key={index}>
                                        <Stack direction={"row"} spacing={2}>
                                            <Avatar src={`http://localhost:5000/${comment.Avatar_url}`} sx={{ bgcolor: 'primary.main', color: 'white' }} />
                                            <Stack spacing={0}>
                                                <Stack direction={"row"} spacing={1}>
                                                    <Typography variant="body2">{comment.Author}</Typography>
                                                    <Typography variant="body2">
                                                    {new Date(comment.Created_at).toLocaleDateString("vi-VN")}
                                                    </Typography>
                                                </Stack>
                                                <Typography variant="body1">
                                                    {comment.Comment_text}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                ))}
                            </Stack>
                        )
                    }
                </Stack>
            </Stack>
        </Stack>
    )
};

export default Recipes;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const AddRecipe = () => {

    const user=JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    
    const [ingredients, setIngredients] = useState([{
        name: '',quantity: ''
    }]);
    const [steps, setSteps] = useState(['']);

    const handleAddIngredient = () => {
        setIngredients([...ingredients, {
            name: '',quantity: ''
        }])
    }
    const handleAddStep = () => {
        setSteps([...steps, ''])
    }

    const handleRemoveIngredient = (indexToRemove) => {
        const updatedIngredients = ingredients.filter((_, index) => index !== indexToRemove);
        setIngredients(updatedIngredients);
      };
    const handleRemoveStep = (indexToRemove) => {
        const updatedSteps = steps.filter((_, index) => index !== indexToRemove);
        setSteps(updatedSteps);
    }
    const handleChange = (index, field, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index][field] = value;
        setIngredients(updatedIngredients);        
    }
    const handleChangeStep = (index, value) => {
        const updatedSteps = [...steps];
        updatedSteps[index] = value;
        setSteps(updatedSteps);        
    }

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <Stack spacing={2}>
            <Stack direction={"row"} spacing={2}>
                <Stack spacing={0} flexGrow={1}>
                    <IconButton onClick={handleBack} 
                                sx={{width: '40px'}}>
                        <ArrowBackIcon />
                    </IconButton>
                </Stack>
                <Button variant="contained" 
                        color="error"
                        startIcon={<CloseIcon />}
                        sx={{color: 'white'}}>
                    Hủy
                </Button>
                <Button variant="contained" 
                        color="success"
                        startIcon={<SaveIcon />}
                        sx={{color: 'white'}}>
                    Lưu
                </Button>
            </Stack>
            <Stack p={2} spacing={2} >
                <Typography variant="h3">Thêm công thức</Typography>
                <Stack direction={"row"} spacing={2}>
                    <Box sx={{width: '400px', height: '300px', 
                            bgcolor: '#f4e4e4',
                            cursor: 'pointer',
                            display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Stack spacing={2} alignItems={'center'}>
                            <AddAPhotoIcon sx={{width: '100px', height: '100px'}} />
                            <Typography variant="body2">Chia sẻ với mọi người thành quả của bạn nào!</Typography>
                        </Stack>
                    </Box>
                    <Stack spacing={2}>
                        <TextField variant="filled"
                                    placeholder="Tên công thức"
                                    fullWidth
                                    sx={{width: '700px'}}
                                    />
                        <Stack direction={"row"} spacing={2}>
                            <Avatar src={user.Avatar_url} sx={{ bgcolor: 'primary.main', color: 'white' }} />
                            <Stack spacing={0}>
                                <Typography variant="body1">{user.Name}</Typography>
                            </Stack>
                        </Stack>
                        <TextField variant="filled"
                                    placeholder="Mô tả công thức"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    sx={{width: '700px'}}
                        />
                    </Stack>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                    <Stack spacing={2} width={'40%'}>
                        <Typography variant="h4">Nguyên liệu</Typography>
                        {ingredients.map((ingredient, index) => (
                            <Stack direction={"row"} spacing={2} key={index}>
                            <TextField variant="filled" 
                                        placeholder="Bột"
                                        value={ingredient.name}
                                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                            />
                            <TextField variant="filled" 
                                        placeholder="250g"
                                        value={ingredient.quantity}
                                        onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                            />
                            <IconButton color="error"
                                        onClick={() => handleRemoveIngredient(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </Stack>
                        ))}
                        <Button startIcon={<AddIcon />}
                                onClick={handleAddIngredient}>
                            Thêm nguyên liệu
                        </Button>
                    </Stack>
                    <Stack spacing={2} width={'60%'}>
                        <Typography variant="h4">Hướng dẫn</Typography>
                        {steps.map((step, index) => (
                            <Stack direction={"row"} spacing={2} key={index}>
                                <TextField variant="filled" 
                                            placeholder={`Bước ${index + 1}`}
                                            value={step}
                                            fullWidth
                                            onChange={(e) => handleChangeStep(index, e.target.value)}
                                />
                                <IconButton color="error"
                                            onClick={() => handleRemoveStep(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Stack>
                        ))}
                         <Button startIcon={<AddIcon />}
                                    onClick={handleAddStep}>
                            Thêm bước
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default AddRecipe;
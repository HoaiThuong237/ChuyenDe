import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";

import handleUploadImage from "../uploadimage";

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
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

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

    const handleSaveRecipe = async () => {
        try {
            const formData = new FormData();
    
            formData.append("Title", title);
            formData.append("Description", description);
            formData.append("Instruction", steps.join("\n"));
            formData.append("User_id", user.ID);
    
            if (photo) {
                formData.append("photo", photo);
            }
    
            const formattedIngredients = ingredients.map((ingredient) => {
                const match = ingredient.quantity.match(/^([\d.]+)\s*(\D+)$/);
                const quantity = match ? parseFloat(match[1]) : 0;
                const unit = match ? match[2] : '';
                return {
                    Name: ingredient.name,
                    Quantity: quantity,
                    Unit: unit
                };
            });
    
            formData.append("Ingredients", JSON.stringify(formattedIngredients));
    
            const res = await fetch("http://localhost:5000/recipes/add", {
                method: "POST",
                body: formData
            });
    
            const data = await res.json();
    
            if (res.ok) {
                console.log(data);
                alert("Thêm công thức thành công!");
                navigate("/congthuc");
            } else {
                throw new Error(data.error || "Đã xảy ra lỗi.");
            }
        } catch (error) {
            console.error("❌ Lỗi khi thêm công thức:", error);
            alert("Thêm thất bại!");
        }
    };
    

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
                        sx={{color: 'white'}}
                        onClick={handleSaveRecipe}>
                    Lưu
                </Button>
            </Stack>
            <Stack p={2} spacing={2} >
                <Typography variant="h3">Thêm công thức</Typography>
                <Stack direction={"row"} spacing={2}>
                    <Box sx={{width: '400px', height: '300px', 
                            bgcolor: '#f4e4e4',
                            cursor: 'pointer',
                            display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                            onClick={() => document.getElementById('photo').click()}>
                        {photoPreview ?
                            (
                                <img src={photoPreview} alt="preview" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                            ) :
                            (
                                <Stack spacing={2} alignItems={'center'}>
                                    <AddAPhotoIcon sx={{width: '100px', height: '100px'}} />
                                    <Typography variant="body2">Chia sẻ với mọi người thành quả của bạn nào!</Typography>
                                </Stack>
                            )
                        }
                        <input 
                            id="photo" 
                            type="file" 
                            accept="image/*" 
                            style={{display: 'none'}} 
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setPhoto(file);
                                    setPhotoPreview(URL.createObjectURL(file));
                                }
                            }}
                         />
                    </Box>
                    <Stack spacing={2}>
                        <TextField variant="filled"
                                    placeholder="Tên công thức"
                                    fullWidth
                                    sx={{width: '700px'}}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
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
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
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
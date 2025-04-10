import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Stack,
        Paper,
        Button,
        Typography,
        Box,
        Card,
        CardContent,
        CardMedia
    } from '@mui/material';
import Login from '../login';


function Introduce () {

    const [openLogin, setOpenLogin] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const navigate = useNavigate();

    const handleClicklogo = () => {
        setRefreshKey((prevKey) => prevKey + 1); // Thay đổi state để trigger re-render
    };

    const handleOpenLogin = () => {
        navigate('/dangnhap');
        setOpenLogin(true);
        console.log('open login');
    }

    return (
        <div className='introduce'>
            <Stack spacing={2} style={{backgroundColor: '#f4e4e4'}}>
                <header style={{backgroundColor: '#fff'}}>
                    <Stack direction="row" spacing={2} style={{height: '70px'}}>
                        <img src='/images/logo.png' alt='logo'
                            onClick={() => {handleClicklogo()}}
                             style={{width: '50px', 
                                     height: '50px', 
                                     margin: '10px 0 0 25px',
                                     cursor: 'pointer'}}/>
                        <Typography variant='h2' color='primary' style={{flexGrow: 1, 
                                                                        margin: '16px 0 0 5px', 
                        }}>Bếp Nhà Mình</Typography>
                        <Button variant="contained" 
                                style={{width: '178px', 
                                        height: '32px', 
                                        margin: '16px',
                                        color: '#fff'}}
                                onClick={() => {handleOpenLogin()}}>
                            Đăng Nhập
                        </Button>
                    </Stack>
                </header>
                <Paper style={{height: '1950px', margin: '15px'}}>
                    <Box style={{backgroundImage: `url('/images/bg-intro.jpg')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '747px', width: '97%',
                                margin: '20px 10px 20px 20px'
                                }}>
                        <Typography variant='h1' 
                                    color='primary' 
                                    style={{paddingTop: '300px',
                                            marginLeft: '150px',
                                            letterSpacing: '5px'}}>
                            Hôm nay ăn gì?
                        </Typography>
                        <Typography variant='h1' 
                                    color='primary'
                                    style={{paddingTop: '50px',
                                            marginLeft: '150px',
                                            letterSpacing: '5px'}}>
                            Hãy để chúng mình gợi ý!
                        </Typography>
                    </Box>
                    <Card variant='outlined' 
                          sx={{height: '360px',
                               margin: '20px 20px 20px 20px',
                               display: 'flex', flexDirection: 'row',}}>
                        <CardMedia 
                            sx={{width: '300px', height: '300px',
                                margin: '30px 20px 20px 20px'}}
                            image='/images/beefsteak.jpg'/>
                        <CardContent sx={{width: '1000px'}}>
                            <Typography variant='h1' 
                                        color='#000'>
                                Tìm và khám phá các món ngon
                            </Typography>
                            <Typography variant='body1' 
                                        color='#000'
                                        style={{margin: '20px 0 0 0'}}>
                                Bạn đã bao giờ bị cuốn hút bởi mùi thơm quyến rũ của một món ăn mới lạ 
                                hay cảm giác háo hức khi nếm thử một đặc sản vùng miền? 
                                Ẩm thực không chỉ là sự kết hợp của nguyên liệu và gia vị mà còn là nét tinh hoa văn hóa,
                                 là cách để mỗi người kết nối với thế giới qua vị giác. Hãy cùng khám phá những món ăn hấp dẫn, 
                                 tìm hiểu cách chế biến độc đáo và chia sẻ niềm đam mê ẩm thực qua từng trải nghiệm.
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card variant='outlined' 
                          sx={{height: '360px',
                               margin: '20px 20px 20px 20px',
                               display: 'flex', flexDirection: 'row',
                               justifyContent: 'flex-end',}}>
                        <CardContent sx={{width: '1000px'}}>
                            <Typography variant='h1' 
                                        color='#000'>
                                Vào bếp và nấu theo công thức
                            </Typography>
                            <Typography variant='body1' 
                                        color='#000'
                                        style={{margin: '20px 0 0 0'}}>
                                Không cần phải là đầu bếp chuyên nghiệp, bạn vẫn có thể tạo ra những món ăn hấp dẫn chỉ với 
                                một công thức phù hợp. Hãy để gian bếp trở thành nơi sáng tạo của riêng bạn, 
                                nơi mỗi nguyên liệu đều có thể biến thành một tác phẩm đầy hương vị. 
                                Chỉ cần một chút đam mê, bạn sẽ thấy nấu ăn thú vị hơn bao giờ hết!
                            </Typography>
                        </CardContent>
                        <CardMedia 
                            sx={{width: '300px', height: '300px',
                                margin: '30px 20px 20px 20px',}}
                            image='/images/egg.jpg'/>
                    </Card>
                    <Card variant='outlined' 
                          sx={{height: '360px',
                               margin: '20px 20px 20px 20px',
                               display: 'flex', flexDirection: 'row',}}>
                        <CardMedia 
                            sx={{width: '300px', height: '300px',
                                margin: '30px 20px 20px 20px'}}
                            image='/images/cake.jpg'/>
                        <CardContent sx={{width: '1000px'}}>
                            <Typography variant='h1' 
                                        color='#000'>
                                Chia sẻ công thức và kết quả của bạn
                            </Typography>
                            <Typography variant='body1' 
                                        color='#000'
                                        style={{margin: '20px 0 0 0'}}>
                                Bạn vừa hoàn thành một món ăn ngon và muốn chia sẻ niềm vui này? 
                                Đừng ngần ngại! Hãy đăng công thức chi tiết kèm theo hình ảnh hoặc cảm nhận của bạn về món ăn. 
                                Mỗi chia sẻ không chỉ giúp lan tỏa đam mê ẩm thực mà còn truyền cảm hứng cho những người yêu 
                                thích nấu ăn khác. Cùng nhau tạo nên một cộng đồng ẩm thực sôi động với thật nhiều món ngon!
                            </Typography>
                        </CardContent>
                    </Card>
                </Paper>
                <footer style={{backgroundColor: '#fff',
                                height: '100px'}}>

                </footer>
            </Stack>
        </div>
    );
}

export default Introduce;
import React from 'react';
import './index.css';
import {Stack,
        Paper,
        Button,
        Typography,
    } from '@mui/material';


function Introduce () {
    return (
        <div className='introduce'>
            <Stack spacing={2}>
                <header>
                    <Stack direction="row" spacing={2} style={{height: '70px'}}>
                        <img className='logo' src='/images/logo.png' alt='logo' />
                        <h3 className='title' style={{
                                                        flexGrow: 1,  
                        }}>Bếp Nhà Mình</h3>
                        <Button style={{width: '178px', 
                                        height: '32px', 
                                        borderRadius: '8rem',
                                        backgroundColor: '#ff9800',
                                        color: '#fff',
                                        fontWeight: 'bold'}}>
                            Đăng Nhập
                        </Button>
                    </Stack>
                </header>
                <div className='bg-img' style={{backgroundImage: `url('/images/bg-intro.jpg')`}}>
                    <Typography variant='h2'>Hôm nay ăn gì?</Typography>
                    <Typography variant='h2'>Hãy để chúng mình gợi ý!</Typography>
                </div>
            </Stack>
        </div>
    );
}

export default Introduce;
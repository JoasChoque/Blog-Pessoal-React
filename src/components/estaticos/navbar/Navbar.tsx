import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import {Link} from 'react-router-dom';

import './Navbar.css'

//variant = "h5" -> transforma o texto em um h5
function Navbar() {
    return (
        <>
            <AppBar position="static" className='bg-color'>
                <Toolbar variant="dense" className='container'>
                    <Box className='itens'>
                        <Typography variant="h5" color="inherit" className='cursor'>
                            BlogPessoal
                        </Typography>
                    </Box>

                    <Box display="flex" justifyContent="center">
                        <Box mx={1} className='itens'>
                            <Typography variant="h6" className='color-itens'>
                                Home
                            </Typography>
                        </Box>
                        <Box mx={1} className='itens'>
                            <Typography variant="h6" className='color-itens'>
                                Postagens
                            </Typography>
                        </Box>
                        <Box mx={1} className='itens'>
                            <Typography variant="h6" className='color-itens'>
                                Temas
                            </Typography>
                        </Box>
                        <Box mx={1} className='itens'>
                            <Typography variant="h6" className='color-itens'>
                                Cadastrar Tema
                            </Typography>
                        </Box>

                        <Link to='/login' className='text-decorator-none'>
                        <Box mx={1} className='itens' color='white'>
                            <Typography variant="h6" className='color-itens'>
                                Logout
                            </Typography>
                        </Box>
                        </Link>
                    </Box>

                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navbar;
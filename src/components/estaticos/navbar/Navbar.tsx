import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';

import './Navbar.css'
import useLocalStorage from 'react-use-localstorage';

//variant = "h5" -> transforma o texto em um h5
function Navbar() {
    const [token,setToken] = useLocalStorage('token')

    let navigate = useNavigate()

    function goLogout(){
        setToken('')
        alert('Deslogado com Sucesso')
        navigate('/login')
    }

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
                        <Link to='/home' className='text-decorator-none'>
                        <Box mx={1} className='itens'>
                            <Typography variant="h6" className='color-itens'>
                                Home
                            </Typography>
                        </Box>
                        </Link>

                        <Link to='/posts' className='text-decorator-none'>
                        <Box mx={1} className='itens'>
                            <Typography variant="h6" className='color-itens'>
                                Postagens
                            </Typography>
                        </Box>
                        </Link>

                        <Link to='/temas' className='text-decorator-none'>
                        <Box mx={1} className='itens'>
                            <Typography variant="h6" className='color-itens'>
                                Temas
                            </Typography>
                        </Box>
                        </Link>

                        <Link to='/formularioTema' className='text-decorator-none'>
                        <Box mx={1} className='itens'>
                            <Typography variant="h6" className='color-itens'>
                                Cadastrar Tema
                            </Typography>
                        </Box>
                        </Link>

                        
                        <Box mx={1} className='itens' color='white' onClick={goLogout}>
                            <Typography variant="h6" className='color-itens'>
                                Logout
                            </Typography>
                        </Box>
                        
                    </Box>

                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navbar;
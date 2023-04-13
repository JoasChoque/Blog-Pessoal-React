import React from 'react';

import './Login.css'
import { Grid, Typography,TextField, Button } from '@material-ui/core';
import { Box } from '@mui/material';
import {Link} from 'react-router-dom'

function Login() {
    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>

            <Grid xs={6} alignItems='center'>
                <Box paddingX={20}>
                    <form>
                        <Typography variant='h3' gutterBottom color='textPrimary' align='center' className='negrito'>Entrar</Typography>
                        <TextField id='usuario' label='Nome do Usuario' variant='outlined' name='usuario' margin='normal' fullWidth></TextField>
                        <TextField id='senha' label='Digite sua Senha' variant='outlined' name='senha' margin='normal' fullWidth type='password'></TextField>

                        <Box marginTop={2} textAlign='center'>
                            <Link to='/home' className='text-decoration-none'>
                                <Button type='submit' variant='contained' className='botao'>
                                    Logar
                                </Button>
                            </Link>
                        </Box>
                    </form>

                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant='subtitle1' gutterBottom align='center'>Não possui uma conta?</Typography>
                        </Box>

                        <Link to='/cadastro' style={{color: 'black'}}>
                        <Typography variant='subtitle1'gutterBottom align='center' className='negrito'>Cadastre-se</Typography>
                        </Link>
                    </Box>
                </Box>
            </Grid>

            <Grid xs={6} className='bg-image'>
                
            </Grid>
        </Grid>

    );
}

export default Login;
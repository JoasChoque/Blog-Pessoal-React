import React, { ChangeEvent, useState,useEffect } from 'react';

import './Login.css'
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage';
import { login } from '../../services/Service';
import UserLogin from '../../models/UserLogin';

function Login() {

    let history = useNavigate();
    const [token,setToken] = useLocalStorage('token');

    const [userLogin, setUserLogin] = useState<UserLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: ''
    });

    function updateModel(e:ChangeEvent<HTMLInputElement>){
        setUserLogin({
            ...userLogin,
            //e.target.name= pega o campo pelo nome dele(propriedade)
            //e.target.value = pega o valor digititado(valor)
            [e.target.name]: e.target.value
        })
    }

    useEffect(()=>{
        if(token != ''){
            history('/home')
        }
    },[token])

    async function onSubmit(e:ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        try{
           await login (`/usuarios/logar`,userLogin,setToken)
            
            alert('Usuário logado com sucesso')
        }catch(error){

            alert('Dados do usuário incorretos, erro ao logar');
        }
    }

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>

            <Grid xs={6} alignItems='center'>
                <Box paddingX={20}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' align='center' className='negrito'>Entrar</Typography>
                        <TextField value={userLogin.usuario} onChange={(e:ChangeEvent<HTMLInputElement>) => updateModel(e)} id='usuario' label='Nome do Usuario' variant='outlined' name='usuario' margin='normal' fullWidth></TextField>
                        <TextField value={userLogin.senha} onChange={(e:ChangeEvent<HTMLInputElement>) => updateModel(e)} id='senha' label='Digite sua Senha' variant='outlined' name='senha' margin='normal' fullWidth type='password'></TextField>

                        <Box marginTop={2} textAlign='center'>
                                <Button type='submit' variant='contained' className='botao'>
                                    Logar
                                </Button>
                        </Box>
                    </form>

                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant='subtitle1' gutterBottom align='center'>Não possui uma conta?</Typography>
                        </Box>

                        <Link to='/cadastro' style={{ color: 'black' }}>
                            <Typography variant='subtitle1' gutterBottom align='center' className='negrito'>Cadastre-se</Typography>
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
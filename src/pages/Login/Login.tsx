import React, { ChangeEvent, useState,useEffect } from 'react';

import './Login.css'
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage';
import { login } from '../../services/Service';
import UserLogin from '../../models/UserLogin';

function Login() {

    //redireciona o usuario para determinada pagina
    let history = useNavigate();

    //Hooks para manipular LocalStorage, atualizando o token -> são funções que ajudam a ver o ciclo de vida de um componente
    //token="" -> começa vazio e não pode ser alterada diretamente
    //setToken -> função que muda 
    const [token,setToken] = useLocalStorage('token');

    //useState serve para criar constante com os modelos de objeto
    // para ir renderizando o componente sempre que alterado

    //campos são inseridos para poder criar um objeto inicial e encima dele ir alterando os valores
    //e ir criando novos    
    const [userLogin, setUserLogin] = useState<UserLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: ''
    });

    //função que atualiza o valor da UserLogin através da setUserLogin
    //ChangeEvent -> acionado sempre que algo muda
    //<HTMLInputElement> -> Tipagem da mudança, origem da mudança, como é login, é um valor imput de texto
    function updateModel(e:ChangeEvent<HTMLInputElement>){
        setUserLogin({ //-> se usa o valor {} por ser criado um objeto
            //... -> spreadOperator, observa o objeto e 
            ...userLogin,
            //e.target.name= pega o campo pelo nome dele(propriedade)
            //e.target.value = pega o valor digititado(valor)
            [e.target.name]: e.target.value
        })
    }

    //hook useEffect permite executar funções sempre que alguma variavel sofrer alterações
    useEffect(()=>{
        if(token != ''){
            history('/home')
        }
    },[token]) //-> array de dependencia, quando esse valor mudar, o useEffect muda tbm


    //função para logar
    async function onSubmit(e:ChangeEvent<HTMLFormElement>) {
        //tirar o comportamento padrão de recarregamento de página no SPA ao enviar formulário
        e.preventDefault();

        try{
            //login(rota,dados,valor do token)
            //`/usuarios/logar` ->rota
            //userLogin -> Variavel contendo os dados
            //setToken -> definida na service, para pegar o valor do token
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
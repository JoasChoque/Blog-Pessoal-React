import React, { useEffect } from "react";

import './Home.css';
import { Button, Grid, Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import TabPostagem from "../../components/postagens/tabPostagem/TabPostagem";
import ModalPostagem from "../../components/postagens/modalPostagem/ModalPostagem";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import { useSelector } from "react-redux";
import { TokenState } from "../../store/tokens/TokensReducer";
import { toast } from "react-toastify";
//p={x} -> Padding em todos os lados
function Home() {
    let navigate = useNavigate()

    //useSelector -> acessa a store, pega o token e atribui na constante 'token'
    const token = useSelector<TokenState,TokenState['tokens']>(
        (state)=>state.tokens
    )

    useEffect(()=>{
        if(token ===''){
            toast.error('Você precisa estar logado!',{
                position: 'top-right', //posição da notificação
                autoClose: 3000, //fechamento automático, tmepo em ms
                hideProgressBar: false, //progressão do tempo da barra desaparecer
                closeOnClick:true, //fechar quando clicar
                pauseOnHover: false, //pausa o tempo da notificação com o mouse encima
                draggable: false, //move a posição da notificação
                theme: 'colored',
                progress: undefined
            })
            navigate('/login')
        }
    },[token])

    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center" className="bg-home">
                <Grid alignItems="center" item xs={6}>
                    <Box paddingX={20} >
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" className="title-text">Seja bem vindo(a)!</Typography>
                        <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className="title-text">Expresse aqui os seus pensamentos e opiniões!</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Box marginRight={1}>
                            <ModalPostagem/>
                        </Box>
                        
                        <Link to='/posts'>
                        <Button variant="outlined" className="botao">Ver Postagens</Button>
        	            </Link>
                    </Box>
                </Grid>
                <Grid item xs={6} >
                    <img src="https://i.imgur.com/H88yIo2.png" alt="" width="500px" height="500px" />
                </Grid>
                <Grid xs={12} className="postagens">
                    <TabPostagem/>
                </Grid>
            </Grid>
        </>
    );
}

export default Home
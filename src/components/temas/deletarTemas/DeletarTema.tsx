import React, { ChangeEvent, useEffect, useState } from 'react'
import { Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import {Box} from '@mui/material';
import './DeletarTema.css';
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import Tema from '../../../models/Tema';
import { buscaID, deleteId } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/TokensReducer';
import { toast } from 'react-toastify';


function DeletarTema() {
  let navigate = useNavigate();

    //useParams -> hook responsavel para o envio do parametro ao chamar os métodos (id)
    const{id} = useParams<{id:string}>();
    
    const token = useSelector<TokenState,TokenState['tokens']>(
      (state)=>state.tokens
  )

    const [tema,setTema] = useState<Tema>()

    //verificando se o usuario está logado
    useEffect(()=>{
        if(token==''){
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

    useEffect(()=>{
        if(id!==undefined){
            findById(id)
        }
    },[id])

    async function findById(id:string) {
        buscaID(`/temas/${id}`,setTema,{
            headers:{
                'Authorization':token
            }
        })
    }

    function sim(){
      navigate('/temas')
      deleteId(`/temas/${id}`,{
        headers: {
          'Authorization' : token
        }
      })
      toast.success('Tema deletado com Sucesso!',{
        position: 'top-right', //posição da notificação
        autoClose: 3000, //fechamento automático, tmepo em ms
        hideProgressBar: false, //progressão do tempo da barra desaparecer
        closeOnClick:true, //fechar quando clicar
        pauseOnHover: false, //pausa o tempo da notificação com o mouse encima
        draggable: false, //move a posição da notificação
        theme: 'colored',
        progress: undefined
    })
    }

    function nao(){
      navigate('/temas')
    }
  
          
  return (
    <>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar o Tema:
              </Typography>
              <Typography color="textSecondary">
                {tema?.descricao}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
              <Box mx={2}>
                <Button onClick={sim} variant="contained" className="marginLeft" size='large' color="primary">
                  Sim
                </Button>
              </Box>
              <Box mx={2}>
                <Button onClick={nao} variant="contained" size='large' color="secondary">
                  Não
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default DeletarTema;
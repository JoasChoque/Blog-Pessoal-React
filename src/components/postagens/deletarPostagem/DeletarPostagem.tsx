import React, { useEffect, useState } from 'react'
import {Typography, Button, Card, CardActions, CardContent } from "@material-ui/core"
import {Box} from '@mui/material';
import './DeletarPostagem.css';
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import { buscaID, deleteId } from '../../../services/Service';
import Postagem from '../../../models/Postagem';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/TokensReducer';

function DeletarPostagem() {
  let navigate = useNavigate();

  //useParams -> hook responsavel para o envio do parametro ao chamar os métodos (id)
  const{id} = useParams<{id:string}>();

  const token = useSelector<TokenState,TokenState['tokens']>(
    (state)=>state.tokens
)

  const [post,setPost] = useState<Postagem>()

  //verificando se o usuario está logado
  useEffect(()=>{
      if(token==''){
          alert('Você precisa estar logado para realizar esta ação')
          navigate('/login')
      }
  },[token])

  useEffect(()=>{
      if(id!==undefined){
          findById(id)
      }
  },[id])

  async function findById(id:string) {
      buscaID(`/postagens/${id}`,setPost,{
          headers:{
              'Authorization':token
          }
      })
  }

  function sim(){
    navigate('/posts')
    deleteId(`/postagens/${id}`,{
      headers: {
        'Authorization' : token
      }
    })
    alert("Postagem deletada com sucesso!")
  }

  function nao(){
    navigate('/posts')
  } 

  return (
    <>
      <Box m={2}>
        <Card variant="outlined" >
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar a Postagem:
              </Typography>
              <Typography color="textSecondary" >
              {post?.titulo}
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
              <Box>
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
export default DeletarPostagem;
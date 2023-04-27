import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button } from "@material-ui/core"
import './CadastroTema.css'
import { useNavigate, useParams } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage';
import Tema from '../../../models/Tema';
import { buscaID, post, put } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/TokensReducer';
import { toast } from 'react-toastify';


function CadastroTema() {
    let navigate = useNavigate();

    //useParams -> hook responsavel para o envio do parametro ao chamar os métodos (id)
    const{id} = useParams<{id:string}>();

    const token = useSelector<TokenState,TokenState['tokens']>(
        (state)=>state.tokens
    )

    const [tema,setTema] = useState<Tema>({
        id:0,
        descricao:''
    })

    //verificando se o usuario está logado
    useEffect(()=>{
        if(token==''){
            toast.error('Você precisa estar logado, por favor faça o Login!',{
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

    async function updatedTema(e:ChangeEvent<HTMLInputElement>) {
        
        setTema({
            ...tema,
            [e.target.name] : e.target.value
        })
    }

    //ao clicar em enviar, caso o id já exista, ele vai atualizar uma postagem com id existente
    //caso contrario, vai criar um novo tema com um novo id
    async function onSubmit(e:ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log('tema '+JSON.stringify(tema))
        
        if(id != undefined){
            console.log(tema)
            put(`/temas`,tema,setTema,{
                headers:{
                    'Authorization' : token
                }
            })
            toast.success('Tema atualizado com sucesso!',{
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
        else{
            post(`/temas`,tema,setTema,{
                headers:{
                    'Authorization':token
                }
            })
            toast.success('Tema cadastrado com sucesso!',{
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
        back()
    }

    function back(){
        navigate('/temas')
    }
  
    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro tema</Typography>
                <TextField value={tema.descricao} onChange={(e:ChangeEvent<HTMLInputElement>)=> updatedTema(e)} id="descricao" label="descricao" variant="outlined" name="descricao" margin="normal" fullWidth />
                <Button type="submit" variant="contained" color="primary">
                    Finalizar
                </Button>
            </form>
        </Container>
    )
}

export default CadastroTema;
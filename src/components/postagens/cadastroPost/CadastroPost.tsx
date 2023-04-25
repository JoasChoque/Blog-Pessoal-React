import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button, Select, InputLabel, MenuItem, FormControl, FormHelperText } from "@material-ui/core"
import './CadastroPost.css';
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import Tema from '../../../models/Tema';
import Postagem from '../../../models/Postagem';
import { busca, buscaID, post, put } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/TokensReducer';

function CadastroPost() {
    let navigate = useNavigate()

    const { id } = useParams<{ id: string }>();

    const token = useSelector<TokenState,TokenState['tokens']>(
        (state)=>state.tokens
    )

    //usados para pegar os temas já cadastrados no BD
    const [temas, setTemas] = useState<Tema[]>([])

    useEffect(() => {
        if (token === '') {
            alert("Você precisa estar logado para acessar essa função!")
            navigate('/login')
        }
    }, [token])

    //armazena 1 tema especifico pelo id
    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    })

    //efetua o cadastro definitivo das postagens
    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        texto: '',
        data: '',
        tema: null
    })

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema
        })
    }, [tema])

    //traz todos os temas e tbm faz a busca por id
    useEffect(() => {
        getTemas()
        if (id !== undefined) {
            findByIdPostagem(id)
        }
    }, [id])

    //cria o objeto,ou modificação a partir do select de temas
    async function getTemas() {
        await busca(`/temas`, setTemas, {
            headers: {
                'Authorization': token
            }
        })
    }

    //faz busca pelo id e colocar o id na barra especifica
    async function findByIdPostagem(id: string) {
        await buscaID(`/postagens/${id}`, setPostagem, {
            headers: {
                'Authorization': token
            }
        })
    }

    //cria o objeto,ou modificação a partir dos inputs
    function updatedPostagem(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema
        })
    }

    //envio das informações ao apertar o botão de submit
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            try {
                await put(`/postagens`, postagem, setPostagem, {
                    headers: {
                        'Authorization': token
                    }

                })
                alert('Postagem atualizada com sucesso')
            } catch (error) {
                alert('Erro ao atualizar sua postagem, verifique os campos!')
            }
        } else {
            try {
                await post(`/postagens`, postagem, setPostagem, {
                    headers: {
                        'Authorization': token
                    }
                })
                alert('Postagem cadastrada com sucesso')
            }
            catch (error) {
                alert('Erro ao cadastrar sua postagem, tente novamente!')
            }

        }
        back()
    }

    //redirecionamento para a pagina de postagens
    function back() {
        navigate('/posts')
    }

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro postagem</Typography>
                <TextField value={postagem.titulo} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="titulo" label="titulo" variant="outlined" name="titulo" margin="normal" fullWidth />
                <TextField value={postagem.texto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="texto" label="texto" name="texto" variant="outlined" margin="normal" fullWidth />

                <FormControl >
                    <InputLabel id="demo-simple-select-helper-label">Tema </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => buscaID(`/temas/${e.target.value}`, setTema, {
                            headers: {
                                'Authorization': token
                            }
                        })}>
                        {
                            temas.map(tema => (
                                <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText>Escolha um tema para a postagem</FormHelperText>
                    <Button type="submit" variant="contained" color="primary">
                        Finalizar
                    </Button>
                </FormControl>
            </form>
        </Container>
    )
}
export default CadastroPost;
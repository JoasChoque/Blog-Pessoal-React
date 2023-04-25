import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { Card, CardActions, CardContent, Button, Typography } from "@material-ui/core";

import './ListaTemas.css'
import Tema from "../../../models/Tema";
import useLocalStorage from "react-use-localstorage";
import { busca } from "../../../services/Service";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/TokensReducer";

function ListaTemas() {

    //Array por conta de ser uma lista e é uma relação
    //o valor na variavel fica: temas = [{id:0},{id:1}...]
    const [temas, setTemas] = useState<Tema[]>([])

    const token = useSelector<TokenState,TokenState['tokens']>(
        (state)=>state.tokens
    )

    let navigate = useNavigate();

    //Redirecionando o usuário para o login caso ele não esteja logado
    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado para ter acesso! Por favor, faça ologin')
            navigate('/login')
        }
    }, [token])

    //function de getTemas
    async function getTema() {
        await busca(`/temas`, setTemas, {
            headers: {
                'Authorization': token
            }
        })
    }

    //
    useEffect(() => {
        getTema()
    }, [temas.length])


    return (
        <>
            {
                //chamar a função para poder mapear os elementos e modificar de acordo com os valores em banco
                //{tema.descricao} => Troca o valor padrão de descrição para o valor em texto armazenado
                temas.map(tema => (
                    <Box m={2}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Tema
                                </Typography>

                                <Typography variant="h5" component='h2'>
                                    {tema.descricao}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Box display='flex' justifyContent='center' mb={1.5}>

                                    <Link to={`/formularioTema/${tema.id}`} className="text-decorator none">
                                        <Box mx={1}>
                                            <Button variant="contained" className="marginLeft" size="small" color="primary">
                                                Atualizar
                                            </Button>
                                        </Box>
                                    </Link>

                                    <Link to={`/deletarTema/${tema.id}`} className="text-decorator none">
                                        <Box mx={1}>
                                            <Button variant="contained" size="small" color="secondary">
                                                Deletar
                                            </Button>
                                        </Box>
                                    </Link>
                                </Box>
                            </CardActions>
                        </Card>
                    </Box>
                ))}
        </>
    );

}

export default ListaTemas;
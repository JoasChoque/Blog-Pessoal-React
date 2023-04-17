import axios from "axios";

//Criando conexao utilizando axios.create
//baseUrl -> link da API em deploy
export const api = axios.create({
    baseURL: 'https://blogpessoal-8wve.onrender.com'
})

//async: funções assincronas, esperando uma resposta para poder continuar executando sua função
//url: caminho
//dados: objeto com as informações que precisamos para acessar o serviço (ex:Login -> usuario e senha)
//set dados: função declarada posteriormente para obter os valores dos dados
export const cadastroUsuario =async (url:any,dados:any,setDado:any) => {
    const resposta = await api.post(url,dados)
    setDado(resposta.data)
    
}

export const login = async(url:any,dados:any,setDado:any)=>{
    const resposta = await api.post(url,dados)
    setDado(resposta.data.token)
}


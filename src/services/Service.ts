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

//header neste caso, é o valor do token gerado após logar
//para mostrar as postagens o usuário precisa estar logado, logo precisa de um token
export const busca = async(url:any,setDado:any,header:any)=>{

    //esperando resposta via get com um caminho e um token
    const resposta = await api.get(url,header)

    //uma ver armazenados os dados, da ao setDados os valores dos campos da model
    setDado(resposta.data)
}

export const buscaID =async (url:any,setDado:any, header:any) => {
    const resposta = await api.get(url,header)
    setDado(resposta.data)
}

//comunicação posta utilizando 4 parametros
//url -> caminho
//dados -> dados passados
//setDados -> function para alterar os valores dos dados
//header -> token para poder autorizar o processo.
export const post =async (url:any,dados:any,setDado:any, header:any) => {
    const resposta = await api.post(url,dados,header)
    setDado(resposta.data)
}

//Mesma lógica do post, porem com o verbo put
export const put =async (url:any,dados:any,setDado:any, header:any) => {
    const resposta = await api.put(url,dados,header)
    setDado(resposta.data)
}

export const deleteId =async (url:any,header:any) => {
    await api.delete(url,header)
}

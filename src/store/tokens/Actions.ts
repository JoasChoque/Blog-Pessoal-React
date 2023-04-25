//Tipo Action
export type Action = {type: "ADD_TOKEN"; payload:string};

//model para adicionar token
export const addToken = (token:string):Action=>({
    type:"ADD_TOKEN",
    payload: token,
});
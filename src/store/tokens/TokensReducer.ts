import { Action } from "./Actions";

export interface TokenState{
    tokens: string
}

const initialState={
    tokens: ''
}

export const tokenReducer = (state:TokenState = initialState,action:Action) =>{
    //caso o type do actions.ts seja add_token, o valor carregado
    //vai ser o proprio token
    switch(action.type){
        case "ADD_TOKEN":{
            return{tokens:action.payload}
        }

        default:{
            return state;
        }
    }
}
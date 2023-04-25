import { createStore } from "redux";
import { tokenReducer } from "./tokens/TokensReducer";

//gerencia o estado da aplicação
//recebe as ações e armazenda dentro da store
const store = createStore(tokenReducer)

export default store;
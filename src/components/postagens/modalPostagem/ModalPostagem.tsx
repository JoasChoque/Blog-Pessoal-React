import { Theme, makeStyles,createStyles } from "@material-ui/core/styles";
import { Box, Modal } from "@mui/material";
import {Button } from "@material-ui/core"
import CloseIcon from '@material-ui/icons/Close';
import React from "react";
import CadastroPost from "../cadastroPost/CadastroPost";
import './ModalPostagem.css'

//responsavel por centralizar o modal
function getModalStyle(){
    const top=50;
    const left=50;

    return{
        top:`${top}%`,
        left:`${left}%`,
        transform: `translate(-${top}%,-${left}%)`,
    };
}

//Define algumas configurações do css
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

function ModalPostagem(){

    //variavel com as configurações do modal
    const classes = useStyles();

    //state que guarda as informações para centralizar o modal
    //como não queremos mudar o valor de estado, não foi preciso criar um setModalStyle
    //React.useState -> outra forma de chamar o hook sem importar
    const[modalStyle]=React.useState(getModalStyle)
    const[open,setOpen] = React.useState(false);

    //se aberto, alterna pra true pra manter o modal aberto
    const handleOpen = () =>{
        setOpen(true)
    }

    //se fechado, alterna pra false pra fechar o modal
    const handleClose= ()=>{
        setOpen(false)
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <Box display='flex' justifyContent='flex-end' className="cursor">
                <CloseIcon onClick={handleClose}/>                
            </Box>

            <CadastroPost/>
        </div>
    )
   
    return(
        <div>
            <Button variant="outlined" className="btnModal" onClick={handleOpen}>
                Nova Postagem
            </Button>
            <Modal open={open} onClose={handleClose} aria-labelledby='simple-modal-title' aria-describedby='simple-modal-description'>
                {body}
            </Modal>
        </div>
    )
}

export default ModalPostagem;
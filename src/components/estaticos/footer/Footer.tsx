import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import './Footer.css';

function Footer() {
    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid alignItems="center" item xs={12}>
                    <Box className='box1'>
                        <Box paddingTop={3} display="flex" alignItems="center" justifyContent="center">
                            <Typography variant="h5" align="center" gutterBottom className='texto'>Contate-me pelas redes sociais!</Typography>
                        </Box>
                        <Box className='rodape' >
                            <a href="https://github.com/JoasChoque" target="_blank">
                                <GitHubIcon className='icons'  />
                            </a>
                            <a href="https://mail.google.com" target="_blank">
                                <EmailIcon className='icons' />
                            </a>
                            <a href="https://www.linkedin.com/school/generationbrasil/" target="_blank">
                                <LinkedInIcon className='icons' />
                            </a>
                        </Box>
                    </Box>
                    <Box className='box2'>
                        <Box paddingTop={1}>
                            <Typography variant="subtitle2" align="center" gutterBottom className='texto' >© 2023 Copyright:</Typography>
                        </Box>
                        <Box>
                            <a target="_blank" href="https://github.com/JoasChoque">
                                <Typography variant="subtitle2" gutterBottom className='texto' align="center">Joas Choque</Typography>
                            </a>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default Footer;
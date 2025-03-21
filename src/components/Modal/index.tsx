import React from 'react';
import { Box, Dialog } from '@mui/material';
import styles from './styles.module.css';

interface Props {
    isOpen: boolean;
}

const ModalLoading: React.FC<Props> = ({ isOpen }) => {
    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={() => {}}
                sx={{
                    width: '100%',
                    '& .MuiPaper-root': {
                        width: { xs: '70%', sm: '25vw' }
                    }
                }}
            >
                <Box
                    sx={{
                        width: { xs: '100%', sm: '25vw' },
                        padding: 8,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <span className={styles.loader}></span>
                </Box>
            </Dialog>
        </div>
    );
};

export default ModalLoading;

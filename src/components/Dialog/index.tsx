import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    isOpen: boolean;
    handleClose: () => void;
    title: string;
    children: JSX.Element;
    height?: number;
    width?: string;
    closeBack?: boolean;
    id: string;
    styles?: string;
}

const DialogModal: React.FC<Props> = ({
    isOpen,
    handleClose,
    title,
    children,
    height = 80,
    width = '50%',
    closeBack = true,
    id,
    styles
}) => {
    return (
        <Dialog
            id={id}
            onClose={() => {
                if (closeBack) {
                    handleClose();
                }
            }}
            open={isOpen}
            sx={{
                '& .MuiPaper-root': {
                    width: { xs: '90%', sm: width },
                    maxWidth: { xs: '90%', sm: width },
                    height: `${height}%`,
                    maxHeight: `${height}%`,
                    overflowY: 'auto',
                    borderRadius: 5
                }
            }}
        >
            <DialogTitle sx={{ padding: 4, pb: 2, textAlign: 'center', mt: { xs: '30px !important', sm: '0px !important' } }}>
                <Typography
                    variant="h5"
                    component="span"
                    textAlign="center"
                    fontWeight="bold"
                    color="text.primary"
                    className={styles}
                >
                    {title}
                </Typography>
                {closeBack && (
                    <Button variant="outlined" onClick={handleClose} sx={{ position: 'absolute', right: 15, top: 15 }}>
                        <CloseIcon />
                    </Button>
                )}
            </DialogTitle>
            <DialogContent sx={{ pl: 2, pr: 2, pt: '10px !important' }}>{children}</DialogContent>
        </Dialog>
    );
};

export default DialogModal;

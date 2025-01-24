import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import { Snackbar, AlertProps } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import { PluviometroContext } from 'src/context/lluvias/PluviometroContext';

const AlertModal = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={1} ref={ref} variant="filled" {...props} />;
});

interface Props {
    message?: string;
}

export const Alert: React.FC<Props> = ({ message }) => {
    const { showMessage, infoMessage, messageType, setShowMessage } = useContext(CultivosContext);
    const [showError, setShowError] = useState<boolean>(true);
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        message ? setShowError(false) : setShowMessage(false);
    };

    return ReactDOM.createPortal(
        <Snackbar
            open={message ? showError : showMessage}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
        >
            <AlertModal onClose={handleClose} severity={message ? 'error' : messageType} sx={{ width: '100%' }}>
                {message ?? infoMessage}
            </AlertModal>
        </Snackbar>,
        document.body
    );
};

export default Alert;

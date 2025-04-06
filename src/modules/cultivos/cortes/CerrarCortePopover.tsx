import React from 'react';
import { Button, Grid2, Typography } from '@mui/material';
import DialogModal from '@components/Dialog';
import Loading from '@components/Loading';
import { useCorte } from './hooks/useCorte';

interface Props {
    open: boolean;
    handleClose: () => void;
    corteId: number;
}

const CerrarCortePopover: React.FC<Props> = ({ open, handleClose, corteId }) => {
    const { submitting, submitForm } = useCorte();

    return (
        <DialogModal isOpen={open} handleClose={handleClose} title="Terminar corte" height={45} id="modal-terminar-corte">
            <Grid2 container>
                <Grid2 size={12} m={1} mb={3}>
                    <Typography>Desea terminar el corte? Si termina, no podrá registrar más datos en este corte.</Typography>
                </Grid2>
                <Grid2 size={6} display={'flex'} justifyContent={'center'}>
                    <Button variant="contained" color="error" onClick={() => submitForm(corteId, handleClose)}>
                        {submitting ? <Loading /> : 'Terminar'}
                    </Button>
                </Grid2>
                <Grid2 size={6} display={'flex'} justifyContent={'center'}>
                    <Button variant="contained" color="primary" onClick={handleClose}>
                        Cancelar
                    </Button>
                </Grid2>
            </Grid2>
        </DialogModal>
    );
};

export default CerrarCortePopover;

import React, { useState } from 'react';
import { Button, Grid2, Menu, MenuItem } from '@mui/material';
import { Suerte } from '@interfaces/cultivos/suerte';

interface Props {
    suerte: Suerte;
    handleSubmit: (corteId: number) => Promise<void>;
}

const SuerteRenovada: React.FC<Props> = ({ suerte, handleSubmit }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
	const cortes = Object.freeze(suerte.listcortes || [])

    return (
        <Grid2 size={{ xs: 12, sm: 2.4 }} key={suerte.id_suerte} display={'flex'} justifyContent={'center'}>
            <Button variant="contained" onClick={handleClick} sx={{ width: '85%' }}>
                {suerte.nombre}
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                {cortes?.length === 0
                    ? null
                    : [...cortes]?.sort((a, b) => a.numero - b.numero)?.map((corte) => (
                          <MenuItem
                              key={corte.id_corte}
                              onClick={() => {
                                  handleSubmit(corte.id_corte);
                                  setAnchorEl(null);
                              }}
                          >
                              {`Corte ${corte.numero}`}
                          </MenuItem>
                      ))}
            </Menu>
        </Grid2>
    );
};

export default SuerteRenovada;

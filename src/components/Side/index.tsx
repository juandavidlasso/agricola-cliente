import React from 'react';
import { Box, Drawer } from '@mui/material';

interface Props {
    isOpen: boolean;
    handleClose: () => void;
    direction: 'top' | 'bottom' | 'left' | 'right';
    children: JSX.Element;
    width?: number;
}

const SideModal: React.FC<Props> = ({ isOpen, handleClose, direction, children, width = 450 }) => {
    return (
        <div>
            <Drawer anchor={direction} open={isOpen} onClose={handleClose}>
                <Box
                    sx={{
                        width: direction === 'top' || direction === 'bottom' ? 'auto' : width,
                        height: direction === 'bottom' ? '75vh' : '100vh'
                    }}
                    role="presentation"
                >
                    {children}
                </Box>
            </Drawer>
        </div>
    );
};

export default SideModal;

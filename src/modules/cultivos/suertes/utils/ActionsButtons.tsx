import React, { Fragment } from 'react';
import { Typography } from '@mui/material';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';

interface Props {
    items: any[];
}

const ActionsButtons: React.FC<Props> = ({ items }) => {
    const { estado } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);

    return (
        <>
            {items.map((item, index) => {
                const lastItem = index + 1;
                if (rol === 1 && (item.id === 1 || item.id === 2)) {
                    return (
                        <Fragment key={item.id}>
                            <Typography
                                key={item.id}
                                onClick={item.action}
                                className="!text-red-600 hover:!text-blue-600 hover:!cursor-pointer"
                            >
                                {item.name}
                            </Typography>
                            {items.length === lastItem ? null : <span className="mr-2 ml-2">/</span>}
                        </Fragment>
                    );
                } else {
                    if (item.id === 3) {
                        return (
                            <Fragment key={item.id}>
                                <Typography
                                    key={item.id}
                                    onClick={item.action}
                                    className="!text-red-600 hover:!text-blue-600 hover:!cursor-pointer"
                                >
                                    {item.name}
                                </Typography>
                                {items.length === lastItem ? null : <span className="mr-2 ml-2">/</span>}
                            </Fragment>
                        );
                    }
                }
            })}
        </>
    );
};

export default ActionsButtons;

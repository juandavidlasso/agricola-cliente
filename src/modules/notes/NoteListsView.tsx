import React, { useContext, useState } from 'react';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import {
    Box,
    Button,
    Grid2,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { ThemeProps } from '@interfaces/theme';
import Layout from '@modules/layouts/Layout';
import { routesCultivos } from '@utils/routesCultivos';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import DialogModal from '@components/Dialog';
import NoteRegister from './NoteRegister';
import { INote, NoteDeleteResponse, NotesResponse } from '@interfaces/notes';
import { OBTENER_NOTAS } from '@graphql/queries';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import { ELIMINAR_NOTA } from '@graphql/mutations';
import { CultivosContext } from '@context/cultivos/CultivosContext';

interface Props {
    toogleTheme: (theme: ThemeProps) => void;
}

const NoteListsView: React.FC<Props> = ({ toogleTheme }) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [noteEdit, setNoteEdit] = useState<INote>();
    const [formType, setFormType] = useState<'register' | 'update'>('register');
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { setInfoMessage, setMessageType, setShowMessage } = useContext(CultivosContext);
    const { data, error, loading } = useQuery<NotesResponse>(OBTENER_NOTAS);
    const [eliminarNota] = useMutation<NoteDeleteResponse>(ELIMINAR_NOTA);

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;
    const handleClick = () => {
        setFormType('register');
        setNoteEdit(undefined);
        setOpenModal(!openModal);
    };
    const submitDelete = async (id: number) => {
        try {
            const { data } = await eliminarNota({
                variables: {
                    idNote: id
                },
                refetchQueries: [{ query: OBTENER_NOTAS }]
            });
            if (data?.eliminarNota) {
                setMessageType('success');
                setInfoMessage('La nota se elimino exitosamente.');
                setShowMessage(true);
            }
        } catch (error) {
            if (error instanceof ApolloError) {
                setMessageType('error');
                setInfoMessage(error.message.replace('Error:', ''));
                setShowMessage(true);
                return;
            }
            setMessageType('error');
            setInfoMessage(error as string);
            setShowMessage(true);
            return;
        }
    };
    return (
        <>
            {openModal && (
                <DialogModal isOpen={true} handleClose={handleClick} title="Registrar nota" height={60} id="modal-form">
                    <NoteRegister noteEdit={noteEdit} formType={formType} handleClose={handleClick} />
                </DialogModal>
            )}
            <Layout toogleTheme={toogleTheme} navItems={routesCultivos}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Grid2 container spacing={1} size={12} className="flex flex-col !gap-8">
                        <Grid2 size={12} className="flex items-center justify-center relative">
                            <Typography component={'h2'} className="!text-5xl text-center">
                                Listado de notas
                            </Typography>

                            <Button variant="contained" className="!absolute right-2" onClick={handleClick}>
                                Registrar nota
                            </Button>
                        </Grid2>

                        <Grid2 size={12}>
                            {data?.obtenerNotas?.length === 0 ? (
                                <Typography component={'h5'} variant="h5">
                                    No hay notas registradas
                                </Typography>
                            ) : (
                                <TableContainer component={Paper}>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">Fecha</TableCell>
                                                <TableCell align="left">Descripción</TableCell>
                                                <TableCell align="left">Costo</TableCell>
                                                {rol === 1 && <TableCell align="center">Acciones</TableCell>}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data?.obtenerNotas?.map((note) => (
                                                <TableRow key={note?.id_note}>
                                                    <TableCell component="th" scope="row" align="left">
                                                        {note?.date}
                                                    </TableCell>
                                                    <TableCell align="left">{note?.description}</TableCell>
                                                    <TableCell align="left">
                                                        {note?.cost
                                                            ? new Intl.NumberFormat('es-CO').format(Number(note.cost))
                                                            : ''}
                                                    </TableCell>
                                                    {rol === 1 && (
                                                        <TableCell align="left">
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    height: '100%',
                                                                    alignItems: 'center',
                                                                    width: '100%',
                                                                    justifyContent: 'center',
                                                                    gap: 0.5
                                                                }}
                                                            >
                                                                <Button
                                                                    variant="outlined"
                                                                    color="warning"
                                                                    className="!text-[10px] !py-1 !px-3 !min-w-fit"
                                                                    onClick={() => {
                                                                        setFormType('update');
                                                                        setNoteEdit(note);
                                                                        setOpenModal(true);
                                                                    }}
                                                                >
                                                                    Editar
                                                                </Button>
                                                                <Button
                                                                    variant="outlined"
                                                                    color="error"
                                                                    className="!text-[10px] !py-1 !px-3 !min-w-fit"
                                                                    onClick={() => submitDelete(note?.id_note)}
                                                                >
                                                                    Eliminar
                                                                </Button>
                                                            </Box>
                                                        </TableCell>
                                                    )}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </Grid2>
                    </Grid2>
                </Box>
            </Layout>
        </>
    );
};

export default NoteListsView;

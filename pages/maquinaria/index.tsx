import dynamic from 'next/dynamic';
import ModalLoading from '@components/Modal';
import { ThemeProps } from '@interfaces/theme';

const ListMaquinariaView = dynamic(() => import('../../src/modules/maquinaria/ListMaquinaria'), {
    loading: () => <ModalLoading isOpen={true} />
});

const MaquinariaPage = (props: { toogleTheme: (theme: ThemeProps) => void }) => (
    <ListMaquinariaView toogleTheme={props.toogleTheme} />
);

export default MaquinariaPage;

import dynamic from 'next/dynamic';
import ModalLoading from '@components/Modal';
import { ThemeProps } from '@interfaces/theme';

const ListSuertesView = dynamic(() => import('../../src/modules/cultivos/suertes/ListSuerte'), {
    loading: () => <ModalLoading isOpen={true} />
});

const ListSuertesPage = (props: { toogleTheme: (theme: ThemeProps) => void }) => (
    <ListSuertesView toogleTheme={props.toogleTheme} />
);

export default ListSuertesPage;

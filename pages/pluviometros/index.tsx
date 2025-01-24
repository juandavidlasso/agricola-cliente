import dynamic from 'next/dynamic';
import ModalLoading from '@components/Modal';
import { ThemeProps } from '@interfaces/theme';

const PluviometrosViewPage = dynamic(() => import('../../src/modules/pluviometros'), {
    loading: () => <ModalLoading isOpen={true} />
});

const ListSuertesPage = (props: { toogleTheme: (theme: ThemeProps) => void }) => (
    <PluviometrosViewPage toogleTheme={props.toogleTheme} />
);

export default ListSuertesPage;

import dynamic from 'next/dynamic';
import ModalLoading from '@components/Modal';
import { ThemeProps } from '@interfaces/theme';
import PrivateRoute from '@utils/PrivateRoute';

const ListSuertesView = dynamic(() => import('../../src/modules/cultivos/suertes/ListSuerte'), {
    loading: () => <ModalLoading isOpen={true} />
});

const ListSuertesPage = (props: { toogleTheme: (theme: ThemeProps) => void }) => (
	<PrivateRoute>
    	<ListSuertesView toogleTheme={props.toogleTheme} />
	</PrivateRoute>
);

export default ListSuertesPage;

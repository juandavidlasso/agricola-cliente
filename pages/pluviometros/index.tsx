import dynamic from 'next/dynamic';
import ModalLoading from '@components/Modal';
import { ThemeProps } from '@interfaces/theme';
import PrivateRoute from '@utils/PrivateRoute';

const PluviometrosViewPage = dynamic(() => import('../../src/modules/pluviometros'), {
    loading: () => <ModalLoading isOpen={true} />
});

const ListSuertesPage = (props: { toogleTheme: (theme: ThemeProps) => void }) => (
	<PrivateRoute>
    	<PluviometrosViewPage toogleTheme={props.toogleTheme} />
	</PrivateRoute>
);

export default ListSuertesPage;

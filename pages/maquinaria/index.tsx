import dynamic from 'next/dynamic';
import ModalLoading from '@components/Modal';
import { ThemeProps } from '@interfaces/theme';
import PrivateRoute from '@utils/PrivateRoute';

const ListMaquinariaView = dynamic(() => import('../../src/modules/maquinaria/ListMaquinaria'), {
    loading: () => <ModalLoading isOpen={true} />
});

const MaquinariaPage = (props: { toogleTheme: (theme: ThemeProps) => void }) => (
	<PrivateRoute>
    	<ListMaquinariaView toogleTheme={props.toogleTheme} />
	</PrivateRoute>
);

export default MaquinariaPage;

import dynamic from 'next/dynamic';
import { ThemeProps } from '@interfaces/theme';
import ModalLoading from '@components/Modal';
import PrivateRoute from '@utils/PrivateRoute';

const DatosActualesView = dynamic(() => import('../../src/modules/datosActuales'), {
    loading: () => <ModalLoading isOpen={true} />
});

const DatosActualesPage = (props: { toogleTheme: (theme: ThemeProps) => void }) => (
	<PrivateRoute>
    	<DatosActualesView toogleTheme={props.toogleTheme} />
	</PrivateRoute>
);

export default DatosActualesPage;

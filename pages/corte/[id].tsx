import dynamic from 'next/dynamic';
import { ThemeProps } from '@interfaces/theme';
import ModalLoading from '@components/Modal';
import PrivateRoute from '@utils/PrivateRoute';

const CorteDetalleView = dynamic(() => import('../../src/modules/cultivos/cortes/CorteDetalle'), {
    loading: () => <ModalLoading isOpen={true} />
});

const CorteDetallePage = (props: { toogleTheme: (theme: ThemeProps) => void }) => (
	<PrivateRoute>
    	<CorteDetalleView toogleTheme={props.toogleTheme} />
	</PrivateRoute>
);

export default CorteDetallePage;

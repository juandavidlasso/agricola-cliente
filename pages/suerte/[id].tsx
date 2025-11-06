import dynamic from 'next/dynamic';
import ModalLoading from '@components/Modal';
import { ThemeProps } from '@interfaces/theme';
import PrivateRoute from '@utils/PrivateRoute';

const SuerteDetalleView = dynamic(() => import('../../src/modules/cultivos/suertes/SuerteDetalle'), {
    loading: () => <ModalLoading isOpen={true} />
});

const SuerteDetallePage = (props: { toogleTheme: (theme: ThemeProps) => void }) => (
	<PrivateRoute>
    	<SuerteDetalleView toogleTheme={props.toogleTheme} />
	</PrivateRoute>
);

export default SuerteDetallePage;

import dynamic from 'next/dynamic';
import ModalLoading from '@components/Modal';
import { ThemeProps } from '@interfaces/theme';
import PrivateRoute from '@utils/PrivateRoute';

const MaquinariaDetalleView = dynamic(() => import('../../src/modules/maquinaria/MaquinariaDetalle'), {
    loading: () => <ModalLoading isOpen={true} />
});

const MaquinariaDetallePage = (props: { toogleTheme: (theme: ThemeProps) => void }) => (
	<PrivateRoute>
    	<MaquinariaDetalleView toogleTheme={props.toogleTheme} />
	</PrivateRoute>
);

export default MaquinariaDetallePage;

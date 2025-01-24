import dynamic from 'next/dynamic';
import { ThemeProps } from '@interfaces/theme';
import ModalLoading from '@components/Modal';

const CorteDetalleView = dynamic(() => import('../../src/modules/cultivos/cortes/CorteDetalle'), {
    loading: () => <ModalLoading isOpen={true} />
});

const CorteDetallePage = (props: { toogleTheme: (theme: ThemeProps) => void }) => (
    <CorteDetalleView toogleTheme={props.toogleTheme} />
);

export default CorteDetallePage;

import dynamic from 'next/dynamic';
import ModalLoading from '@components/Modal';
import { ThemeProps } from '@interfaces/theme';

const SuerteDetalleView = dynamic(() => import('../../src/modules/cultivos/suertes/SuerteDetalle'), {
    loading: () => <ModalLoading isOpen={true} />
});

const SuerteDetallePage = (props: { toogleTheme: (theme: ThemeProps) => void }) => (
    <SuerteDetalleView toogleTheme={props.toogleTheme} />
);

export default SuerteDetallePage;

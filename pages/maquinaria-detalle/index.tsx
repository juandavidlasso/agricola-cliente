import dynamic from 'next/dynamic';
import ModalLoading from '@components/Modal';
import { ThemeProps } from '@interfaces/theme';

const MaquinariaDetalleView = dynamic(() => import('../../src/modules/maquinaria/MaquinariaDetalle'), {
    loading: () => <ModalLoading isOpen={true} />
});

const MaquinariaDetallePage = (props: { toogleTheme: (theme: ThemeProps) => void }) => (
    <MaquinariaDetalleView toogleTheme={props.toogleTheme} />
);

export default MaquinariaDetallePage;

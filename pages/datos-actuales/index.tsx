import dynamic from 'next/dynamic';
import { ThemeProps } from '@interfaces/theme';
import ModalLoading from '@components/Modal';

const DatosActualesView = dynamic(() => import('../../src/modules/datosActuales'), {
    loading: () => <ModalLoading isOpen={true} />
});

const DatosActualesPage = (props: { toogleTheme: (theme: ThemeProps) => void }) => (
    <DatosActualesView toogleTheme={props.toogleTheme} />
);

export default DatosActualesPage;

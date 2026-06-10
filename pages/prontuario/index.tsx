import dynamic from 'next/dynamic';
import { ThemeProps } from '@interfaces/theme';
import PrivateRoute from '@utils/PrivateRoute';
import ModalLoading from '@components/Modal';

const ProntuarioViewPage = dynamic(() => import('../../src/modules/prontuario'), {
    loading: () => <ModalLoading isOpen={true} />
});

const ProntuarioPage = (props: { toogleTheme: (theme: ThemeProps) => void }) => (
    <PrivateRoute>
        <ProntuarioViewPage toogleTheme={props.toogleTheme} />
    </PrivateRoute>
);

export default ProntuarioPage;

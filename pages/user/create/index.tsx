import dynamic from 'next/dynamic';
import ModalLoading from '@components/Modal';
import { ThemeProps } from '@interfaces/theme';

const RegisterUserView = dynamic(() => import('../../../src/modules/user/Register'), {
    loading: () => <ModalLoading isOpen={true} />
});

const RegisterPage = (props: { toogleTheme: (theme: ThemeProps) => void }) => (
    <RegisterUserView toogleTheme={props.toogleTheme} />
);

export default RegisterPage;

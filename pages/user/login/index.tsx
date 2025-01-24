import ModalLoading from '@components/Modal';
import dynamic from 'next/dynamic';

const LoginView = dynamic(() => import('../../../src/modules/auth/Login'), {
    loading: () => <ModalLoading isOpen={true} />
});

const LoginPage = () => <LoginView />;

export default LoginPage;

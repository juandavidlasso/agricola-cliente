import dynamic from 'next/dynamic';
import ModalLoading from '@components/Modal';
import { ThemeProps } from '@interfaces/theme';
import PrivateRoute from '@utils/PrivateRoute';

const RegisterUserView = dynamic(() => import('../../../src/modules/user/Register'), {
    loading: () => <ModalLoading isOpen={true} />
});

const RegisterPage = (props: { toogleTheme: (theme: ThemeProps) => void }) => (
	<PrivateRoute>
    	<RegisterUserView toogleTheme={props.toogleTheme} />
	</PrivateRoute>
);

export default RegisterPage;

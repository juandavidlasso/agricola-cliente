import dynamic from 'next/dynamic';
import ModalLoading from '@components/Modal';
import { ThemeProps } from '@interfaces/theme';
import PrivateRoute from '@utils/PrivateRoute';

const AccountView = dynamic(() => import('../../../src/modules/user/Account'), {
    loading: () => <ModalLoading isOpen={true} />
});

const AccountPage = (props: { toogleTheme: (theme: ThemeProps) => void }) => (
	<PrivateRoute>
		<AccountView toogleTheme={props.toogleTheme} />
	</PrivateRoute>
);

export default AccountPage;

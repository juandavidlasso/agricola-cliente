import dynamic from 'next/dynamic';
import ModalLoading from '@components/Modal';
import { ThemeProps } from '@interfaces/theme';
import PrivateRoute from '@utils/PrivateRoute';

const ProfileView = dynamic(() => import('../../../src/modules/user/Profile'), {
    loading: () => <ModalLoading isOpen={true} />
});

const ProfilePage = (props: { toogleTheme: (theme: ThemeProps) => void }) => (
	<PrivateRoute>
		<ProfileView toogleTheme={props.toogleTheme} />
	</PrivateRoute>
);

export default ProfilePage;

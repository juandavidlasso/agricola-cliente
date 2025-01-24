import dynamic from 'next/dynamic';
import ModalLoading from '@components/Modal';
import { ThemeProps } from '@interfaces/theme';

const ProfileView = dynamic(() => import('../../../src/modules/user/Profile'), {
    loading: () => <ModalLoading isOpen={true} />
});

const ProfilePage = (props: { toogleTheme: (theme: ThemeProps) => void }) => <ProfileView toogleTheme={props.toogleTheme} />;

export default ProfilePage;

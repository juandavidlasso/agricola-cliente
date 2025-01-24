import dynamic from 'next/dynamic';
import ModalLoading from '@components/Modal';
import { ThemeProps } from '@interfaces/theme';

const AccountView = dynamic(() => import('../../../src/modules/user/Account'), {
    loading: () => <ModalLoading isOpen={true} />
});

const AccountPage = (props: { toogleTheme: (theme: ThemeProps) => void }) => <AccountView toogleTheme={props.toogleTheme} />;

export default AccountPage;

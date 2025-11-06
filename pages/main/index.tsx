import dynamic from 'next/dynamic';
import ModalLoading from '@components/Modal';
import { ThemeProps } from '@interfaces/theme';
import PrivateRoute from '@utils/PrivateRoute';

const MainView = dynamic(() => import('../../src/modules/cultivos'), {
    loading: () => <ModalLoading isOpen={true} />
});

const MainPage = (props: { toogleTheme: (theme: ThemeProps) => void }) => (
	<PrivateRoute>
		<MainView toogleTheme={props.toogleTheme} />
	</PrivateRoute>
);

export default MainPage;

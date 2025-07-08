import dynamic from 'next/dynamic';
import ModalLoading from '@components/Modal';
import { ThemeProps } from '@interfaces/theme';

const MainView = dynamic(() => import('../../src/modules/cultivos'), {
    loading: () => <ModalLoading isOpen={true} />
});

const MainPage = (props: { toogleTheme: (theme: ThemeProps) => void }) => <MainView toogleTheme={props.toogleTheme} />;

export default MainPage;

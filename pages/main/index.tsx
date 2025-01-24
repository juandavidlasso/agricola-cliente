import { ThemeProps } from '@interfaces/theme';
import Main from '@modules/cultivos';

const MainPage = (props: { toogleTheme: (theme: ThemeProps) => void }) => <Main toogleTheme={props.toogleTheme} />;

export default MainPage;

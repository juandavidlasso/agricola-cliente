import { ThemeProps } from '@interfaces/theme';
import Prontuario from '@modules/prontuario';

const ProntuarioPage = (props: { toogleTheme: (theme: ThemeProps) => void }) => <Prontuario toogleTheme={props.toogleTheme} />;

export default ProntuarioPage;

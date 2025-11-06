import { ThemeProps } from '@interfaces/theme';
import Prontuario from '@modules/prontuario';
import PrivateRoute from '@utils/PrivateRoute';

const ProntuarioPage = (props: { toogleTheme: (theme: ThemeProps) => void }) => (
	<PrivateRoute>
		<Prontuario toogleTheme={props.toogleTheme} />
	</PrivateRoute>
);

export default ProntuarioPage;

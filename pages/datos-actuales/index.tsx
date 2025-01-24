import { ThemeProps } from '@interfaces/theme';
import DatosActuales from '@modules/datosActuales';

const DatosActualesPage = (props: { toogleTheme: (theme: ThemeProps) => void }) => (
    <DatosActuales toogleTheme={props.toogleTheme} />
);

export default DatosActualesPage;

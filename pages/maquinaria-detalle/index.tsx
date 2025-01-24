import { ThemeProps } from '@interfaces/theme';
import MaquinariaDetalle from '@modules/maquinaria/MaquinariaDetalle';

const MaquinariaDetallePage = (props: { toogleTheme: (theme: ThemeProps) => void }) => (
    <MaquinariaDetalle toogleTheme={props.toogleTheme} />
);

export default MaquinariaDetallePage;

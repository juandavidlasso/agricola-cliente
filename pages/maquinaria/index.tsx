import { ThemeProps } from '@interfaces/theme';
import ListMaquinaria from '@modules/maquinaria/ListMaquinaria';

const MaquinariaPage = (props: { toogleTheme: (theme: ThemeProps) => void }) => (
    <ListMaquinaria toogleTheme={props.toogleTheme} />
);

export default MaquinariaPage;

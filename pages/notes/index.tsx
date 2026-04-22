import dynamic from 'next/dynamic';
import ModalLoading from '@components/Modal';
import { ThemeProps } from '@interfaces/theme';
import PrivateRoute from '@utils/PrivateRoute';

const NoteListView = dynamic(() => import('../../src/modules/notes/NoteListsView'), {
    loading: () => <ModalLoading isOpen={true} />
});

const NotesPage = (props: { toogleTheme: (theme: ThemeProps) => void }) => (
	<PrivateRoute>
		<NoteListView toogleTheme={props.toogleTheme} />
	</PrivateRoute>
);

export default NotesPage;

import { IAppDispatch } from '@interfaces/store';
import { useDispatch } from 'react-redux';

export const useAppDispatch = () => useDispatch<IAppDispatch>();

export default useAppDispatch;

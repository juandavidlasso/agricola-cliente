import { IRootState } from '@interfaces/store';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;

export default useAppSelector;

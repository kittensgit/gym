import { useDispatch } from 'react-redux';

import { AppDispatch } from 'types/redux/redux';

export const useAppDispatch: () => AppDispatch = useDispatch;

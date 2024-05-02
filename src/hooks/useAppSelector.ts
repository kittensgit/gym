import { useSelector } from 'react-redux';

import { RootState } from 'types/redux/redux';

import type { TypedUseSelectorHook } from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

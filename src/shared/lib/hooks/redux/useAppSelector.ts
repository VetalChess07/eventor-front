import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { StateSchema } from '@app/providers/storeProvider/types/stateSchema';

export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;

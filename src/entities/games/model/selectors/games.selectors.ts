import { StateSchema } from '@/app/providers/storeProvider/types/stateSchema';

export const getAllgames = (state: StateSchema) => state.games.games;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../types/user';

export interface UserState {
  data: User | null;
}

const initialState: UserState = {
  data: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.data = action.payload;
    },
    update2FA(state, action: PayloadAction<boolean>) {
      if (state.data) {
        state.data.is2FA = action.payload;
      }
    },
    clearUser(state) {
      state.data = null;
    },
  },
});

export const { setUser, clearUser, update2FA } = userSlice.actions;
export default userSlice;

export type { User, TelegramUser } from './model/types/user';
import userReducer from './model/slice/userSlice';

export { userApi } from './model/api/user.api';

export { userReducer };

export {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useGetUsersByGameQuery,
  useUpdateUserMutation,
  useSetUserBanStatusMutation,
} from './model/api/user.api';

export type {
  CreateUserMutationFn,
  DeleteUserMutationFn,
  UpdateUserMutationFn,
} from './model/api/user.api';

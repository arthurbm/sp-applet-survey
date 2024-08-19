import fetch from "@/config/fetch"
import { User } from "@/types/user-model"

export const getMe = () => {
  return fetch<User>({
    url: 'users/v1/user/me',
    method: 'GET',
  }).then(({ data }) => data)
}
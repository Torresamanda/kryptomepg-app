export type AvatarVariant = 'female' | 'male'

export interface CurrentUser {
  id: string
  name: string
  avatarVariant: AvatarVariant
}

export function makeKey(key: Array<unknown>) {
  return key.filter(Boolean);
}

export const userKeys = {
  all: ["users"],
  allbyname: ["allbyname"],
  me: () => [...userKeys.all, "me"],
  myFollowers: (search?: string) =>
    makeKey([...userKeys.all, "myFollowers", search]),
  myFollowing: (search?: string) =>
    makeKey([...userKeys.all, "following", search]),
  publicUser: (id: string) => makeKey([...userKeys.all, "publicUser", id]),
  publicUserFollowers: (id: string, search?: string) =>
    makeKey([...userKeys.all, "publicUserFollowers", id, search]),
  publicUserFollowing: (id: string, search?: string) =>
    makeKey([...userKeys.all, "publicUserFollowing", id, search]),
  publicUserJourneys: (id: string) =>
    makeKey([...userKeys.all, "publicUserJourneys", id]),
  publicUserKits: (id: string) =>
    makeKey([...userKeys.all, "publicUserKits", id]),
  publicUserTemplates: (id: string) =>
    makeKey([...userKeys.all, "publicUserTemplates", id]),
  apiKeys: () => makeKey([...userKeys.all, "apiKeys"]),
} as const;

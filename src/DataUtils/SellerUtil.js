class UserUtil {
  full_name = user =>
    user.first_name && user.last_name
      ? `${user.first_name} ${user.last_name}`
      : user?.name ?? '';

  avatar = user => user?.avatar ?? '';

  firstName = user => user?.first_name ?? '';

  lastName = user => user?.last_name ?? '';

  name = user => user?.name ?? '';

  createdAt = user => user?.created_at ?? '';

  address = user => user?.address ?? '';

  rating = user => user?.rating ?? '';

  ads = user => user?.ads ?? '';

  topics = user => user?.topics ?? '';
}
export default new UserUtil();

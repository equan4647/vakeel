const defaultList = [];
const defaultObject = {};

// export const getNotificationsList = store =>
//   store.notifications.data ?? defaultList;

export const getNotificationsList = identifier => store =>
  store.notifications?.[identifier] ?? defaultList;

export const getNotificationItem = id => store =>
  store.notifications.data?.[id] ?? defaultObject;

export const getNotificationCount = identifier => store => {
  return store.notifications.notificationCount[identifier] ?? 0;
};

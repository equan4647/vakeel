export const getCardsList = store => Object.values(store.payment.data) ?? [];

export const getCardItem = key => store => store.payment.data?.[key] ?? {};

export const getWalletAmount = store =>
  store.payment?.wallet ? Number(store.payment.wallet).toFixed(2) : 0;

export const getWalletUpdate = store => store.payment?.myWallet;

export const getLastUsedCardId = store => store.payment?.lastUsedCard ?? '';

export const getLastUsedCard = store =>
  store.payment.data?.[getLastUsedCardId(store)];

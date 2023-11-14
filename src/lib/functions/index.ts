// api
export const API_URL = 'https://localhost:32770';

export * from './api/fetchMultipleRequests.ts';
export * from './api/request.ts';
export * from './api/signalR.ts';

//bidding
export * from './bidding/calculateBidIncrements.ts';
export * from './bidding/remainingTime.ts';
export * from './bidding/placeBid.ts';

//utility
export * from './utility/formatCurrency.ts';
export * from './utility/scroll.ts';
export * from './utility/truncateText.ts';
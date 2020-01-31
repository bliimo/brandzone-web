import { EVENTS_REQUEST } from './actionTypes';

export const events = data => ({
  type: EVENTS_REQUEST,
  data
});

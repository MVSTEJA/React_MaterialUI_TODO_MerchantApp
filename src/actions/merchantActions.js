import { ADD_MERCHANT, DELETE_MERCHANT, EDIT_MERCHANT, SELECT_MERCHANT, MODIFY_BIDS, EDIT_MERCHANT_SUBMIT, SORT_BIDS, DISPLAY_BIDS } from './actionTypes';

export const addMerchantSubmit = merchant => ({
  type: ADD_MERCHANT,
  merchant,
});

export const deleteMerchant = () => ({
  type: DELETE_MERCHANT,
});

export const editMerchantSubmit = (prevMerchantData) => ({
  type: EDIT_MERCHANT_SUBMIT,
  prevMerchantData
});

export const modifyBids = bidFormData => ({
  type: MODIFY_BIDS,
  bidFormData
});

export const handleDisplayBids = bids => ({
  type: DISPLAY_BIDS,
  bids
});

export const sortBids = bids => ({
  type: SORT_BIDS,
  bids
});

export const selectMerchant = merchantFormData => ({
  type: SELECT_MERCHANT,
  merchantFormData,
});

export const editMerchant = (propsName, propsValue) => ({
  type: EDIT_MERCHANT,
  propsName,
  propsValue,
});

import { ADD_MERCHANT, DELETE_MERCHANT, EDIT_MERCHANT_SUBMIT, EDIT_MERCHANT, SELECT_MERCHANT, MODIFY_BIDS, SORT_BIDS, DISPLAY_BIDS } from './actions/actionTypes';
import { initialState } from './index';

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_MERCHANT: {
      return {
        ...state,
        merchants: [...state.merchants, {
          ...state.merchantFormData,
          bids: state.displayBids
        }]
      };
    }
    case DELETE_MERCHANT: {
      return {
        ...state,
        merchants: state.merchants.filter(merchant => merchant.id !== state.merchantFormData.id),
        merchantFormData: initialState.merchantFormData,
      };
    }
    case EDIT_MERCHANT_SUBMIT: {
      const { id } = state.merchantFormData;
      const newMerchantsData = state.merchants.map((merchant) => {
        if (merchant["id"] === action.prevMerchantData.id || merchant["id"] === id) {
          merchant = ({
            ...merchant,
            ...state.merchantFormData
          })
          merchant.bids = state.displayBids ? state.displayBids : merchant.bids
        }
        return merchant;
      });
      return {
        ...state,
        merchants: newMerchantsData,
      };
    }
    case SELECT_MERCHANT: {
      return {
        ...state,
        merchantFormData: action.merchantFormData,
      };
    }
    case EDIT_MERCHANT: {
      const merchantFormData = {
        ...state.merchantFormData,
        ...{
          [action.propsName]: action.propsValue
        }
      };
      return {
        ...state,
        merchantFormData,
      };
    }
    case MODIFY_BIDS: {
      const { bidFormData } = action;
      let bidsList;
      if (state.merchantFormData.bids.length !== bidFormData.noOfBids) {
        for (let index = 0; index < bidFormData.noOfBids; index++) {
          bidsList[index] = {
            carTitle: '', amount: 0, created: '', id: ''
          };
        }
      } else {
        bidsList = [...state.merchantFormData.bids].map((bid, key) => {
          if (key === bidFormData.changedPropKey) {
            bid = {
              ...bid,
              [bidFormData.propName]: bidFormData.propValue
            }
          }
          return bid;
        });
      }
      return {
        ...state,
        displayBids: bidsList,
      };
    }
    case DISPLAY_BIDS: {
      return {
        ...state,
        displayBids: action.bids,
      };
    }
    case SORT_BIDS: {
      const { bids } = action;

      [...bids].sort((bid1, bid2) => {
        if (bid1.amount < bid2.amount) {
          return -1;
        }
        if (bid1.amount > bid2.amount) {
          return 1;
        }
        return 0;
      })
      return {
        ...state,
        displayBids: bids,
      };
    }
    default:
      return state;
  }
};
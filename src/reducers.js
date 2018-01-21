import { ADD_MERCHANT, DELETE_MERCHANT, EDIT_MERCHANT_SUBMIT, EDIT_MERCHANT, SELECT_MERCHANT, MODIFY_BIDS, SORT_BIDS, DISPLAY_BIDS } from './actions/actionTypes';
import { initialState } from './index';

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_MERCHANT: {
      return {
        ...state,
        merchants: [...state.merchants, {
          ...state.merchantFormData,
          bids: state.merchantFormData.bids,
          displayBids: state.merchantFormData.bids
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
      let bidsList = [];
      const { bids } = state.merchantFormData;
      if (bids.length !== bidFormData.noOfBids) {
        if (bids.length < bidFormData.noOfBids) {
          bidsList = [...bids];
          bidsList.push({
            carTitle: '', amount: null, created: '', id: '',
          });
        } else {
          bidsList = [...bids];
          bidsList.splice(bidFormData.changedPropKey, 1);
        }
      } else {
        bidsList = [...state.merchantFormData.bids].map((bid, key) => {
          if (key === bidFormData.changedPropKey) {

            const propValue = bidFormData.propName === 'amount' ? Number(bidFormData.propValue) : bidFormData.propValue;
            bid = {
              ...bid,
              [bidFormData.propName]: propValue,
            }
          }
          return bid;
        });
      }
      return {
        ...state,
        merchantFormData: {
          ...state.merchantFormData,
          bids: bidsList,
        }
      };
    }
    case DISPLAY_BIDS: {
      return {
        ...state,
        displayBids: action.bids,
      };
    }
    case SORT_BIDS: {
      const { bids, sortBidData } = action;

      const displayBids = [...bids].sort((bid1, bid2) => {
        if (bid1[sortBidData.sortBidLabel] < bid2[sortBidData.sortBidLabel]) {
          return sortBidData.order === 'asc' ? -1 : 1;
        }
        if (bid1[sortBidData.sortBidLabel] > bid2[sortBidData.sortBidLabel]) {
          return sortBidData.order === 'desc' ? 1 : -1;
        }
        return 0;
      })
      return {
        ...state,
        displayBids,
      };
    }
    default:
      return state;
  }
};
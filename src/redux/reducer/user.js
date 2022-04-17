import * as UserActionTypes from '../actionType/userActionType';

const initialState = {
  userInfo: {},
  isSignedIn: false,
  selectedCategory: {
    categoryId: 0,
    categoryName: "",
  },
  selectedSubCategory: {
    subCategoryId: "",
  },
  selectedAddress: {
    addressId: 0,
    address: "",
    addressType: "",
  },
  addresses: [],
  addressAction: "CREATE",
  userImageName: "",
  isSignInModalVisible: false,
  favourites: [],
  latestAddedFavoriteProduct: {},
  shouldHomeScreenRefresh: false,
};

const user = (state = initialState, action) => {

  const { type, payload } = action;

  switch (type) {

    case UserActionTypes.SET_NAME:
      return {
        ...state,
        name: payload,
      };

    case UserActionTypes.SET_SIGNED_IN:
      return {
        ...state,
        isSignedIn: payload,
      };

    case UserActionTypes.SET_USER:
      return {
        ...state,
        userInfo: payload,
      };

    // category
    case UserActionTypes.SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: payload,
      };

    case UserActionTypes.SET_SELECTED_SUB_CATEGORY: {
      return {
        ...state,
        selectedSubCategory: payload,
      };
    };

    case UserActionTypes.SET_ADDRESS: {
      return {
        ...state,
        addresses: payload,
      };
    };

    case UserActionTypes.SET_SELECTED_ADDRESS: {
      return {
        ...state,
        selectedAddress: payload,
      }
    };

    case UserActionTypes.SET_ADDRESS_ACTION: {
      return {
        ...state,
        addressAction: payload,
      };
    };

    case UserActionTypes.SET_USER_IMAGE_NAME: {
      return {
        ...state,
        userImageName: payload
      };
    };

    case UserActionTypes.SHOW_SIGNIN_MODAL: {
      return {
        ...state,
        isSignInModalVisible: true,
      };
    };

    case UserActionTypes.HIDE_SIGNIN_MODAL: {
      return {
        ...state,
        isSignInModalVisible: false,
      };
    };

    case UserActionTypes.SHOULD_HOME_SCREEN_REFRESH: {
      return {
        ...state,
        shouldHomeScreenRefresh: !state.shouldHomeScreenRefresh,
      };
    };

    // favourites

    case UserActionTypes.ADD_TO_FAVOURITES: {

      let modifiedFavourites = [];

      const idx = state.favourites.findIndex(item => item.variantId === payload.variantId);

      if (idx === -1) {
        modifiedFavourites = [...state.favourites, payload];
      }

      return {
        ...state,
        favourites: modifiedFavourites,
      };

    };

    case UserActionTypes.REMOVE_FROM_FAVOURITES: {

      let modifiedFavourites = state.favourites.filter(item => item.variantId !== payload.variantId);

      return {
        ...state,
        favourites: modifiedFavourites,
      };

    };

    case UserActionTypes.SET_LATEST_ADDED_FAVOURITE_PRODUCT: {
      return {
        ...state,
        latestAddedFavoriteProduct: payload,
      };
    };

    // end favourites

    default:
      return state;
  }
};

export default user;
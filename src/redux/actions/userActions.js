import * as UserActionTypes from "../actionType/userActionType";

export const setName = (name) => ({
  type: UserActionTypes.SET_NAME,
  payload: name,
});

export const setUserImageName = (name) => ({
  type: UserActionTypes.SET_USER_IMAGE_NAME,
  payload: name,
});

export const setUser = (user) => ({
  type: UserActionTypes.SET_USER,
  payload: user,
});

export const setSignedIn = (status) => ({
  type: UserActionTypes.SET_SIGNED_IN,
  payload: status,
});

export const toggleSnackBar = () => ({
  type: UserActionTypes.TOGGLE_SNACK_BAR,
});

//category

export const setSelectedCategory = (category) => ({
  type: UserActionTypes.SET_SELECTED_CATEGORY,
  payload: category,
});

export const setSelectedSubCategory = (subCategory) => ({
  type: UserActionTypes.SET_SELECTED_SUB_CATEGORY,
  payload: subCategory,
});

// category ends here

//address
export const setAddress = (addresses) => ({
  type: UserActionTypes.SET_ADDRESS,
  payload: addresses,
});

export const setSelectedAddress = (addressId, addressType, area, building, nearByFamousPlace) => ({
  type: UserActionTypes.SET_SELECTED_ADDRESS,
  payload: {
    addressId,
    addressType,
    area,
    building,
    nearByFamousPlace,
  }
});

export const setAddressAction = (action) => ({
  type: UserActionTypes.SET_ADDRESS_ACTION,
  payload: action,
});

// sign in modal
export const hideSignInModal = () => ({
  type: UserActionTypes.HIDE_SIGNIN_MODAL,
});

export const showSignInModal = () => ({
  type: UserActionTypes.SHOW_SIGNIN_MODAL,
});

// add to favourites

export const addToFavourites = (payload) => ({
  type: UserActionTypes.ADD_TO_FAVOURITES,
  payload,
});

export const removeFromFavourites = (payload) => ({
  type: UserActionTypes.REMOVE_FROM_FAVOURITES,
  payload,
});

export const setLatestAddedFavouriteProduct = (payload) => ({
  type: UserActionTypes.SET_LATEST_ADDED_FAVOURITE_PRODUCT,
  payload,
});

export const toggleShouldHomeScreenRefresh = () => ({
  type: UserActionTypes.SHOULD_HOME_SCREEN_REFRESH,
});
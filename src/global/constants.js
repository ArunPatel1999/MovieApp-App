const { Dimensions, Platform } = require("react-native");

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

export const COMPRESS_IMAGE_MAX_WIDTH = 300;
export const COMPRESS_IMAGE_MAX_HEIGHT = 250;

export const isIOS = Platform.OS === 'ios';

export const STATUS = {
    SUCCESS: 'success',
};

export const STORAGE_KEY = {
    userPhoneNumber: "@userPhoneNumber",
    cartItems: "@cartItems",
};

export const APP_MESSAGE = {
    cartLimit: "Sorry, you can't add more of this item",
    productAdded: " has been added to your cart!",
    accountNotFound: "That Bharat account doesnt exists. Please Sign Up To Continue",
    feedbackSuccess: "Your response has been recorded",
    orderRatedSucces: 'Your response has been recorded',
    uploadMemorySuccess: 'Your memory has been uploaded successfully',
    accountCreatedSuccess: 'Account Successfully Created',
};

export const PRODUCT_TYPE = {
    ONLY_PACKS: ['DEFAULT_P', 'COLOUR_P', 'DEFAULT_S_P'],
    ONLY_SIZE: ['DEFAULT_S', 'DEFAULT_S', 'DEFAULT_S_P'],
    ONLY_COLOURS: ['COLOUR_P', 'COLOUR_S'],
};

export const DATE_FORMATS = {
    "DD-MMM-YYYY": "DD-MMM-YYYY",
};
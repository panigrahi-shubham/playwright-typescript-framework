export const URLS ={
    BASE: "https://automationexercise.com",
    PRODUCTS: "https://automationexercise.com/products",
    LOGIN: "https://automationexercise.com/login",
    SIGNUP: "https://automationexercise.com/signup",

} as const;

export const TIMEOUTS = {
  DEFAULT: 30000,   // 30 seconds — standard action timeout
  SHORT:   5000,    //  5 seconds — quick element checks
  LONG:    60000,   // 60 seconds — slow network operations
} as const;
export const MESSAGES = {
  LOGIN_ERROR: "Your email or password is incorrect!",
  SIGNUP_SUCCESS: "Account Created!",
  SEARCH_EMPTY: "No Products Found",
} as const;


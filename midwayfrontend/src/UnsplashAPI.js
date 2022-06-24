import { createApi } from "unsplash-js";

// Retrieve the unsplash access key from dotenv
const unsplashAcessKey = "Hi";

/*
 * API call to Unsplash
 */
const unsplashAPI = createApi({
  accessKey: unsplashAcessKey,
});

export default unsplashAcessKey;

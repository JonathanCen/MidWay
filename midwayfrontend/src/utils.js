import unsplashAPI from "./UnsplashAPI";

const queryArray = ["Food and drink", "food", "activity", "hangout"];

/*
 * Returns a promise from the unsplash api call
 */
const getBackgroundImagePromise = async () => {
  const query = queryArray[Math.floor(Math.random() * queryArray.length)];
  return await unsplashAPI.photos.getRandom({
    query: query,
    orientation: "landscape",
  });
};

export { getBackgroundImagePromise };

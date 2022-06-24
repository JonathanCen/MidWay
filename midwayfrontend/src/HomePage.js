import React, { useState, useEffect } from "react";
import { getBackgroundImagePromise } from "./utils";

const HomePage = () => {
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    setImageURL(
      "/background-image-large.jpg"
    );
    // const backgroundImagePromise = getBackgroundImagePromise();
    // backgroundImagePromise
    //   .then(reponse => setImageURL(reponse.response.urls.regular))
    //   .catch(err => console.log(`There was an error retrieving image from unsplash. ${err}`) );
  }, []);

  return (
    <div id="homepage-container">
      <div
        alt="background"
        id="homepage-background-image"
        style={{
          backgroundImage: `url(${imageURL})`,
        }}
      />
    </div>
  );
};

export default HomePage;

import React, { useState, useContext, useEffect } from "react";
import { BusinessPressedContext } from "./BusinessPressedContext";
import { Button } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArticleIcon from '@mui/icons-material/Article';

import MeetingLocationBusinessHeader from "./MeetingLocationBusinessHeader";

const MeetingLocationImageList = () => {
  const { setIsBusinessPressed, businessInformation } = useContext(BusinessPressedContext);
  const [imageData, setImageData] = useState([]);

  // Handler for back button
  const goBackHandler = () => {
    setIsBusinessPressed(false);
  }

  // Handler for opening a yelp
  const goToYelpHandler = () => {
    window.open(businessInformation.url, "_blank").focus();
  }

  // Took from react mui documentation
  const srcset = (image, size, rows = 1, cols = 1) => {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  // Change the image data whenever businessInformation changes or when a new business card is pressed
  useEffect(() => {
    if (Object.keys(businessInformation).length > 0) {
      setImageData([
        {
          img: `${businessInformation.photos[0]}`,
          title: `${businessInformation.name} Image`,
          rows: 3,
          cols: 4,
        }
      ]);
    }
  }, [businessInformation]);
  
  // Took from react mui documentation
  return (
    <ImageList
      sx={{ width: "100%", overflow: "none", position: "relative", margin : 0 }}
      variant="quilted"
      cols={4}
      rowHeight={120}
    >
      <Button variant="contained" size="small" startIcon={<ArrowBackIosNewIcon />} id={"meeting-locations-business-information-back-button"} onClick={goBackHandler}>Go Back</Button>
      {imageData.map((item) => (
        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            {...srcset(item.img, 120, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
            id="meeting-locations-business-information-image"
          />
          </ImageListItem>
      ))}
      <MeetingLocationBusinessHeader business={businessInformation}/>
      {/* <Button variant="outlined" size="small" endIcon={<ArticleIcon />} id={"meeting-locations-business-information-more-image-button"} onClick={goToYelpHandler} color="inherit">View more on Yelp</Button> */}
    </ImageList>
  );

}

export default MeetingLocationImageList;
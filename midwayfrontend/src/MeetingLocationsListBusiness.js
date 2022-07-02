import React from "react";
import { Card, CardMedia, CardContent, CardActionArea, Rating  } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Box } from '@mui/system';

const MeetingLocationsListBusiness = ( { business, num } ) => {

  return (
  <Card elevation={5} sx={{ display: 'flex', margin: "10px", justifyContent: "center", alignItems: "center" }} >
    <Box sx={{ height: "100%", width: "100%", position: "relative" }}>
      <CardMedia component="img" image={business.photos[0]} alt={`Image from ${business.name}`} sx={{ height: "100%", width: "100%" }} />
    </Box>
    <CardActionArea>
      <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
        <CardContent className="business-content" sx={{ height: '100%' }}>
          <div className="business-title">{ `${num}. ${ business.name }`}</div >
          <div className="business-rating">
            <div className="business-rating-rating" sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating defaultValue={business.rating} size="small" precision={0.5} icon={<StarIcon fontSize="inherit" />} emptyIcon={<StarIcon fontSize="inherit" />} readOnly />
            </div>
            <div className="business-rating-number-reviews">{business.review_count}</div>
          </div >
          <div className="bussiness-open">{ `${ business.hours[0].open[0].start } - ${business.hours[0].open[0].end}` }</div >
          <div className="bussiness-reiew">{ `${ business.reviews[0].text }` }</div >
        </CardContent>
      </Box>
    </CardActionArea>
  </Card>
  )
};

export default MeetingLocationsListBusiness;
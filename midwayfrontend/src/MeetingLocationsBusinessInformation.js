import React, { useState, useContext, useEffect } from "react";
import { BusinessPressedContext } from "./BusinessPressedContext";
import { Grid, Stack, Divider  } from '@mui/material';
import Item from "./Item";

import MeetingLocationImageList from "./MeetingLocationImageList";

const MeetingLocationsBusinessInformation = (props) => {
  const { getNum } = props;
  const { setIsBusinessPressed, businessInformation } = useContext(BusinessPressedContext);
  
  return (
    <Grid container direction="row" sx={{height: "100%", width : "100%"}} className="business-information">
      <Grid item xs={12} ><MeetingLocationImageList/></Grid>
      <Grid item xs={12} sx={{height: "100%"}}>
          <Item isBusinessInformation={true}>
        <Stack direction="column" sx={{height: "100%", width: "100%"}} >
            <div style={{height: "100%", width: "100%"}}>
              <div id="business-information-title">{`${getNum(businessInformation.name)}. ${businessInformation.name}`}</div>
              <div id="business-information-meta-information"  style={{height: "100%", width: "100%"}}>
                <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} >
                  <div id="business-information-about">
                    <Stack direction="column">
                      <div id="business-information-categories">Categories</div>
                      <div id="business-information-rating">Rating</div>
                      <div id="business-information-address">Address</div>
                    </Stack>
                  </div>
                  <div id="business-information-hours">
                    <Stack direction="column">
                      <div id="business-information-categories">Categories</div>
                      <div id="business-information-rating">Rating</div>
                      <div id="business-information-address">Address</div>
                    </Stack>
                  </div>
                </Stack>
              </div>
              <div id="busienss-information-reviews" style={{height: "100%", width: "100%"}}>
                <div>Review 1</div>
                <div>Review 2</div>
                <div>Review 3</div>
              </div>
            </div>
        </Stack>
          </Item>
      </Grid>
    </Grid>
  );
}

export default MeetingLocationsBusinessInformation;
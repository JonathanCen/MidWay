import React, { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import StarsIcon from "@mui/icons-material/Stars";

const StyledRating = styled(Rating)({
  "& .MuiRating-decimal": {
    backgroundColor: "white",
    borderRadius: "50%",
  },
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconEmpty": {
    color: "#d5d5d5",
  },
});

const MeetingLocationBusinessHeader = (props) => {
  const [rating, setRating] = useState(0);
  const { business } = props;

  useEffect(() => {
    setRating(business.rating);
  }, [props]);

  return (
    <Stack id="business-information-header" spacing={1}>
      <h1 id="business-information-title-in-image">
        <a
          href={business.url}
          target="_blank"
          className="business-information-title-in-image-anchor"
        >{`${business.name}`}</a>
      </h1>
      <Stack direction="row" spacing={2}>
        <StyledRating
          name="business-information-rating"
          value={rating || 0}
          precision={0.5}
          icon={<StarsIcon fontSize="inherit" />}
          emptyIcon={<StarsIcon fontSize="inherit" />}
          readOnly
          size="large"
        />
        <div id="business-information-rating-text">
          {business.review_count} Reviews
        </div>
      </Stack>
      <Stack direction="row" spacing={2}>
        {Object.keys(business).length > 0 &&
          business.categories.length > 0 &&
          business.categories.map((category, index) => (
            <Chip
              label={category.title}
              variant="outlined"
              key={index}
              sx={{
                boxShadow: "inset 5px -5px 100px 0px #ff0000",
                border: "2px white solid",
                color: "white",
              }}
            />
          ))}
      </Stack>
    </Stack>
  );
};

export default MeetingLocationBusinessHeader;

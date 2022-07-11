import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import StarsIcon from "@mui/icons-material/Stars";
// Taken from material UI documentation
const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

// Taken from material UI documentation
const stringAvatar = (name) => {
  return name === ""
    ? {}
    : {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
      };
};

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

const MeetingLocationBusinessReview = ({ review }) => {
  const [userName, setUserName] = useState("");
  const [userNameProfilePicture, setUserNameProfilePicture] = useState("");
  const [reviewURL, setReviewURL] = useState("");
  const [rating, setRating] = useState(0);
  const [userProfileURL, setUserProfileURL] = useState("");

  useEffect(() => {
    setUserName(review.user.name);
    setUserNameProfilePicture(review.user.image_url);
    setReviewURL(review.url);
    setRating(review.rating);
    setUserProfileURL(review.user.profile_url);
  }, [review]);

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          {userNameProfilePicture !== "" && userNameProfilePicture !== null ? (
            <Avatar alt={userName} src={userNameProfilePicture} />
          ) : (
            <Avatar alt={userName} {...stringAvatar(userName)} />
          )}
        </ListItemAvatar>
        <ListItemText
          primary={
            <a
              className="business-information-reviewer-profile-url"
              href={userProfileURL}
              target="_blank"
            >
              {userName}
            </a>
          }
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {`Rating: `}{" "}
                {
                  <StyledRating
                    name="business-information-reviewer-rating"
                    value={rating}
                    precision={0.5}
                    icon={<StarsIcon fontSize="inherit" />}
                    emptyIcon={<StarsIcon fontSize="inherit" />}
                    readOnly
                    size="small"
                  />
                }
              </Typography>
              {` — ${review.text} `}
              {
                <a
                  href={reviewURL}
                  className="business-information-review-url"
                  target="_blank"
                >
                  Read More
                </a>
              }
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
};

export default MeetingLocationBusinessReview;

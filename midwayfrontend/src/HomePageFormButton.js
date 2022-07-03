import React from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import TravelExploreTwoToneIcon from '@mui/icons-material/TravelExploreTwoTone';

const HomePageFormButton = (props) => {
  const { isLoading, downSize, styles, onClickHandler } = props;

  return (
    <LoadingButton
      type="submit"
      endIcon={<TravelExploreTwoToneIcon />}
      loading={isLoading}
      loadingPosition="end"
      variant="outlined"
      size={ downSize ? "medium" : "large"}
      sx={ styles !== undefined ? styles : { width: "100%" }}
      onClick={onClickHandler}
    >
      {isLoading ? 'Finding Locations' : 'Find Meeting Locations'}
    </LoadingButton>
  )
}

export default HomePageFormButton;
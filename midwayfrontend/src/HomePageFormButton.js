import React from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import TravelExploreTwoToneIcon from '@mui/icons-material/TravelExploreTwoTone';

const HomePageFormButton = (props) => {
  const { isLoading, downSize, id, onClickHandler } = props;

  return (
    <LoadingButton
      id={id}
      type="submit"
      endIcon={<TravelExploreTwoToneIcon />}
      loading={isLoading}
      loadingPosition="end"
      variant="outlined"
      size="large"
      onClick={onClickHandler}
    >
      {isLoading ? 'Finding Locations' : 'Find Meeting Locations'}
    </LoadingButton>
  )
}

export default HomePageFormButton;
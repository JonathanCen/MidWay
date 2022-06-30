import React from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import TravelExploreTwoToneIcon from '@mui/icons-material/TravelExploreTwoTone';

const HomePageFormButton = (props) => {
  const { isLoading } = props;
  return (
    <LoadingButton
      type="submit"
      endIcon={<TravelExploreTwoToneIcon />}
      loading={isLoading}
      loadingPosition="end"
      variant="outlined"
      size="large"
      sx={{ width: "100%" }}
    >
      {isLoading ? 'Finding Locations' : 'Find Meeting Locations'}
    </LoadingButton>
  )
}

export default HomePageFormButton;
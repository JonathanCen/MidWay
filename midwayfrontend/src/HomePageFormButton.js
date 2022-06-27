import React from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import TravelExploreTwoToneIcon from '@mui/icons-material/TravelExploreTwoTone';

const HomePageFormButton = (props) => {
  const { loading } = props.isLoading;

  return (
    <LoadingButton
      type="submit"
      endIcon={<TravelExploreTwoToneIcon />}
      loading={loading}
      loadingPosition="end"
      variant="outlined"
      size="large"
      sx={{ width: "100%" }}
    >
      {loading ? 'Finding Locations' : 'Find Meeting Locations'}
    </LoadingButton>
  )
}

export default HomePageFormButton;
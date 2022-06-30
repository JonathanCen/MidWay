import React from 'react';
import { useNavigate } from 'react-router-dom';

const MeetingLocationsHeader = (props) => {
  const { id } = props;

  const navigate = useNavigate();

  const navigateToHomePage = () => {
    // navigate back to the home page
    navigate('/')
  }

  return (
    <div id = {id}>
      <div id = {`${id}-title`} onClick={navigateToHomePage}>
        MidWay
      </div>
    </div> 
  );
};

export default MeetingLocationsHeader;
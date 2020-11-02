import React from 'react';
import Notifications from "react-notifications-menu";
import bulb from "../../images/bulb.png";


var data = [
    {
      image : bulb ,
      message : 'Your busiest day is ' + localStorage.busiestDay +'.',
    },
    {
      image : bulb ,
      message : 'Your most talked about topic is ' + localStorage.freqWord + '.',
    },
    {
        image : bulb ,
        message : 'Your most popular contact is <>.',
    }
  ];

export const Insights = () => {
    return (
        <Notifications
            data={data}
            icon={bulb}
        />
    );
  }
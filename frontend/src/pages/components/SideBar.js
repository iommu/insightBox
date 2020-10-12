
import React from 'react';
import Calendar from './Calendar';

function SideBar() {
  const sBStyle = {
    width : "300px",
    height: "100%",
    position: "fixed",
    backgroundColor: "#FFF"
  };
  return (
    <div style={sBStyle}>
      <Calendar />
    </div>
  )
}

export default SideBar;

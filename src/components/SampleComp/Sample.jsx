import React, { useState, useRef } from "react";
import "./Sample.css"; // Create this CSS file for styling

const CustomDatePicker = () => {
  return (
    <div className="input-container">
      <input type="date" id="date" className="datepicker" />
    </div>
  );
};

export default CustomDatePicker;

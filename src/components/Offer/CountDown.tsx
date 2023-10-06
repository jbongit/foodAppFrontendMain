"use client";
import React, { useState, useEffect } from "react";
import Countdown from "react-countdown";

const endingDate = new Date("2023-12-31");

const CountDown = () => {
  const [showCountDown, setShowCountDown] = useState(false);
  useEffect(() => {
    setShowCountDown(true);
  }, []);
  return (
    <>
      {showCountDown && (
        <Countdown
          className="text-5xl font-bold text-yellow-200"
          date={endingDate}
        />
      )}
    </>
  );
};

export default CountDown;

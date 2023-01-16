import React, { useState, useRef, useEffect } from 'react'

const SessionPopup = ({handleUnclick, session}) => {

  const ref = useRef(null);
  useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          console.log("You clicked outside of me!");
          handleUnclick()
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
  })

  return (
  <div ref={ref} className="session-popup">
    <div className="sessionPopupTitle"> Tuesday 11/15/2022 3:00pm </div>
  </div>)
}
export default SessionPopup

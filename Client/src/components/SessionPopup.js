import React, { useState, useRef, useEffect } from 'react'

const SessionPopup = ({handleUnclick, sessions}) => {

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
  <div ref={ref} className="sessionPopup">
    <div className="sessionPopupTitle"> Tuesday 11/15/2022 3:00pm </div>
    <div className="sessionPopupLabel">Instructors</div>
    <div className="sessionPopupItemList">
      <div className="sessionPopupBubble">Alex</div>
      <div className="sessionPopupBubble">Michael</div>
    </div>
    <div className="sessionPopupLabel">Students</div>
    <div className="sessionPopupItemList">
      <div>Kyle (12)</div><div>Vanessa (10)</div>
    </div>
    <div className="sessionPopupLabel">Subjects</div>
    <div className="sessionPopupItemList">
      <div>HTML</div>
      <div>CSS</div>
      <div>Javascript</div>
    <div>
    <div>Notes</div>
    <div className>
      <div>
        We worked on building a better website. It went really well.
      </div>
      <div>
        We worked on drawing new sprites for our Pixelpad game.
      </div>
    </div>

  </div>)
}
export default PopupView

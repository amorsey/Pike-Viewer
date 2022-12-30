import SessionCell from './SessionCell'
import SessionsList from './SessionsList'
import React, { useState, useRef, useEffect } from 'react'

const PopupView = ({handleUnclick, sessions }) => {

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
  <div ref={ref} className="fullCellPopup">
    <SessionsList sessions={sessions} />
  </div>)
}
export default PopupView

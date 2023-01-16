import SessionCell from './SessionCell'
import SessionsList from './SessionsList'
import React, { useState, useRef, useEffect } from 'react'

const PopupView = ({handleUnclick, sessions, type}) => {

  const ref = useRef(null);

  useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handleUnclick()
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
  })

  return (
  <div ref={ref} className={"popup"+type}>
    <SessionsList sessions={sessions} />
  </div>)
}
export default PopupView

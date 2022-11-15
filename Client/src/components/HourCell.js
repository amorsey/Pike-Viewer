import React, { useState } from 'react'

const HourCell = ({ time, data, handleClick }) => {
  let isActiveStyle = ""
  let display = ""
  if(data.length > 0){
    display = `${data.length} class today at ${time}`
    isActiveStyle = "slotContainerActive"
  }else{
    isActiveStyle = "slotContainerUnactive"
  }

  return(
    <div onClick={handleClick} className={isActiveStyle} data={data}>{display}</div>
  )
}

export default HourCell

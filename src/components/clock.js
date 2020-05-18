/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState, useEffect } from "react"

const Clock = () => {
  const setTime = () => {
    const today = new Date()

    let hour = today.getHours()
    let amOrPm = hour >= 12 ? "PM" : "AM"
    hour = hour % 12
    hour = hour ? hour : 12 // the hour '0' should be '12'

    let minutes = today.getMinutes()
    minutes = minutes < 10 ? `0${minutes}` : minutes

    return `${hour}:${minutes} ${amOrPm}`
  }
  const [clockTime, setClockTime] = useState(() => setTime())

  useEffect(() => {
    window.setInterval(() => setClockTime(setTime()), 5000)
  }, [])

  return (
    <p
      sx={{
        textAlign: `center`,
        margin: `0`,
      }}
    >
      {clockTime}
    </p>
  )
}

export default Clock

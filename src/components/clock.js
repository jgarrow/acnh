/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState, useEffect } from "react"

const Clock = () => {
  const setTime = () => {
    const today = new Date()
    let amOrPm = hour >= 12 ? "PM" : "AM"
    let hour = today.getHours()
    hour = hour % 12
    hour = hour ? hour : 12 // the hour '0' should be '12'

    const minutes = today.getMinutes()

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

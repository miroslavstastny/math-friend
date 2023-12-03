import React from 'react'

const formatMs = (ms: number) => {
  const sec = Math.ceil(ms / 1000)
  const min = Math.floor(sec / 60)
  const secRemainder = sec % 60
  return `${min}:${secRemainder < 10 ? '0' : ''}${secRemainder % 60}`
}

export const Timer: React.FunctionComponent<{
  totalSec: number
  onExpired?: () => void
}> = ({ totalSec, onExpired }) => {
  const endTime = React.useMemo(() => Date.now() + totalSec * 1000, [totalSec])
  const [remaining, setRemaining] = React.useState(endTime - Date.now())

  React.useEffect(() => {
    if (remaining <= 0) {
      onExpired?.()
      return
    }

    const timer = setInterval(() => {
      // console.log('Timer - setInterval', endTime - Date.now())
      setRemaining(Math.max(0, endTime - Date.now()))
    }, 1000)

    return () => clearInterval(timer)
  }, [remaining])

  return <div>Remaining: {formatMs(remaining)} </div>
}

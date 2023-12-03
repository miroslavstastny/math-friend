// empty React Function component
import React from 'react'
import { Input } from './Input.tsx'
import { Timer } from './Timer'

const nextQuestion: () => { question: string; answer: string } = () => {
  const l = Math.floor(Math.random() * 10.99)
  const r = Math.floor(Math.random() * 10.99)
  return { question: `${l} * ${r}`, answer: `${l * r}` }
}

export const Exam: React.FunctionComponent<{
  totalSec: number
  onComplete: (stats: { correct: number; wrong: number }) => void
}> = ({ onComplete, totalSec }) => {
  const [question, setQuestion] = React.useState(nextQuestion())
  const [stats, setStats] = React.useState({ correct: 0, wrong: 0 })

  const handleInput = React.useCallback(
    (e, answer: string) => {
      if (answer === question.answer) {
        setQuestion(nextQuestion())
        setStats({ ...stats, correct: stats.correct + 1 })
      } else {
        setStats({ ...stats, wrong: stats.wrong + 1 })
      }
    },
    [question, setQuestion],
  )

  return (
    <>
      <Timer totalSec={totalSec} onExpired={() => onComplete(stats)} />
      <div>{question.question}</div>
      <div>
        correct: {stats.correct} wrong: {stats.wrong}
      </div>
      <Input onSubmit={handleInput} />
    </>
  )
}

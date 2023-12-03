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
  const [lastAnswer, setLastAnswer] = React.useState<'correct' | 'wrong'>(
    'correct',
  )

  const handleInput = React.useCallback<
    Required<React.ComponentProps<typeof Input>>['onSubmit']
  >(
    (_, answer) => {
      if (answer === question.answer) {
        setQuestion(nextQuestion())
        setLastAnswer('correct')
        setStats((stats) => ({ ...stats, correct: stats.correct + 1 }))
      } else {
        setLastAnswer('wrong')
        setStats((stats) => ({ ...stats, wrong: stats.wrong + 1 }))
      }
    },
    [question, setQuestion],
  )

  return (
    <>
      <Timer totalSec={totalSec} onExpired={() => onComplete(stats)} />
      <h2>{question.question}</h2>
      <div>
        {lastAnswer === 'wrong' ? 'Last answer was wrong :-(' : <>&nbsp;</>}
      </div>
      <Input onSubmit={handleInput} />
      <div>
        correct: {stats.correct} wrong: {stats.wrong}
      </div>
    </>
  )
}

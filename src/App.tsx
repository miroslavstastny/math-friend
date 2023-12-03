import React from 'react'
import './App.css'

import { Exam } from './Exam'
import { VersionInfo } from './VersionInfo'

function App() {
  const [lastResult, setLastResult] = React.useState<{
    correct: number
    wrong: number
  }>({ correct: 0, wrong: 0 })
  const [fsm, setFsm] = React.useState<'new' | 'running' | 'done'>('new')
  return (
    <>
      <h1>Math Friend</h1>
      {fsm === 'new' && (
        <div>
          <button onClick={() => setFsm('running')}>start</button>
        </div>
      )}
      {fsm === 'running' && (
        <Exam
          totalSec={5 * 60}
          onComplete={(stats) => {
            setLastResult(stats)
            setFsm('done')
          }}
        />
      )}

      {fsm === 'done' && (
        <div>
          <h2>Done!</h2>
          <p>
            {lastResult?.correct} of {lastResult?.correct + lastResult?.wrong}{' '}
            correct
          </p>
          <button onClick={() => setFsm('running')}>Play again!</button>
        </div>
      )}
      <VersionInfo />
    </>
  )
}

export default App

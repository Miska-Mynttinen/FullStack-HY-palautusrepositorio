import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}


const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const Header2 = (props) => {
  return (
    <div>
      <h2>{props.title}</h2>
    </div>
  )
}


const Display = (props) => <div>{props.text} {props.value}</div>


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all = good + neutral + bad
  let avg = (good - bad) / all
  if (Number.isNaN(avg)) avg = 0
  let positive = (100 * good) / all
  if (Number.isNaN(positive)) positive = 0

  return (
    <div>
      <Header title={'give feedback'} />
      <>
        <Button handleClick={() => setGood(good + 1)} text='good' />
        <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
        <Button handleClick={() => setBad(bad + 1)} text='bad' />
      </>
      <Header2 title={'statistics'} />
        <Display text={'good'} value={good} />
        <Display text={'neutral'} value={neutral} />
        <Display text={'bad'} value={bad} />
        <Display text={'all'} value={all} />
        <Display text={'average'} value={avg} />
        <>positive {positive} % </>
    </div>
  )
}

export default App
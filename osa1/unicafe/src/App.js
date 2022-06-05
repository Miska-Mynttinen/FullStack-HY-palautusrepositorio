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


const Statistics = (props) => {
  const all = props.list[0] + props.list[1] + props.list[2]
  let avg = (props.list[0] - props.list[2]) / all
  if (Number.isNaN(avg)) avg = 0
  let positive = (100 * props.list[0]) / all
  if (Number.isNaN(positive)) positive = 0

  return (
    <div>
      <Display text={'all'} value={all} />
      <Display text={'average'} value={avg} />
      <>positive {positive} % </>
    </div>
  )
}


const NotUsed = (props) => {
  if ((props.list[0] + props.list[1] + props.list[2]) === 0 ) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <Display text={'good'} value={props.list[0]} />
      <Display text={'neutral'} value={props.list[1]} />
      <Display text={'bad'} value={props.list[2]} />
      <Statistics list={props.list} />
    </div>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const list = [good, neutral, bad]

  return (
    <div>
      <Header title={'give feedback'} />
      <>
        <Button handleClick={() => setGood(good + 1)} text='good' />
        <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
        <Button handleClick={() => setBad(bad + 1)} text='bad' />
      </>
      <Header2 title={'statistics'} />
      <NotUsed list={list} />
    </div>
  )
}

export default App
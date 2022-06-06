import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
      <button onClick = {onClick}>{text}</button>
  )
}

const Buttons = ({goodOnClick, badOnClick, neutralOnClick}) => {
  return (
    <div>
      <h1> give Feedback</h1>
      <Button onClick = {goodOnClick} text = "good"/>
      <Button onClick = {neutralOnClick} text = "neutral"/>
      <Button onClick = {badOnClick} text = "bad"/>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr><td>{text}</td><td>{value}</td></tr>
  )
}

const Statistics = ({good, bad, neutral}) => {
  const all = good+bad+neutral;
  const average = (good-bad)/all;
  const positive = good/all*100;
  if(all!=0){
  return (
    <div>
      <h1>Statistics</h1>
      <table>
      <tbody>
      <StatisticLine text = "good" value = {good}/>
      <StatisticLine text = "neutral" value = {neutral}/>
      <StatisticLine text = "bad" value = {bad}/>
      <StatisticLine text = "all" value = {all}/>
      <StatisticLine text = "average" value = {average}/>
      <StatisticLine text = "positive" value = {positive}/>
      </tbody>
      </table>
    </div>
  )}
  else {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodOnClick = () => {setGood(good+1)};
  const badOnClick = () => {setBad(bad+1)};
  const neutralOnClick = () => {setNeutral(neutral+1)};
  return (
    <div>
    <Buttons goodOnClick = {goodOnClick} badOnClick = {badOnClick}
    neutralOnClick = {neutralOnClick}/>
    <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
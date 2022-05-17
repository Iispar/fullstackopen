
import { useState } from 'react'

const Statistics = ({good, neutral, bad, all}) => {
  var average = ((good - bad) / (all)).toFixed(1)
  var positive = (good/(good + bad + neutral)*100).toFixed(1)
  if (all !== 0){
    return(
      <>
      <table>
        <tbody>
          <StatisticsLine name = "Good" number = {good}/>
          <StatisticsLine name = "Neutral" number = {neutral}/>
          <StatisticsLine name = "Bad" number = {bad}/>
          <StatisticsLine name = "All" number = {all}/>
          <StatisticsLine name = "Average" number = {average}/>

          <tr> 
            <td> Positive </td>
            <td>{positive}% </td>
          </tr>
        </tbody>
      </table>
      </>
      )
    }
    return (
  <p> No feedback given </p>
  )
}

const StatisticsLine = ({name, number}) => {
  return (
      <tr> 
        <td> {name}  </td>
        <td> {number} </td>
      </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = (good + neutral + bad)


  const Button = ({handle, name}) => (
    <button onClick={handle}> {name} </button>
  )

  const onClickGood = () => {
    setGood(good + 1)
  }

  const onClickNeutral = () => {
    setNeutral(neutral + 1)
  }

  const onClickBad = () => {
    setBad(bad + 1)
  }


  return (
    <div>
      <h1> Give feedback </h1>

      <Button handle = {onClickGood} name = "Good"/>
      <Button handle = {onClickNeutral} name = "Neutral"/>
      <Button handle = {onClickBad} name = "Bad"/>

      <h1> Statistics </h1>

      <Statistics 
        good = {good} 
        neutral = {neutral} 
        bad = {bad} 
        all = {all} 
        />

    </div>
  )
}

export default App

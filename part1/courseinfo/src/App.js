const Header = (props) => {
  return (<h1>{props.course}</h1>)
}

const Part = (props) => {
  return (<p>
    {props.text} {props.no}
  </p>)
}

const Content = (props) => {
return(<div><Part text={props.part1} no={props.ex1}/>
<Part text={props.part2} no={props.ex2}/>
<Part text={props.part3} no={props.ex3}/></div>)
}

const Total = (props) => {
  return(<p>Number of exercises {props.total}</p>)
}

const App = () => {
  const course = 'Half Stack application development'
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14
  const part1 = 'Fundamentals of React'

  const part2 = 'Using props to pass data'
  
  const part3 = 'State of a component'
  return (
    <div>
      < Header course = {course} />
      <Content ex1 = {exercises1} ex2 = {exercises2} ex3 = {exercises3} part1 = {part1}
        part2 = {part2} part3 = {part3} />
      <Total total ={exercises1+exercises2+exercises3}/>
    </div>
  )
}

export default App
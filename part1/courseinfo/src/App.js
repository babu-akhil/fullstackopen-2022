const Header = (props) => {
  return (<h1>{props.course}</h1>)
}

const Part = (props) => {
  return (<p>
    {props.text} {props.no}
  </p>)
}

const Content = (props) => {
return(<div>
  {props.parts.map((part,i) => (<Part text= {part.name} no = {part.exercises} key = {i}/>))}
</div>)
}

const Total = (props) => {
  return(<p>Number of exercises {props.parts.reduce((total,part) => {return total + part.exercises}, 0)}</p>)
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [{
    name: 'Fundamentals of React',
    exercises: 10
  },{
    name: 'Using props to pass data',
    exercises: 7
  }, {
    name: 'State of a component',
    exercises: 14
  }]}
  return (
    <div>
      < Header course = {course.name} />
      <Content parts ={course.parts} />
      <Total parts = {course.parts}/>
    </div>
  )
}

export default App
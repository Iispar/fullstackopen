

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

const Header = (props) => {
  return (
    <h1> {course.name} </h1>
  )
}


const Content = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercisess {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}
      </p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>   
        <Content part={course.parts[0].name} exercises={course.parts[0].exercises} />
        <Content part={course.parts[1].name} exercises={course.parts[1].exercises} />
        <Content part={course.parts[2].name} exercises={course.parts[2].exercises} />
      </p>
    </div>
  )
}

  return (
    <div>
      <Header course = {course.name} />
      <Part parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
}

export default App
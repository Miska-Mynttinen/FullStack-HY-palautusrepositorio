const Course = ({course}) => {
  return(
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
  )
}


const Header = (props) => {
  return (
    <>
      <h2>{props.course}</h2>
    </>
  )
}


const Content = (props) => {
  return (
    <div>
      {props.parts.map(_ =>
        <Part key={_.id} part={_} />
      )} 
    </div>
  )
}


const Part = (props) => {
  return(
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}


const Total = (props) => {
  return (
    <div>
      <h4>
        total of {props.parts.reduce((total, currentValue) => 
                    total = total + currentValue.exercises, 0)} exercises
      </h4>
    </div>
  )
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(_ =>
        <Course key={_.id} course={_} />
      )}
    </div>
  )
}

export default App
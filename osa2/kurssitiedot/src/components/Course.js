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

  export default Course
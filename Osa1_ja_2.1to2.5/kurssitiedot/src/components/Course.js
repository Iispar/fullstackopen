import React from "react";

const Course = ({course}) => (
    <>
      <Header name={course.name} />
      <Content course={course.parts} />
      <Total course={course.parts} />
    </>
  )


  const Header = ({name}) => (
    <h2> {name} </h2>
  )

  const Content = ({course}) => (
    <>
      {course.map(({ name, exercises, id}) => (
        <Part key={id} name={name} exercises={exercises} />
      ))}
    </>
  );

  const Part = ({name, exercises}) => (
    <div>
        {name} {exercises}
    </div>
  )

  const Total = ({course}) => {
    return (
      <div>
        <p>
          Number of exercisess {course.reduce((s, p) => s + p.exercises, 0)}
        </p>
      </div>
    )
  }

export default Course;
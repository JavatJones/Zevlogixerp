import React from 'react'
import ModulesList from './(components)/ModulesList'


// const myData = [
//   {
//     id: 1,
//     name: "carlos"
//   }
// ];

// {myData.map((data, index) => (
//     <div key={index}>
//       {data.id}
//       {data.name}
//     </div>
//   ))}


const HomePage = () => {
  return (
    <section className='flex flex-col'>

      <ModulesList></ModulesList>

    </section>
  )
}

export default HomePage
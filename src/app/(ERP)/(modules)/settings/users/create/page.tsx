import React from 'react'

//components
import RegisterForm from "./(components)/RegisterForm"

const CreateUserPage = () => {
  return (
    <section className='flex flex-col items-center justify-center'>
      <RegisterForm></RegisterForm>
    </section>
  )
}

export default CreateUserPage
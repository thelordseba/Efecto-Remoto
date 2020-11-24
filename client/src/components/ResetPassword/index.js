import React from 'react'
import ResetPassword from './ResetPassword'

function ResetPasswordContainer() {  
  return (
    <ResetPassword minLength={8}
    shouldContainUpperCase={true}
    shouldContainLowerCase={true}
    shouldContainSpecialCharacter={true}
    shouldContainNumber={true} />
   
  )


}

export default ResetPasswordContainer

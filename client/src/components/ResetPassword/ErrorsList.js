import React from 'react';
function ErrorsList({errors={}, allErrors={}}) {
  return <div className="err-cont">
  <ul>
    { Object.keys(errors).map( errorKey => <li className='reset-error'
                                                             key={errorKey}>{ allErrors[errorKey] }</li> )}
  </ul>
</div>
  
}

export default ErrorsList
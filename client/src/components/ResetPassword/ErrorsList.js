import React from 'react';

export default class ErrorsList extends React.Component {

  render() {
    return <div className="err-cont">
      <ul>
        { Object.keys(this.props.errors).map( errorKey => <li className='reset-error'
                                                                 key={errorKey}>{ this.props.allErrors[errorKey] }</li> )}
      </ul>
    </div>
  }
}
ErrorsList.defaultProps = {
  errors: {},
  allErrors: {}
};
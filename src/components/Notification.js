import React from 'react'
import styles from '../index.css'

const Notification = ({ errorMessage, successMessage }) => {
  if (successMessage === null && errorMessage === null) {
    return null
  }
  else if (successMessage){
    return(
      <div className = 'success' style = {styles.success}>
        {successMessage}
      </div>
    )
  }
  else {
    return(
      <div className = 'error' style = {styles.error}>
        {errorMessage}
      </div>
    )
  }
}

export default Notification
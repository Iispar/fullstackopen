
const notificationReducer = (state = null, action) => {

    switch (action.type) {
        case 'NEW': 
            return action.data.message
        case 'HIDE': 
            return action.data.message
        default:
            return state
    }
}

export const setNotification = (message, delay) => {
    return async (dispatch) => {
        dispatch({
            type: 'NEW',
            data: {
                message, 
                delay: setTimeout(() => {
                    dispatch(timeout())
                }, delay * 1000)
            }
        })
    }
}

export const timeout = () => {
    return {
      type: 'TIMEOUT',
      data: {
        notification: ''
      }
    }
  }

export default notificationReducer
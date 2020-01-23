export default function reducer(state = {chars:{}}, action) {
    
    switch (action.type) {
      case 'SET_CHARS':
        return { ...state, chars: action.payload }
      default:
        return state
    }
  }
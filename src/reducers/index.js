import { combineReducers } from 'redux';

import flowEditor from './flowEditor'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

export default combineReducers({
  flowEditor,
  todos,
  visibilityFilter
})

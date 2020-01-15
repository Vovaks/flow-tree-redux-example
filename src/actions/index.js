import {name} from 'react-lorem-ipsum';

export const INCREMENT = 'INCREMENT'
export const CREATE_NODE = 'CREATE_NODE'
export const DELETE_NODE = 'DELETE_NODE'
export const ADD_CHILD = 'ADD_CHILD'
export const REMOVE_CHILD = 'REMOVE_CHILD'
export const CHANGE_NAME = 'CHANGE_NAME'
export const VISIBLE_CHANGE = 'VISIBLE_CHANGE'
export const SEARCH = 'SEARCH'
export const CLEAR_SEARCH = 'CLEAR_SEARCH'
export const VISIBLE_ALL = 'VISIBLE_ALL'
export const SELECT_NODE = 'SELECT_NODE'
export const UNSELECT_NODE = 'UNSELECT_NODE'
export const COPY_NODE_ID = 'COPY_NODE_ID'
export const PASTE_NODE_ID = 'PASTE_NODE_ID'
export const REMOVE_CHILD_FROM_PARENT = 'REMOVE_CHILD_FROM_PARENT'

export const increment = (nodeId) => ({
  type: INCREMENT,
  nodeId
})

export const changeName = (nodeId) => ({
  type: CHANGE_NAME,
  action_id: `new_$name`,
  nodeId
})

export const visibleChange = (nodeId) => ({
  type: VISIBLE_CHANGE,
  nodeId
})
export const visibleAll = () => ({
  type: VISIBLE_ALL,
})

let nextId = 0
export const createNode = () => ({
  type: CREATE_NODE,
  nodeId: `new_${nextId++}`,
  action_id: name(),
})

export const deleteNode = (nodeId) => ({
  type: DELETE_NODE,
  nodeId
})

export const addChild = (nodeId, childId, action_id) => ({
  type: ADD_CHILD,
  nodeId,
  childId,
  action_id
})

export const removeChild = (nodeId, childId) => ({
  type: REMOVE_CHILD,
  nodeId,
  childId
})

export const removeChildFromParent = (nodeId, childId) => ({
  type: REMOVE_CHILD_FROM_PARENT,
  childId,
  nodeId
})

export const searchInList = (searchText) => ({
  type: SEARCH,
  searchText
})
export const clearSearch = () => ({
  type: CLEAR_SEARCH
})

export const selectNode = (nodeId) => ({
  type: SELECT_NODE,
  nodeId,
})
export const unselect = () => ({
  type: UNSELECT_NODE,
})

export const copyNodeId = () => ({
  type: COPY_NODE_ID
})
export const pasteNodeId = (nodeId, childId) => ({
  type: PASTE_NODE_ID,
  nodeId,
  childId
})



//TEST:
let nextTodoId = 0
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})

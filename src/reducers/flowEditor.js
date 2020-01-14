import {
  INCREMENT,
  ADD_CHILD,
  REMOVE_CHILD,
  CREATE_NODE,
  DELETE_NODE,
  CHANGE_NAME,
  VISIBLE_CHANGE,
  SEARCH,
  VISIBLE_ALL,
  SELECT_NODE,
  CLEAR_SEARCH
} from '../actions'
import generateTree from '../generateTree'

const tree = generateTree()

const childIds = (state, action) => {
  switch (action.type) {
    case ADD_CHILD:
      return [...state, action.childId]
    case REMOVE_CHILD:
      return state.filter(id => id !== action.childId)
    default:
      return state
  }
}

const node = (state, action) => {
  switch (action.type) {
    case CREATE_NODE:
      return {
        id: action.nodeId,
        action_id: action.action_id,
        childVisible: action.childVisible,
        visible: action.visible,
        counter: 0,
        childIds: []
      }
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + 1
      }
    case VISIBLE_CHANGE:
      return {
        ...state,
        childVisible: !state.childVisible
      }
    case CHANGE_NAME:
      return {
        ...state,
        action_id: action.action_id
      }
    case ADD_CHILD:
    case REMOVE_CHILD:
      return {
        ...state,
        childVisible: true,
        childIds: childIds(state.childIds, action)
      }
    default:
      return state
  }
}

const getAllDescendantIds = (state, nodeId) => {
  const elementPos = state.treeList.map((node, index) => {
    return node.id
  }).indexOf(nodeId);
  const objectFound = state.treeList[elementPos];
  const allDescendant = objectFound.childIds.reduce((acc, childId) => {
    acc.push(...acc, childId, ...getAllDescendantIds(state, childId));
    return acc
  }, [])
  return allDescendant
}

const deleteMany = (state, ids) => {
  let treeList = [...state.treeList]
  treeList.map((myNode, index) => {
      const deleted = ids.indexOf(myNode.id);
      deleted >= 0 && treeList.splice(index, 1)
    }
  )
  return {...state, treeList}
}

const search = (state, searchText) => {
  const treeSearchValues = state.treeList.reduce((newArr, node) => {
    let result = node.action_id.toLowerCase().indexOf(searchText.toLowerCase());
    if (result >= 0) {
      newArr.push(node.id);
    }
    return newArr;
  }, []);
  const nodeForVisible = getAllParentId(state, treeSearchValues).concat(treeSearchValues);

  return Object.assign({}, state, {
    treeList: state.treeList.map((node, index) => {
      const visible = nodeForVisible.indexOf(node.id);
      const inSearch = treeSearchValues.indexOf(node.id);
      const childVisible = node.childIds.filter(x => nodeForVisible.includes(x));
      if (visible < 0 && inSearch < 0) {
        return Object.assign({}, node, {
          ...state.treeList[index],
          visible: false,
          inSearch: false,
          childVisible: false
        })
      } else {
        let nodeStats = {}
        if (visible >= 0) {
          nodeStats = {...nodeStats, visible: true}
        } else {
          nodeStats = {...nodeStats, visible: false}
        }
        if (inSearch >= 0) {
          nodeStats = {...nodeStats, inSearch: true}
        } else {
          nodeStats = {...nodeStats, inSearch: false}
        }
        if (childVisible.length > 0) {
          nodeStats = {...nodeStats, childVisible: true}
        } else {
          nodeStats = {...nodeStats, childVisible: false}
        }
        return Object.assign({}, node, {
          ...state.treeList[index], ...nodeStats
        })
      }
    })
  })
}


const getAllParentId = (state, treeSearchValues) => {
  let nodeForVisible = []
  state.treeList.map((node) => {
    let intersection = node.childIds.filter(x => treeSearchValues.includes(x));
    const uniqParent = nodeForVisible.indexOf(node.id)
    if (intersection.length > 0 && uniqParent < 0) {
      nodeForVisible.push(node.id)
    }
  })
  return nodeForVisible
}

export default (state = {
  treeList: tree,
  visibleAll: false,
  selectedNodeId: null,
  mainNodeIds: [0]
}, action) => {

  console.log('action.type:', action.type)

  if (action.type === VISIBLE_ALL) {
    return Object.assign({}, state, {
      visibleAll: !state.visibleAll,
      treeList: state.treeList.map((node, index) => {
        return Object.assign({}, node, {
          ...state.treeList[index],
          childVisible: !state.visibleAll
        })
      })
    })
  }

  if (action.type === SEARCH) {
    return search(state, action.searchText)
  }

  if (action.type === CLEAR_SEARCH) {
    return Object.assign({}, state, {
      treeList: state.treeList.map((node, index) => {
        const mainNodeIds = state.mainNodeIds.indexOf(node.id);
        if (mainNodeIds < 0) {
          return Object.assign({}, node, {
            ...state.treeList[index],
            visible: true,
            inSearch: false,
            childVisible: false
          })
        }
        else {
          return Object.assign({}, node, {
            ...state.treeList[index],
            visible: true,
            inSearch: false,
            childVisible: true
          })
        }
      })
    })
  }

  const {nodeId} = action
  if (typeof nodeId === 'undefined') {
    return state
  }

  if (action.type === DELETE_NODE) {
    const descendantIds = getAllDescendantIds(state, nodeId);
    return deleteMany(state, [nodeId, ...descendantIds])
  }

  if (action.type === CREATE_NODE) {
    const treeList = {
      id: action.nodeId,
      action_id: action.action_id,
      childVisible: false,
      visible: true,
      inSearch: false,
      counter: 0,
      childIds: []
    }
    return {
      ...state,
      treeList: [...state.treeList, treeList]
    }
  }

  if (action.type === SELECT_NODE) {
    return {
      ...state,
      selectedNodeId: nodeId
    }
  }

  return {
    ...state,
    treeList: state.treeList.map((myNode, index) => {
      const newNode = nodeId === myNode.id ? node(myNode, action) : myNode;
      return Object.assign({}, node, {
        ...state[index],
        ...newNode
      })
    })

  }
}
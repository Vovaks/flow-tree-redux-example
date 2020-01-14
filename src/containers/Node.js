import React from 'react'
import {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'

export class Node extends Component {

  handleIncrementClick = () => {
    const {increment, id} = this.props
    increment(id)
  }

  changeName = () => {
    const {changeName, id} = this.props
    changeName(id)
  }

  handleAddChildClick = e => {
    e.preventDefault()
    const {addChild, createNode, id} = this.props
    // const childId = createNode().nodeId
    const {nodeId, action_id, visible} = createNode()
    addChild(id, nodeId, action_id, visible)
  }

  handleRemoveClick = e => {
    e.preventDefault()
    const {removeChild, deleteNode, parentId, id} = this.props
    removeChild(parentId, id)
    deleteNode(id)
  }

  renderChild = childId => {
    const {id} = this.props
    return (

      <li key={childId}>
        <ConnectedNode id={childId} parentId={id}/>
      </li>
    )
  }

  visibleChange = () => {
    const {visibleChange, id} = this.props
    visibleChange(id)
  }

  selectNode = () => {
    const {selectNode, id} = this.props
    selectNode(id)
  }

  render() {
    const { id, counter, childIds, action_id, childVisible, visible, inSearch} = this.props.objectFound
    const { selectedNodeId } = this.props.fullState
    const { parentId } = this.props

    const color = inSearch ? 'red' : 'black'
    const selectableBackgroundColor = selectedNodeId === id ? 'green' : 'white'

    return (
      <span>
        {visible &&
        <div   >
          {childIds.length > 0 ?
            (childVisible && childIds ? <span onClick={this.visibleChange}> - </span> :
              <span onClick={this.visibleChange}> + </span>)
            :
            null
          }
          <span style={{color: color, backgroundColor: selectableBackgroundColor }}
                onClick={this.selectNode}
                onDoubleClick={this.changeName}>
            {action_id}
          </span>
          {' '}
          : {counter}
          {' '}
          <button onClick={this.handleIncrementClick}>
            +
          </button>
          {' '}
          {typeof parentId !== 'undefined' &&
          <a href="#" onClick={this.handleRemoveClick} // eslint-disable-line jsx-a11y/anchor-is-valid
             style={{color: 'lightgray', textDecoration: 'none'}}>
            ×
          </a>
          }
          <ul>
            {childVisible && childIds.map(this.renderChild)}
            <li key="add">
              <a href="#" // eslint-disable-line jsx-a11y/anchor-is-valid
                 onClick={this.handleAddChildClick}
              >
                Add child
              </a>
            </li>
          </ul>
        </div>
        }
      </span>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const elementPos = state.flowEditor.treeList.map((node, index) => {
    return node.id}).indexOf(ownProps.id);
  const objectFound = state.flowEditor.treeList[elementPos];
  const fullState = state.flowEditor

  return {objectFound, fullState}
}

const ConnectedNode = connect(mapStateToProps, actions)(Node)
export default ConnectedNode

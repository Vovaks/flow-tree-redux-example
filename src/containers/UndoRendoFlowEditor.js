import React from 'react'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { connect } from 'react-redux'

let UndoRedoFlowEditor = ({ canUndo, canRedo, onUndo, onRedo }) => (
  <p>
    <button onClick={onUndo} disabled={!canUndo}>
      Undo
    </button>
    <button onClick={onRedo} disabled={!canRedo}>
      Redo
    </button>
  </p>
)

const mapStateToProps = (state) => ({
  canUndo: state.flowEditor.past.length > 0,
  canRedo: state.flowEditor.future.length > 0
})

const mapDispatchToProps = ({
  onUndo: UndoActionCreators.undo,
  onRedo: UndoActionCreators.redo
})

UndoRedoFlowEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(UndoRedoFlowEditor)

export default UndoRedoFlowEditor
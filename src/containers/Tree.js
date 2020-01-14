import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Node from './Node'

class Tree extends Component {

  search = () => {
    const { searchInList, clearSearch } = this.props
    this.searchInput.value === '' ?
      clearSearch() : searchInList(this.searchInput.value)
  }
  openAll = () => {
    const { visibleAll } = this.props
    visibleAll()
  }

  clearSearchText = () => {
    const { clearSearch } = this.props
    this.searchInput.value = "";
    clearSearch()
  }


  render() {
    // const { clearSearch } = this.props

    return (
      <div>
        <input type="text" ref={(input) => {this.searchInput = input}}/>
        <button onClick={this.search}>Search</button>
        <button onClick={this.clearSearchText}>Clear</button>
        <button onClick={this.openAll}>visibleAll T/F</button>
        {}
        <Node id={0}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  if(state.flowEditor){
    console.log('search', state.flowEditor.searchInput )
  }
  return state
};


export default connect(mapStateToProps, actions )(Tree);


// export default Tree

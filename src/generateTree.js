import { name } from 'react-lorem-ipsum'

export default function generateTree() {
  let tree = []
  tree.push({
    id: 0,
    action_id: 'Main',
    counter: 0,
    childIds: [],
    childVisible: true,
    inSearch: false,
    visible: true,
    selectable: false
  })


  for (let i = 1; i < 6; i++) {
    let parentId = Math.floor(Math.pow(Math.random(), 2) * i)
    tree[i] = {
      id: i,
      action_id: name(),
      counter: 0,
      childIds: [],
      childVisible: false,
      inSearch: false,
      visible: true,
      selectable: false
    }
    tree[parentId].childIds.push(i)
  }

  return tree
}

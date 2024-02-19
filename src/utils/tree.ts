export interface GenericNode {
  [key: string]: any
  children?: GenericNode[]
}

export function parseListToTree<T extends GenericNode> (
  list: T[],
  parentId = 0,
  idField = 'id',
  parentIdField = 'parentId'
): T[] {
  const tree: T[] = []
  list.forEach((node) => {
    if (node[idField] === undefined || node[parentIdField] === undefined) {
      throw new Error(`idField or parentIdField is not exist in node: ${JSON.stringify(node)}`)
    }
    if (node[parentIdField] === parentId) {
      const children = parseListToTree(list, node[idField], idField, parentIdField)
      if (children.length > 0) {
        node.children = children
      }
      tree.push(node)
    }
  })
  return tree
}

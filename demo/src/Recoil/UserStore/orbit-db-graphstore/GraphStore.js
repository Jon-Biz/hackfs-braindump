'use strict';

const Store = require('orbit-db-store')
const GraphIndex = require('./GraphIndex')
const algos = require('./utils/algos')

function defaultRelationshipId(source, type, id) {
  return `${source}:${type}:${id}`;
}

class GraphStore extends Store {

  constructor(ipfs, id, dbname, options) {
    const opts = { Index: GraphIndex, ...options }

    super(ipfs, id, dbname, opts)

    this._type = GraphStore.type;

    this.addressIdentifier =  options.addressIdentifier
                           || defaultRelationshipId
  }

  // All
  allVertices () {
    return this._index._vertexIndex
  }

  allRelationships () {
    return this._index._edgeIndex
  }

  // Lookup
  getVertex (key) {
    return this._index.getVertex(key)
  }

  getVertexWithDescendents(key, type) {
    const vertex = this._index.getVertex(key)
    if(!vertex)
      throw new Error('Vertex does not exist.')

    const children = 
            this.getRelationship(key, type)
                .map(key => this.getVertexWithRelationship(key, type))

    return { ...vertex, [type]: children }
  }

  getRelationship (from, type) {
    const key = this.edgeId(from, type)
    return this._index.getRelationship(key)
  }

  // Creation
  createRelationship (from, type, to) {
    if(!(this.hasVertex(from) && this.hasVertex(type)))
    throw new Error('Vertex does not exist!')

    function updateOrCreateRelationship(from, type, to) {
      const key = this.edgeId(from, type);
      const relationship = this.get(key)

      if (relationship) {
        if (relationship.includes(to)) {
          throw new Error('Relationship already exists')
        }

        const data = [
          ...relationship,
          to
        ]
  
        this.put(key, data, "UPDATE_RELATIONSHIP")
      }
      else {
        const data = []  
        this.put(key, data, "ADD_EDGE")
      }
    }

    const inverseType = `${type}-inverse`
    updateOrCreateRelationship(from, type, to)
    updateOrCreateRelationship(to, inverseType, from)    
  }

  createVertex (key, data) {
    return this.put(key, data, "ADD_VERTEX")
  }

  // Deletion
  deleteVertex (key, data) {
    if(!this.hasVertex(key))
      throw new Error('Vertex does not exist.')

    return this.del(key, "REMOVE_VERTEX")
  }

  removeRelationship (from, type, to) {
    // TODO: Check if Edge has connecting nodes
    const key = this._edgeId(from, type);

    function remove(from, type, to) {
      const relationship = this.get(key)

      if (!relationship)
        throw new Error(`No entry with key '${key}' in the database`)

      const data = relationship.filter(vertexKey => vertexKey !== to)

      if (data.length !== 0) {
        return this.put(key, data, "UPDATE_RELATIONSHIP")
      }
      else {
        return this.del(key, "REMOVE_EDGE")
      }
    }

    const inverseType = `${type}-inverse`

    remove(from, type, to)
    remove(to, inverseType, to)
  }

  // Updates
  updateVertex(key, data){
    return this.put(key, data, "UPDATE_VERTEX")
  }

  updateRelationship(from, to, data){
    return this.put(from, data, "UPDATE_RELATIONSHIP")
  }

  // Checks
  hasVertex(key){
    return this._index.getVertex(key) != null
  }

  hasRelationship(from, type, to){
    const key = this.edgeId(from, type)
    const relationship = this.get(key)

    return relationship.includes(to)
  }

  edgeId(source, target, id){
    return this.addressIdentifier(source, target, id);
  }

  getChildren(from, type){
    const key = this.edgeId(from, type)
    const relationship = this.index.get(key)

    return relationship
  }

  getParents(to, type){
    const inverseType = `${type}-inverse`
    const key = this.edgeId(to, inverseType)
    const relationship = this.index.get(key)

    return relationship
  }

  //   // Uninformed Search using BFS
  // simplePath(from, to, cutoff = Infinity) {
  //   return algos.BFS(from, to, this, cutoff);
  // }

  // unInformedPath(from, to, cutoff = Infinity) {
  //   return algos.biDirectionalSearch(from, to, this, cutoff)
  // }

  //TODO: A* or other?
  // informedPath(from, to, cutoff = Infinity){

  // }

  put (key, data, operation) {
    return this._addOperation({
      op: operation,
      key: key,
      value: data
    })
  }

  del (key, operation) {
    return this._addOperation({
      op: operation,
      key: key,
      value: null
    })
  }

  /**
   * Iterate over nodes
   * @return {Array} - Each value yielded is a [key, value] pair.
   */
  *[Symbol.iterator]() {
    const vs = this._index._vertexIndex;
    for (const key in vs) {
        const value = this._index._vertexIndex[key];
        yield [key, value];
    }
  }

  static get type () {
    return 'GraphStore'
  }
}

module.exports = GraphStore
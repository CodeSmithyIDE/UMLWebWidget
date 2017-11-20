'use strict'

import { SVGLayerSet } from "./SVGLayerSet.js"

var position = Symbol()

/**
  An element of a diagram.

  @property {SVGLayerSet} this.layers - The various SVG layers
    to use to render this element.
  @property {boolean} this.uptodate - Whether the layers need 
    to be updated because of changes to the element.
*/
class DiagramElement {

    /**
      Creates a new DiagramElement instance.

      @param {SVG} svg - The root SVG document.
      @param {string} id - A unique identifier for this element.
    */
    constructor(svg, type, id) {
        this.type = type
        this.id = id
        this.layers = new SVGLayerSet(svg)
        this.uptodate = false
        this[position] = { x: 0, y: 0 }
    }

    /**
      Gets the layers of the element. This checks
      if any changes were made to the element and calls
      {@link DiagramElement#update} if necessary before
      returning the layers.
      @returns {SVGLayerSet} The SVG layers to use to draw the
        element.
    */
    getLayers() {
        this.update()
        return this.layers
    }

    get x() {
        return this[position].x
    }

    get y() {
        return this[position].y
    }

    move(x, y) {
        this.uptodate = false
        this[position].x = x
        this[position].y = y
    }

    /**
      Returns the rectangle on which connection points
      can be placed. Returns null if no connection points
      are allowed or where they can be placed can't be
      expressed as a rectangle.
    */
    getConnectionPointsRectangle() {
        this.update()
        return this.doGetConnectionPointsRectangle()
    }

    update() {
        if (!this.uptodate) {
            this.doUpdate()
            this.uptodate = true
        }
    }

    /**
      This function must be called after changes were
      made to update the contents of the SVG layers.

      @virtual
    */
    doUpdate() {
    }

    /**
       Implements the getConnectionPointsRectangle method.

      @virtual
    */
    doGetConnectionPointsRectangle() {
        return null
    }

}

export { DiagramElement }

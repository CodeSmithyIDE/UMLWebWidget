'use strict'

import { DiagramElement } from "./DiagramElement.ts"

/**
  A note on a UML diagram.

  @extends DiagramElement
*/
class Note extends DiagramElement {
    shapeLayer
    textLayer
    noteDescription
    style

    constructor(svg, id, noteDescription, style) {
        super(svg, null, null)
        this.shapeLayer = this.layers.createLayer("shape")
        this.textLayer = this.layers.createLayer("text")
        this.noteDescription = noteDescription
        this.style = style
    }

    update() {
        this.uptodate = true
    }

}

export { Note }

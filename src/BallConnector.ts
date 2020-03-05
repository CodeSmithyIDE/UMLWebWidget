/*
    Copyright (c) 2020 Xavier Leclercq
    Released under the MIT License
    See https://github.com/CodeSmithyIDE/UMLWebWidget/blob/master/LICENSE.txt
*/

'use strict'

import { CSSClassName } from "./CSSClassNames"
import { SVGLayer } from "./SVGLayer"
import { SVGLayerSet } from "./SVGLayerSet"

var textDef = Symbol()

/**
  A ball connector to represent an interface for a
  component.
*/
class BallConnector {
    svg
    layers: SVGLayerSet
    shapeLayer: SVGLayer
    textLayer: SVGLayer
    uptodate
    x: number
    y: number
    component
    name: string
    textGroup
    width: number

    constructor(svg, component, name: string) {
        this.svg = svg
        this.layers = new SVGLayerSet(svg)
        this.shapeLayer = this.layers.createLayer("shape")
        this.textLayer = this.layers.createLayer("text")
        this.uptodate = false
        this.x = 0
        this.y = 0
        this.component = component
        this.name = name
        this.textGroup = this.textLayer.group()
        this[textDef] = this.textGroup.text(this.name).move(0, 0) 
        this.width = this[textDef].bbox().width + 5
    }

    getLayers() {
        if (!this.uptodate) {
            this.update()
        }
        return this.layers
    }

    // Move the connector so that the top left
    // corner of the bounding box is at position
    // (x, y)
    move(x, y) {
        this.uptodate = false
        this.x = x
        this.y = y
    }

    // Move the connector so that its connection
    // point is at position (x, y)
    moveConnectionPoint(x, y) {
        this.uptodate = false
        let connectorOffsetY = this[textDef].bbox().height + 3
        y -= connectorOffsetY
        this.move(x, y)
    }

    update() {
        this.shapeLayer.clear()
        this[textDef].move(this.x, this.y)
        let lineGroup = this.shapeLayer.group().addClass(CSSClassName.BallConnector_Shape)
        lineGroup.circle(10).move(this.x + (this.width)/2 - 5, this.y + 22)
        lineGroup.line(this.x + 10 + (this.width)/2 - 5, this.y + 27, this.x + (this.width), this.y + 27)
    }

    getAssemblyConnectionPoint() {
        return { x: (this.x + (this.width / 2) - 4), y: this.y + this[textDef].bbox().height + 5 }
    }

}

export { BallConnector }

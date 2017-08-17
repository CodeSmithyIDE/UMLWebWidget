'use strict'

import { DiagramElement } from "./DiagramElement.js"
import { SVGLayerSet } from "./SVGLayerSet.js"

/** 
  A class box. 

  @extends DiagramElement
*/
class ClassBox extends DiagramElement {

    constructor(svg, classDescription, canMove, style) {
        super(svg)
        this.shapeLayer = this.layers.createLayer("shape")
        this.textLayer = this.layers.createLayer("text")
        this.classDescription = classDescription

        this.def = createDef(this, classDescription, canMove, style)

        // List of connectors that are connected to this class box
        this.connectors = [ ]
    }

    update() {
        this.outofdate = false
    }

    move(x, y) {
        this.def.move(x, y)
    }
        
    fire(evt) {
        if (evt == "positionchanged") {
            for (let i = 0; i < this.connectors.length; i++) {
                this.connectors[i].draw()        
            }
        }
    }

}

function createDef(self, classInfo, canMove, style) {
    var classGroup = self.shapeLayer.group().addClass("UMLClassBox")

    let currentDimensions = { 
        width: 0,
        height: 0
    }

    let borderAdjustment = {
        top: 1,
        left: 1
    }
    
    currentDimensions.height = style.getTopMargin("classbox")

    var classNameGroup = self.textLayer.group().addClass("UMLClassName")
    var className = classNameGroup.text(classInfo.name).move(borderAdjustment.left + style.getLeftMargin("classbox"), borderAdjustment.top + currentDimensions.height)
    currentDimensions.width = Math.max(currentDimensions.width, className.bbox().width)
    currentDimensions.height += (className.bbox().height + style.getBottomMargin("classbox"))

    var line1YPos = currentDimensions.height
    let attributeGroupDef = addCompartment(self.textLayer, currentDimensions, borderAdjustment, style, classInfo.attributes, "UMLClassAttributes")
 
    var line2YPos = currentDimensions.height
    let operationGroupDef = addCompartment(self.textLayer, currentDimensions, borderAdjustment, style, classInfo.operations, "UMLClassOperations")

    // According to the UML standard the class name must be
    // centered so center it
    if (currentDimensions.width > className.bbox().width) {
        className.dx((currentDimensions.width - className.bbox().width)/2)
    }

    currentDimensions.width += (style.getLeftMargin("classbox") + style.getRightMargin("classbox"))
    
    classGroup.rect(currentDimensions.width, currentDimensions.height).move(borderAdjustment.left, borderAdjustment.top)
    classGroup.line(borderAdjustment.left, borderAdjustment.top + line1YPos, borderAdjustment.left + currentDimensions.width, borderAdjustment.top + line1YPos)
    classGroup.line(borderAdjustment.left, borderAdjustment.top + line2YPos, borderAdjustment.left + currentDimensions.width, borderAdjustment.top + line2YPos)
    
    if (canMove) {
        classGroup.draggable(true)
        classGroup.on('dragmove.namespace', function(evt) {
            self.fire('positionchanged')
        })
        classGroup.on('dragend.namespace', function(evt) {
            self.fire('positionchanged')
        })
    }

    return classGroup
}

// Add an attribute or operation compartment and updates the current dimensions
// of the class box
function addCompartment(textLayer, currentDimensions, borderAdjustment, style, items, cssClass) {
    currentDimensions.height += style.getTopMargin("classbox")
    let compartmentDef = createAttributeOrOperationGroupDef(textLayer, currentDimensions, borderAdjustment.left + style.getLeftMargin("classbox"), borderAdjustment.top, items, cssClass)
    currentDimensions.height += style.getBottomMargin("classbox")
    return compartmentDef
}

// Creates a group with all the attributes or operations
function createAttributeOrOperationGroupDef(textLayer, currentDimensions, offsetX, offsetY, items, cssClass) {
    let itemGroupDef = textLayer.group().addClass(cssClass)
    for (var i = 0; i < items.length; i++) {
        let itemDef = createAttributeOrOperationDef(itemGroupDef, items[i])
        itemDef.move(offsetX, offsetY + currentDimensions.height)
        currentDimensions.width = Math.max(currentDimensions.width, itemDef.bbox().width)
        currentDimensions.height += itemDef.bbox().height
        }
    return itemGroupDef
}

// Creates a single attribute or operation line
function createAttributeOrOperationDef(svg, item) {
    let text = visibilityStringToSymbol(item.visibility) + item.name
    if (item.return) {
        text += " : " + item.return
    }
    return svg.text(text)
}

// Converts the visibility from the user string provided
// in the input to the appropriate UML symbol for
// visibility
function visibilityStringToSymbol(visibility) {
    let stringToSymbolMap = {
        "public": "+ ",
        "protected": "# ",
        "private": "- "
    }
    return stringToSymbolMap[visibility]
}

export { ClassBox }

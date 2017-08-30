(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CodeSmithyUMLWebWidget"] = factory();
	else
		root["CodeSmithyUMLWebWidget"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiagramElement; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SVGLayerSet_js__ = __webpack_require__(4);




var position = Symbol()

/**
  An element of a diagram.

  @property {SVGLayerSet} this.layers - The various SVG layers
    to use to render this element.
  @property {boolean} this.uptodate - Whether the layers need 
    to be updated because of changes to the element.
*/
class DiagramElement {

    constructor(svg) {
        this.layers = new __WEBPACK_IMPORTED_MODULE_0__SVGLayerSet_js__["a" /* SVGLayerSet */](svg)
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
        if (!this.uptodate) {
            this.update()
        }
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
        if (!this.uptodate) {
            this.update()
        }
        return this.doGetConnectionPointsRectangle()
    }

    /**
      This function must be called after changes were
      made to update the contents of the SVG layers.

      @virtual
    */
    update() {
    }

    /**
       Implements the getConnectionPointsRectangle method.

      @virtual
    */
    doGetConnectionPointsRectangle() {
        return null
    }

}




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectionPoint; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DiagramElement_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ConnectionPointPosition_js__ = __webpack_require__(2);





/**
  <p>
    The point where an element and a connector meet.
  </p>

  <p>
    Although it derives from {@link DiagramElement} this
    element will probably be invisible to the user. 
    However it may be useful to make the connection points
    visible under some circumstances like for instance when
    the diagram is being edited.
  </p>

  @extends DiagramElement
  @property {DiagramElement} this.element - The element.
  @property {ConnectionPointPosition} this.position - The position
    of the connection point relative to the element.
*/
class ConnectionPoint extends __WEBPACK_IMPORTED_MODULE_0__DiagramElement_js__["a" /* DiagramElement */] {

    constructor(svg, element, position = __WEBPACK_IMPORTED_MODULE_1__ConnectionPointPosition_js__["a" /* ConnectionPointPosition */].BottomCenter) {
        super(svg)
        this.element = element
        this.position = position
    }

    setPosition(position) {
        this.position = position

        let x = 0
        let y = 0
        let boundingbox = this.element.getConnectionPointsRectangle()

        switch (this.position) {
            case __WEBPACK_IMPORTED_MODULE_1__ConnectionPointPosition_js__["a" /* ConnectionPointPosition */].TopCenter:
                x = boundingbox.cx
                y = boundingbox.y
                break

            case __WEBPACK_IMPORTED_MODULE_1__ConnectionPointPosition_js__["a" /* ConnectionPointPosition */].RightCenter:
                x = (boundingbox.x + boundingbox.width)
                y = boundingbox.cy
                break

            case __WEBPACK_IMPORTED_MODULE_1__ConnectionPointPosition_js__["a" /* ConnectionPointPosition */].BottomCenter:
                x = boundingbox.cx
                y = (boundingbox.y + boundingbox.height)
                break

            case __WEBPACK_IMPORTED_MODULE_1__ConnectionPointPosition_js__["a" /* ConnectionPointPosition */].LeftCenter:
                x = boundingbox.x
                y = boundingbox.cy
                break
        }

        this.move(x, y)
    }

}




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectionPointPosition; });


/**
  The position of a connection point. These
  are not the coordinates of the connection
  point but a description of where the 
  connection point should be relative to the
  element.
*/
class ConnectionPointPosition {

    constructor(type) {
        switch (type) {
            case "top-center":
                this.type = topCenter
                break

            case "top-right":
                this.type = topRight
                break

            case "right-center":
                this.type = rightCenter
                break

            case "bottom-right":
                this.type = bottomRight
                break

            case "bottom-center":
                this.type = bottomCenter
                break

            case "bottom-left":
                this.type = bottomLeft
                break

            case "left-center":
                this.type = leftCenter
                break

            case "top-left":
                this.type = topLeft
                break
        }
    }

    equals(other) {
        return (this.type === other.type)
    }

    static get TopCenter() {
        return staticTopCenter
    }

    static get TopRight() {
        return staticTopRight
    }

    static get RightCenter() {
        return staticRightCenter
    }

    static get BottomRight() {
        return staticBottomRight
    }

    static get BottomCenter() {
        return staticBottomCenter
    }

    static get BottomLeft() {
        return staticBottomLeft
    }

    static get LeftCenter() {
        return staticLeftCenter
    }

    static get TopLeft() {
        return staticTopLeft
    }
}

let topCenter = 0
let topRight = 1
let rightCenter = 2
let bottomRight = 3
let bottomCenter = 4
let bottomLeft = 5
let leftCenter = 6
let topLeft = 7

let staticTopCenter = new ConnectionPointPosition("top-center")
let staticTopRight = new ConnectionPointPosition("top-right")
let staticRightCenter = new ConnectionPointPosition("right-center")
let staticBottomRight = new ConnectionPointPosition("bottom-right")
let staticBottomCenter = new ConnectionPointPosition("bottom-center")
let staticBottomLeft = new ConnectionPointPosition("bottom-left")
let staticLeftCenter = new ConnectionPointPosition("left-center")
let staticTopLeft = new ConnectionPointPosition("top-left")




/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SVGLayer; });


/**
  <p>
    The SVG specification has no concept of layers. The 
    order in which elements are added to the image 
    dictate which ones will be shown over the others.
    This is impractical so this class attempts to 
    provide a workaround.
  </p>

  <p>
    Drawing will be first done on several layers. The
    elements in each of the layers will then be added
    to the SVG document layer per layer.
  </p>   
*/
class SVGLayer {

    /**
      Creates a new SVGLayer instance.

      @param {SVG} svg - The root SVG document.
    */
    constructor(svg) {
        this.svg = svg
        this.defs = [ ]
    }

    /**
      Adds a group to the layer.

      @returns {SVG.G} An SVG.G element as decribed in {@link http://svgjs.com/parents/#svg-g}
    */
    group() {
        let groupDef = this.svg.defs().group()
        this.defs.push(groupDef)
        return groupDef
    }

    /**
      Adds a line to the layer.

      @returns {SVG.Line} An SVG.Line element as decribed in {@link http://svgjs.com/elements/#svg-line}
    */
    line(x1, y1, x2, y2) {
        let lineDef = this.svg.defs().line(x1, y1, x2, y2)
        this.defs.push(lineDef)
        return lineDef
    }

    /**
      Adds a rectangle to the layer.

      @returns {SVG.Rect} An SVG.Rect element as decribed in {@link http://svgjs.com/elements/#svg-rect}
    */
    rect(width, height) {
        let rectDef = this.svg.defs().rect(width, height)
        this.defs.push(rectDef)
        return rectDef
    }

    /**
      Adds a text element to the layer.

      @returns {SVG.Text} An SVG.Text element as decribed in {@link http://svgjs.com/elements/#svg-text}
    */
    text(str) { 
        let textDef = this.svg.defs().text(str)
        this.defs.push(textDef)
        return textDef
    }

    /**
      Writes the layer to the SVG document. This should be the final
      action performed on the layer. In the current implementation there
      is no way to undo the write.
    */
    write() {
        let self = this
        self.defs.forEach(function(def) {
            def.clone(self.svg)
            def.remove()
        })
    }

    /**
      Merges the contents of another layer into this layer.
      The other layer should not be used afterwards.

      @param {SVGLayer} layer - The contents of this layer will be merged
        into this one.
    */
    merge(layer) {
        this.defs = this.defs.concat(layer.defs)
    }

    /**
      Remove all contents of the layer. Note that this doesn't
      remove elements that have been written to the SVG document
      already.
    */
    clear() {
        let self = this
        self.defs.forEach(function(def) {
            def.remove()
        })
        self.defs.length = 0
    }
}




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SVGLayerSet; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SVGLayer_js__ = __webpack_require__(3);




/**
  <p>
    A set of layers.
  </p>
*/
class SVGLayerSet {

    /**
      Creates a new SVGLayerSet instance.

      @param {SVG} svg - The root SVG document.
    */
    constructor(svg) {
        this.svg = svg
        this.layers = { }
    }

    /**
      Gets a layer.

      @param {string} name - The name of the layer.
      @returns {SVGLayer|null} The layer or null if no layer
        with such name exists.
    */
    getLayer(name) {
        return this.layers[name]
    }

    /**
      Creates a new layer.

      @param {string} name - The name of the layer.
      @returns {SVGLayer} The new layer.
    */
    createLayer(name) {
        let newLayer = new __WEBPACK_IMPORTED_MODULE_0__SVGLayer_js__["a" /* SVGLayer */](this.svg)
        this.layers[name] = newLayer
        return newLayer
    }

    /**
      Merge another set into this one. Layers
      with the same name will be merged together
      with the elements of the set given as argument
      being appended.

      @param {SVGLayerSet} layerSet - The other layer set.
    */
    merge(layerSet) {
        let self = this
        let keys = Object.keys(self.layers)
        keys.forEach(function(key) {
            self.layers[key].merge(layerSet.layers[key])
        })
    }

    /**
      Calls {@link SVGLayer#clear} on each layer in the set.
    */
    clearEachLayer() {
        let self = this
        let keys = Object.keys(self.layers)
        keys.forEach(function(key) {
            self.layers[key].clear()
        })
    }
}




/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Actor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DiagramElement_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ConnectionPoint_js__ = __webpack_require__(1);





/**
  An actor on a use case diagram.

  @extends DiagramElement
*/
class Actor extends __WEBPACK_IMPORTED_MODULE_0__DiagramElement_js__["a" /* DiagramElement */] {

    constructor(svg, id, actorDescription) {
        super(svg)
        this.shapeLayer = this.layers.createLayer("shape")
        this.textLayer = this.layers.createLayer("text")
        this.id = id
        this.actorDescription = actorDescription
    }

    createConnectionPoint(svg) {
        let newPoint = new __WEBPACK_IMPORTED_MODULE_1__ConnectionPoint_js__["a" /* ConnectionPoint */](svg, this)
        return newPoint
    }

    update() {
        let borderAdjustment = {
            top: this.y,
            left: this.x
        }
        
        let shapeGroup = this.shapeLayer.group().addClass("UMLActor")
        let textGroup = this.textLayer.group()
        let textDef = textGroup.text(this.actorDescription.name).move(borderAdjustment.left, borderAdjustment.top + 35)
        let width = textDef.bbox().width
        let offset = ((width - 16) / 2)
        shapeGroup.circle(12).move(borderAdjustment.left + 2 + offset, borderAdjustment.top + 1)
        shapeGroup.line(borderAdjustment.left + 8 + offset, borderAdjustment.top + 13, borderAdjustment.left + 8 + offset, borderAdjustment.top + 26)
        shapeGroup.line(borderAdjustment.left + offset, borderAdjustment.top + 18, borderAdjustment.left + 16 + offset, borderAdjustment.top + 18)
        shapeGroup.line(borderAdjustment.left + 8 + offset, borderAdjustment.top + 26, borderAdjustment.left + offset, borderAdjustment.top + 33)
        shapeGroup.line(borderAdjustment.left + 8 + offset, borderAdjustment.top + 26, borderAdjustment.left + 16 + offset, borderAdjustment.top + 33)

        this.uptodate = true
    }
}




/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClassBox; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DiagramElement_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SVGLayerSet_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ConnectionPoint_js__ = __webpack_require__(1);






/** 
  A class box. 

  @extends DiagramElement
  @property {ConnectionPoint[]} this.connectionPoints - The class
    keeps a list of connection points where other elements are 
    connected so they can be notified of relevant changes to the
    class box.
*/
class ClassBox extends __WEBPACK_IMPORTED_MODULE_0__DiagramElement_js__["a" /* DiagramElement */] {

    constructor(svg, id, classDescription, canMove, style) {
        super(svg)
        this.shapeLayer = this.layers.createLayer("shape")
        this.textLayer = this.layers.createLayer("text")
        this.id = id
        this.classDescription = classDescription
        this.canMove = canMove
        this.style = style
        this.connectionPointsRectangle = null

        // List of connection points that are connected to
        // this class box
        this.connectionPoints = [ ]
    }

    /**
      Returns a connection point that can be used to connect
      a connector to this class box. The new connection
      point is added to this.connectionPoints.
    */
    createConnectionPoint(svg) {
        let newPoint = new __WEBPACK_IMPORTED_MODULE_2__ConnectionPoint_js__["a" /* ConnectionPoint */](svg, this)
        this.connectionPoints.push(newPoint)
        return newPoint
    }

    update() {
        createDef(this, this.classDescription, this.canMove, this.style)
        this.uptodate = true
    }

    doGetConnectionPointsRectangle() {
        return this.connectionPointsRectangle 
    }
        
    fire(evt) {
        if (evt == "positionchanged") {
            for (let i = 0; i < this.connectionPoints.length; i++) {
                this.connectionPoints[i].draw()        
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
        top: self.y + 1,
        left: self.x + 1
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
    
    let rect = classGroup.rect(currentDimensions.width, currentDimensions.height).move(borderAdjustment.left, borderAdjustment.top)
    classGroup.line(borderAdjustment.left, borderAdjustment.top + line1YPos, borderAdjustment.left + currentDimensions.width, borderAdjustment.top + line1YPos)
    classGroup.line(borderAdjustment.left, borderAdjustment.top + line2YPos, borderAdjustment.left + currentDimensions.width, borderAdjustment.top + line2YPos)

    self.connectionPointsRectangle = rect.bbox()

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




/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Component; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DiagramElement_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BallConnector_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SocketConnector_js__ = __webpack_require__(19);






class Stereotype {

    constructor(svgParentGroup) {
        this.svgParentGroup = svgParentGroup
        this.x = 0
        this.y = 0
        this.width = 15
        this.height = 20
    }

    move(x, y) {
        this.x = x
        this.y = y
    }

    draw() {
        let stereoTypeGroup = this.svgParentGroup.group().addClass("UMLComponentStereotype")
        stereoTypeGroup.rect(11, 15).move(4 + this.x, this.y)
        stereoTypeGroup.rect(8, 3).move(this.x, this.y + 3)
        stereoTypeGroup.rect(8, 3).move(this.x, this.y + 9)
    }

}

class Component extends __WEBPACK_IMPORTED_MODULE_0__DiagramElement_js__["a" /* DiagramElement */] {

    constructor(svg, componentDescription, style, layout) {
        super(svg)
        this.shapeLayer = this.layers.createLayer("shape")
        this.textLayer = this.layers.createLayer("text")
        this.componentDescription = componentDescription
        this.ballConnectors = [ ]
        this.socketConnectors = [ ]

        var componentWithConnectorsGroup = svg.group().addClass("UMLComponent")

        let offset = 0
        if (componentDescription.interfaces) {
            for (let i = 0; i < componentDescription.interfaces.length; i++) {
                let ballConnector = new __WEBPACK_IMPORTED_MODULE_1__BallConnector_js__["a" /* BallConnector */](svg.defs(), componentWithConnectorsGroup, componentDescription.interfaces[i].name)
                this.ballConnectors.push(ballConnector)
                offset = Math.max(offset, ballConnector.width)
            }
        }
        if (componentDescription.dependencies) {
            for (let i = 0; i < componentDescription.dependencies.length; i++) {
                let socketConnector = new __WEBPACK_IMPORTED_MODULE_2__SocketConnector_js__["a" /* SocketConnector */](svg.defs(), componentWithConnectorsGroup, componentDescription.dependencies[i].name)
                this.socketConnectors.push(socketConnector)
            }
        }

        var componentGroup = componentWithConnectorsGroup.group()

        let position = {
            x: 0,
            y: 0
        }

        if ((layout != null) && layout.componentpositions[componentDescription.name]) {
            position = layout.componentpositions[componentDescription.name]
        }

        let currentDimensions = {
            width: 0,
            height: 0
        }

        currentDimensions.height = style.getTopMargin("component")

        let stereotype = new Stereotype(componentGroup)
        currentDimensions.height += stereotype.height

        var componentNameDef = componentGroup.defs().text(componentDescription.name).addClass("UMLComponentName").move(position.x + offset + style.getLeftMargin("component"), position.y + currentDimensions.height)
        currentDimensions.width = Math.max(currentDimensions.width, componentNameDef.bbox().width)
        currentDimensions.height += (componentNameDef.bbox().height + style.getBottomMargin("component"))

        currentDimensions.width += (style.getLeftMargin("component") + style.getRightMargin("component"))
    
        componentGroup.rect(currentDimensions.width, currentDimensions.height).move(position.x + offset, position.y)
        stereotype.move(position.x + offset + (currentDimensions.width - style.getRightMargin("component") - stereotype.width), position.y + style.getTopMargin("component"))
        stereotype.draw()
        componentGroup.use(componentNameDef)

        // Offset by 1 to leave some space because the border stroke width is 2
        componentGroup.move(1, 1)

        for (let i = 0; i < this.ballConnectors.length; i++) {
            this.ballConnectors[i].moveConnectionPoint(position.x, position.y + currentDimensions.height/2)
            this.ballConnectors[i].draw()
        }

        for (let i = 0; i < this.socketConnectors.length; i++) {
            this.socketConnectors[i].moveConnectionPoint(position.x + currentDimensions.width + offset, position.y + currentDimensions.height/2)
            this.socketConnectors[i].draw()
        }
    }

    getBallConnectionPoint(name) {
        for (let i = 0; i < this.ballConnectors.length; i++) {
            return this.ballConnectors[i].getAssemblyConnectionPoint()
        }
    }

    getSocketConnectionPoint(name) {
        for (let i = 0; i < this.socketConnectors.length; i++) {
            return this.socketConnectors[i].getAssemblyConnectionPoint()
        }
    }

}




/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Connector; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DiagramElement_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ConnectionPointPosition_js__ = __webpack_require__(2);





/**
  Represents a connector between elements.

  @extends DiagramElement
*/
class Connector extends __WEBPACK_IMPORTED_MODULE_0__DiagramElement_js__["a" /* DiagramElement */] {

    constructor(svg, type, connectionPoint1, connectionPoint2, text) {
        super(svg)
        this.shapeLayer = this.layers.createLayer("shape")
        this.textLayer = this.layers.createLayer("text")
        this.type = type
        this.connectionPoint1 = connectionPoint1
        this.connectionPoint2 = connectionPoint2
        this.text = text
        this.height = 30
    }

    getHeight() {
        if (!this.uptodate) {
            this.update()
        }
        return this.height
    }

    update() {
        if (this.type == "inheritance") {
            let lineGroup = this.shapeLayer.group().addClass("UMLInheritanceRelationship")
            drawInheritanceRelationship(lineGroup, this.connectionPoint1, this.connectionPoint2)
        } else if (this.type == "composition") {
            let lineGroup = this.shapeLayer.group().addClass("UMLCompositionRelationship")
            drawCompositionOrAggregationRelationship(lineGroup, this.connectionPoint1, this.connectionPoint2)
        } else if (this.type == "aggregation") {
            let lineGroup = this.shapeLayer.group().addClass("UMLAggregationRelationship")
            drawCompositionOrAggregationRelationship(lineGroup, this.connectionPoint1, this.connectionPoint2)
        } else if (this.type == "synchronousmessage") {
            let lineGroup = this.shapeLayer.group().addClass("UMLSynchronousMessage")
            let textGroup = null
            if ((this.text != null) && (this.text != "")) {
                textGroup = this.textLayer.group()
            }
            drawSynchronousMessage(lineGroup, textGroup, this.connectionPoint1, this.connectionPoint2, this.text)
        } else if (this.type == "returnmessage") {
            let lineGroup = this.shapeLayer.group().addClass("UMLReturnMessage")
            drawReturnMessage(lineGroup, this.connectionPoint1, this.connectionPoint2)
        } else if (this.type == "usecaseassociation") {
            let lineGroup = this.shapeLayer.group().addClass("UMLUseCaseAssociation")
            drawUseCaseAssociation(lineGroup, this.connectionPoint1, this.connectionPoint2)
        }
        this.uptodate = true
    }

}

// Draws an inheritance connector between two classes
function drawInheritanceRelationship(lineGroup, connectionPoint1, connectionPoint2) {
    let connectorOrientation = getConnectorHeadOrientationFromPosition(connectionPoint2.position)
    let lineConnectionPoint = getInheritanceArrowLineConnectionPoint(connectionPoint2, connectorOrientation)
    drawConnectorLine(lineGroup, connectionPoint1, lineConnectionPoint, connectorOrientation)
    drawInheritanceArrow(lineGroup, connectionPoint2, connectorOrientation)
}

// Draws a composition connector between two classes
function drawCompositionOrAggregationRelationship(lineGroup, connectionPoint1, connectionPoint2) {
    let connectorOrientation = getConnectorHeadOrientationFromPosition(connectionPoint2.position)
    let lineConnectionPoint = getDiamondLineConnectionPoint(connectionPoint2, connectorOrientation)
    drawConnectorLine(lineGroup, connectionPoint1, lineConnectionPoint, connectorOrientation)
    drawDiamond(lineGroup, connectionPoint2, connectorOrientation)
}

function drawSynchronousMessage(lineGroup, textGroup, connectionPoint1, connectionPoint2, text) {
    if (connectionPoint1.x != connectionPoint2.x) {
        if ((textGroup != null) && (text != null) && (text != "")) {
            let textElement = textGroup.text(text)
            
            let width = (connectionPoint2.x - connectionPoint1.x)
            if (textElement.bbox().width < width) {
                textElement.move((connectionPoint1.x + ((width - textElement.bbox().width) / 2)), connectionPoint1.y - textElement.bbox().height + 2)
            } else {
                textElement.move(connectionPoint1.x + 2, connectionPoint1.y - 6 - textElement.bbox().height + 2)
            }
        }

        lineGroup.line(connectionPoint1.x, connectionPoint1.y, connectionPoint2.x - 12, connectionPoint2.y)
        let polygonDescription = "" + (connectionPoint2.x - 12) + "," + (connectionPoint2.y - 6) + " " +
            connectionPoint2.x + "," + connectionPoint2.y + " " +
            (connectionPoint2.x - 12) + "," + (connectionPoint2.y + 6)
        lineGroup.polygon(polygonDescription)
    } else {
        if ((textGroup != null) && (text != null) && (text != "")) {
            let textElement = textGroup.text(text)
            textElement.move(connectionPoint1.x + 8, connectionPoint1.y - textElement.bbox().height - 3)
        }

        lineGroup.line(connectionPoint1.x, connectionPoint1.y, connectionPoint1.x + 30, connectionPoint1.y)
        lineGroup.line(connectionPoint1.x + 30, connectionPoint1.y, connectionPoint2.x + 30, connectionPoint2.y)
        lineGroup.line(connectionPoint2.x + 30, connectionPoint2.y, connectionPoint2.x + 12, connectionPoint2.y)
        let polygonDescription = "" + connectionPoint2.x + "," + connectionPoint2.y + " " +
            (connectionPoint2.x + 12) + "," + (connectionPoint2.y - 6) + " " +
            (connectionPoint2.x + 12) + "," + (connectionPoint2.y + 6)
        lineGroup.polygon(polygonDescription)
    }
}

function drawReturnMessage(lineGroup, connectionPoint1, connectionPoint2) {
    lineGroup.line(connectionPoint1.x, connectionPoint1.y, connectionPoint2.x, connectionPoint1.y).attr("stroke-dasharray", "4, 4")
    if (connectionPoint2.x >= connectionPoint1.x) {
        lineGroup.line(connectionPoint2.x, connectionPoint1.y, connectionPoint2.x - 10, connectionPoint2.y - 6)
        lineGroup.line(connectionPoint2.x, connectionPoint1.y, connectionPoint2.x - 10, connectionPoint2.y + 6)
    } else {
        lineGroup.line(connectionPoint2.x, connectionPoint1.y, connectionPoint2.x + 10, connectionPoint2.y - 6)
        lineGroup.line(connectionPoint2.x, connectionPoint1.y, connectionPoint2.x + 10, connectionPoint2.y + 6)
    }
}

function drawUseCaseAssociation(lineGroup, connectionPoint1, connectionPoint2) {
    lineGroup.line(connectionPoint1.x, connectionPoint1.y, connectionPoint2.x, connectionPoint2.y)
}

// Orientation of the head (e.g. arrow or diamond)
// of a connector
var ConnectorHeadOrientation = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3
}

// Get the orientiation of the head of the connector
// based on where the connector is connected
function getConnectorHeadOrientationFromPosition(position) {
    switch (position) {
        case __WEBPACK_IMPORTED_MODULE_1__ConnectionPointPosition_js__["a" /* ConnectionPointPosition */].TopCenter:
            return ConnectorHeadOrientation.Down
        case __WEBPACK_IMPORTED_MODULE_1__ConnectionPointPosition_js__["a" /* ConnectionPointPosition */].RightCenter:
            return ConnectorHeadOrientation.Left
        case __WEBPACK_IMPORTED_MODULE_1__ConnectionPointPosition_js__["a" /* ConnectionPointPosition */].BottomCenter:
            return ConnectorHeadOrientation.Up
        case __WEBPACK_IMPORTED_MODULE_1__ConnectionPointPosition_js__["a" /* ConnectionPointPosition */].LeftCenter:
            return ConnectorHeadOrientation.Right
    }
}

function getInheritanceArrowLineConnectionPoint(position, orientation) {
    let lineConnectionPoint = { x: 0, y: 0 }
    switch (orientation) {
        case ConnectorHeadOrientation.Right:
            lineConnectionPoint = { x: (position.x - 12), y: position.y }
            break

        case ConnectorHeadOrientation.Left:
            lineConnectionPoint = { x: (position.x + 12), y: position.y }
            break
            
        case ConnectorHeadOrientation.Up:
            lineConnectionPoint = { x: position.x, y: (position.y + 12) }
            break

        case ConnectorHeadOrientation.Down:
            lineConnectionPoint = { x: position.x, y: (position.y - 12) }
            break
    }
            
    return lineConnectionPoint
}

// Draws an arrow for an inheritance relationship. The arrow's tip
// is at the position gives as argument.
// It returns the point to which the line of the connector should
// be connected.
function drawInheritanceArrow(svg, position, orientation) {
    let secondPoint = { x: 0, y: 0 }
    let thirdPoint = { x: 0, y: 0 }
    switch (orientation) {
        case ConnectorHeadOrientation.Right:
            secondPoint = { x: (position.x - 12), y: (position.y - 10) }
            thirdPoint = { x: (position.x - 12), y: (position.y + 10) }
            break

        case ConnectorHeadOrientation.Left:
            secondPoint.x = (position.x + 12)
            secondPoint.y = (position.y - 10)
            thirdPoint.x = (position.x + 12)
            thirdPoint.y = (position.y + 10)    
            break
            
        case ConnectorHeadOrientation.Up:
            secondPoint.x = (position.x - 10)
            secondPoint.y = (position.y + 12)
            thirdPoint.x = (position.x + 10)
            thirdPoint.y = (position.y + 12)
            break

        case ConnectorHeadOrientation.Down:
            secondPoint.x = (position.x - 10)
            secondPoint.y = (position.y - 12)
            thirdPoint.x = (position.x + 10)
            thirdPoint.y = (position.y - 12)
            break
    }
            
    let polygonDescription = "" + position.x + "," + position.y + " " +
        secondPoint.x + "," + secondPoint.y + " " +
        thirdPoint.x + "," + thirdPoint.y                
    svg.polygon(polygonDescription)
}

function getDiamondLineConnectionPoint(position, orientation) {
    let thirdPoint = { x: 0, y: 0 }
    switch (orientation) {
        case ConnectorHeadOrientation.Right:
            thirdPoint = { x: (position.x - 20), y: position.y }
            break

        case ConnectorHeadOrientation.Left:
            thirdPoint = { x: (position.x + 20), y: position.y }
            break

        case ConnectorHeadOrientation.Up:
            thirdPoint = { x: position.x, y: (position.y + 20) }
            break

        case ConnectorHeadOrientation.Down:
            thirdPoint = { x: position.x, y: (position.y - 20) }
            break
    }

    return thirdPoint
}

// Draws a diamond for an inheritance relationship. The arrow's tip
// is at the position gives as argument.
// It returns the point to which the line of the connector should
// be connected.
function drawDiamond(svg, position, orientation) {
    let secondPoint = { x: 0, y: 0 }
    let thirdPoint = { x: 0, y: 0 }
    let fourthPoint = { x: 0, y: 0 }
    switch (orientation) {
        case ConnectorHeadOrientation.Right:
            secondPoint = { x: (position.x - 10), y: (position.y - 8) }
            thirdPoint = { x: (position.x - 20), y: position.y }
            fourthPoint = { x: (position.x - 10), y: (position.y + 8) }
            break

        case ConnectorHeadOrientation.Left:
            secondPoint = { x: (position.x + 10), y: (position.y - 8) }
            thirdPoint = { x: (position.x + 20), y: position.y }
            fourthPoint = { x: (position.x + 10), y: (position.y + 8) }
            break

        case ConnectorHeadOrientation.Up:
            secondPoint = { x: (position.x + 8), y: (position.y + 10) }
            thirdPoint = { x: position.x, y: (position.y + 20) }
            fourthPoint = { x: (position.x - 8), y: (position.y + 10) }
            break

        case ConnectorHeadOrientation.Down:
            secondPoint = { x: (position.x + 8), y: (position.y - 10) }
            thirdPoint = { x: position.x, y: (position.y - 20) }
            fourthPoint = { x: (position.x - 8), y: (position.y - 10) }
            break
    }

    let polygonDescription = "" + position.x + "," + position.y + " " +
        secondPoint.x + "," + secondPoint.y + " " +
        thirdPoint.x + "," + thirdPoint.y + " " +
        fourthPoint.x + "," + fourthPoint.y
    svg.polygon(polygonDescription)
}

function drawConnectorLine(svg, startPoint, endPoint, orientation) {
    switch (orientation) {
        case ConnectorHeadOrientation.Up:
        case ConnectorHeadOrientation.Down:
            if (endPoint.x == startPoint.x) {
                svg.line(startPoint.x, startPoint.y, endPoint.x, endPoint.y)
            } else {
                let middleY = (endPoint.y + ((startPoint.y - endPoint.y)/2))
                svg.line(startPoint.x, startPoint.y, startPoint.x, middleY)
                svg.line(startPoint.x, middleY, endPoint.x, middleY)
                svg.line(endPoint.x, middleY, endPoint.x, endPoint.y)                 
            }
            break

        case ConnectorHeadOrientation.Left:
        case ConnectorHeadOrientation.Right:
            if (endPoint.y == startPoint.y) {
                svg.line(startPoint.x, startPoint.y, endPoint.x, endPoint.y)
            } else {
                let middleX = (endPoint.x + ((startPoint.x - endPoint.x)/2))
                svg.line(startPoint.x, startPoint.y, middleX, startPoint.y)
                svg.line(middleX, startPoint.y, middleX, endPoint.y)
                svg.line(middleX, endPoint.y, endPoint.x, endPoint.y)
            }
            break
    }
}




/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConnectionPointPosition_js__ = __webpack_require__(2);




/** Sets the position of the elements on the diagram. */
class LayoutManager {

    constructor(layout) {
        this.layout = layout
        if (this.layout == null) {
            this.layout = { }
        }
        if (this.layout.elements == null) {
            this.layout.elements = { }
        }
        if (this.layout.lifelinepositions == null) {
            this.layout.lifelinepositions = { }
        }
        if (this.layout.connectorpositions == null) {
            this.layout.connectorpositions = { }
        }
    }

    setElementPosition(element) {
        if (this.layout.elements[element.id]) {
            element.move(this.layout.elements[element.id].x, this.layout.elements[element.id].y)
        } else if (this.layout.lifelinepositions[element.id]) {
            element.move(this.layout.lifelinepositions[element.id].x, this.layout.lifelinepositions[element.id].y)
        }
    }

    layoutConnectors(connectors) {
        for (var i = 0; i < connectors.length; i++) {
            let connectionPoint1 = connectors[i].connectionPoint1
            let connectionPoint2 = connectors[i].connectionPoint2
            let bbox1 = connectionPoint1.element.getConnectionPointsRectangle()
            let bbox2 = connectionPoint2.element.getConnectionPointsRectangle()
            let connectionPositions = this.getConnectionPositions(bbox1, bbox2)

            let layoutOverride = this.layout.elements[connectionPoint1.element.classDescription.name + "-" + connectionPoint2.element.classDescription.name + "-aggregation"];
            if (layoutOverride) {
                if (layoutOverride.end) {
                    if (layoutOverride.end == "right-center") {
                        connectionPositions.end = __WEBPACK_IMPORTED_MODULE_0__ConnectionPointPosition_js__["a" /* ConnectionPointPosition */].RightCenter
                    }
                }
            }

            connectionPoint1.setPosition(connectionPositions.start)
            connectionPoint2.setPosition(connectionPositions.end)
        }
    }

    layoutMessages(lifelines, connectors) {
        let nextYPosition = 0
        for (var i = 0; i < lifelines.length; i++) {
            nextYPosition = Math.max(nextYPosition, lifelines[i].getLineTopPosition().y + 20)
        }
        for (var i = 0; i < connectors.length; i++) {
            let connector = connectors[i]
            let lifeline1 = connector.connectionPoint1.element
            let lifeline2 = connector.connectionPoint2.element
            if (lifeline1 != lifeline2) {
                if (lifeline2.x >= lifeline1.x) {
                    connector.connectionPoint1.move(lifeline1.getLineTopPosition().x + (lifeline1.getActiveLineWidth() / 2), nextYPosition)
                    connector.connectionPoint2.move(lifeline2.getLineTopPosition().x - (lifeline2.getActiveLineWidth() / 2), nextYPosition)
                } else {
                    connector.connectionPoint1.move(lifeline1.getLineTopPosition().x - (lifeline1.getActiveLineWidth() / 2), nextYPosition)
                    connector.connectionPoint2.move(lifeline2.getLineTopPosition().x + (lifeline2.getActiveLineWidth() / 2), nextYPosition)
                }
                nextYPosition += connector.getHeight()
            } else {
                connector.connectionPoint1.move(lifeline1.getLineTopPosition().x + (lifeline1.getActiveLineWidth() / 2), nextYPosition)
                connector.connectionPoint2.move(lifeline2.getLineTopPosition().x + (lifeline2.getActiveLineWidth() / 2), nextYPosition + 20)
                nextYPosition += connector.getHeight()
            }
        }
        if (connectors.length > 0) {
            for (var i = 0; i < lifelines.length; i++) {
                lifelines[i].uptodate = false
            }
        }
    }

    getConnectionPositions(boundingbox1, boundingbox2) {
        let result = { 
            start: __WEBPACK_IMPORTED_MODULE_0__ConnectionPointPosition_js__["a" /* ConnectionPointPosition */].TopCenter,
            end: __WEBPACK_IMPORTED_MODULE_0__ConnectionPointPosition_js__["a" /* ConnectionPointPosition */].TopCenter
        }

        if ((boundingbox2.y + boundingbox2.height) < boundingbox1.y) {
            result.start = __WEBPACK_IMPORTED_MODULE_0__ConnectionPointPosition_js__["a" /* ConnectionPointPosition */].TopCenter
            result.end = __WEBPACK_IMPORTED_MODULE_0__ConnectionPointPosition_js__["a" /* ConnectionPointPosition */].BottomCenter
        } else if ((boundingbox1.y + boundingbox1.height) < boundingbox2.y) {
            result.start = __WEBPACK_IMPORTED_MODULE_0__ConnectionPointPosition_js__["a" /* ConnectionPointPosition */].BottomCenter
            result.end = __WEBPACK_IMPORTED_MODULE_0__ConnectionPointPosition_js__["a" /* ConnectionPointPosition */].TopCenter
        } else if ((boundingbox2.x + boundingbox2.width) < boundingbox1.x) {
            result.start = __WEBPACK_IMPORTED_MODULE_0__ConnectionPointPosition_js__["a" /* ConnectionPointPosition */].LeftCenter
            result.end = __WEBPACK_IMPORTED_MODULE_0__ConnectionPointPosition_js__["a" /* ConnectionPointPosition */].RightCenter
        } else if ((boundingbox1.x + boundingbox1.width) < boundingbox2.x) {
            result.start = __WEBPACK_IMPORTED_MODULE_0__ConnectionPointPosition_js__["a" /* ConnectionPointPosition */].RightCenter
            result.end = __WEBPACK_IMPORTED_MODULE_0__ConnectionPointPosition_js__["a" /* ConnectionPointPosition */].LeftCenter
        }

        return result
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LayoutManager;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Lifeline; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DiagramElement_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ConnectionPoint_js__ = __webpack_require__(1);





/**
  A lifeline on a sequence diagram.

  @extends DiagramElement
*/
class Lifeline extends __WEBPACK_IMPORTED_MODULE_0__DiagramElement_js__["a" /* DiagramElement */] {

    constructor(svg, id, lifelineDescription, style) {
        super(svg)
        this.shapeLayer = this.layers.createLayer("shape")
        this.textLayer = this.layers.createLayer("text")
        this.id = id
        this.lifelineDescription = lifelineDescription
        this.style = style

        this.lineTopPosition = { x: 0, y: 0 }
        
        // List of connection points that are connected to
        // this lifeline
        this.connectionPoints = [ ]
    }

    createConnectionPoint(svg) {
        let newPoint = new __WEBPACK_IMPORTED_MODULE_1__ConnectionPoint_js__["a" /* ConnectionPoint */](svg, this)
        this.connectionPoints.push(newPoint)
        return newPoint
    }

    getLineTopPosition() {
        if (!this.uptodate) {
            this.update()
        }
        return this.lineTopPosition
    }

    getActiveLineWidth() {
        return 8
    }

    update() {
        this.layers.clearEachLayer()
        createDef(this, this.lifelineDescription, this.style)
        this.uptodate = true
    }

}

function createDef(self, lifelineDescription, style) {
    var lifelineGroup = self.shapeLayer.group().addClass("UMLLifeline")

    let currentDimensions = { 
        width: 0,
        height: 0
    }

    let borderAdjustment = {
        top: self.y + 1,
        left: self.x + 1
    }
    
    currentDimensions.height = style.getTopMargin("lifeline")

    var instanceNameGroup = self.textLayer.group().addClass("UMLInstanceName")
    var instanceNameDef = instanceNameGroup.text(":" + lifelineDescription.name).move(borderAdjustment.left + style.getLeftMargin("lifeline"), borderAdjustment.top + currentDimensions.height)
    currentDimensions.width = Math.max(currentDimensions.width, instanceNameDef.bbox().width)
    currentDimensions.height += (instanceNameDef.bbox().height + style.getBottomMargin("lifeline"))

    currentDimensions.width += (style.getLeftMargin("lifeline") + style.getRightMargin("lifeline"))
    
    lifelineGroup.rect(currentDimensions.width, currentDimensions.height).move(borderAdjustment.left, borderAdjustment.top)

    self.lineTopPosition.x = (borderAdjustment.left + (currentDimensions.width / 2))
    self.lineTopPosition.y = (borderAdjustment.top + currentDimensions.height)

    if (self.connectionPoints.length > 0) {
        lifelineGroup.line(self.lineTopPosition.x, self.lineTopPosition.y, self.lineTopPosition.x, self.connectionPoints[0].y)
        if (self.connectionPoints.length > 1) {
            lifelineGroup
                .rect(8, (self.connectionPoints[self.connectionPoints.length - 1].y - self.connectionPoints[0].y))
                .move(self.lineTopPosition.x - 4, self.connectionPoints[0].y)
        }
    }
}




/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Settings; });


/**
  Diagram settings.

  @property {int} width - The width of the diagram in pixels.
  @property {height} height - The height of the diagram in pixels.
  @property {boolean} debug - If debug is true then additional checks
    and logging will be performed. This is false by default so that
    diagrams are displayed as well as possible regardless
    of errors. It is recommended to enable debug mode when updating a
    diagram and set it back to false afterwards.
*/
class Settings {    

    /** 
      Creates a new Settings instance with each property
      having a default value or the value specified in 
      the jsonSettings argument.
      @param {json=} jsonSettings - The initial settings.
      @param {int} [jsonSettings.width=600] - The width of the diagram.
      @param {int} [jsonSettings.height=200] - The height of the diagram.
      @param {boolean} [jsonSettings.debug=false] - Debug mode.
    */
    constructor(jsonSettings) {
        this.width = 600
        this.height = 200
        this.canMove = false
        this.canResize = false
        this.debug = false

        if (jsonSettings) {
            if (jsonSettings.width) {
                this.width = jsonSettings.width
            }
            if (jsonSettings.height) {
                this.height = jsonSettings.height
            }
            if (jsonSettings.interactive) {
                if (jsonSettings.interactive.canMove) {
                    this.canMove = jsonSettings.interactive.canMove
                }
            }
        }
    }

}




/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


/** Style settings. */
class Style {

    constructor() {
        this.style = {
            "defaults": {
                "margin-left": 12,
                "margin-right": 12,
                "margin-top": 9,
                "margin-bottom": 9
            },
            "lifeline": {
                "margin-left": 12,
                "margin-right": 12,
                "margin-top": 9,
                "margin-bottom": 9
            }
        }
    }

    getTopMargin(element) {
        return this.getValueOrDefault(this, element, "margin-top")
    }

    getBottomMargin(element) {
        return this.getValueOrDefault(this, element, "margin-bottom")
    }

    getLeftMargin(element) {
        return this.getValueOrDefault(this, element, "margin-left")
    }

    getRightMargin(element) {
        return this.getValueOrDefault(this, element, "margin-right")
    }

    getValueOrDefault(self, element, style) {
        if (self.style[element] && self.style[element][style]) {
            return self.style[element][style]
        } else {
            return self.style["defaults"][style]
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Style;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class UMLWebWidgetError extends Error {    
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UMLWebWidgetError;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UseCase; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DiagramElement_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ConnectionPoint_js__ = __webpack_require__(1);





/**
  A use case on a use case diagram.

  @extends DiagramElement
*/
class UseCase extends __WEBPACK_IMPORTED_MODULE_0__DiagramElement_js__["a" /* DiagramElement */] {

    constructor(svg, id, useCaseDescription) {
        super(svg)
        this.shapeLayer = this.layers.createLayer("shape")
        this.textLayer = this.layers.createLayer("text")
        this.id = id
        this.useCaseDescription = useCaseDescription
    }

    createConnectionPoint(svg) {
        let newPoint = new __WEBPACK_IMPORTED_MODULE_1__ConnectionPoint_js__["a" /* ConnectionPoint */](svg, this)
        return newPoint
    }

    update() {
        let borderAdjustment = {
            top: this.y,
            left: this.x
        }

        let shapeGroup = this.shapeLayer.group().addClass("UMLUseCase")
        let textGroup = this.textLayer.group()
        let textDef = textGroup.text(this.useCaseDescription.title)
        shapeGroup.ellipse(1.2*textDef.bbox().width, 3*textDef.bbox().height).move(borderAdjustment.left + 1, borderAdjustment.top + 1)
        textDef.move(borderAdjustment.left + 1 + 0.1*textDef.bbox().width, borderAdjustment.top + 1 + textDef.bbox().height)

        this.uptodate = true
    }

}




/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__UMLWebWidgetError_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Settings_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Style_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__LayoutManager_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ClassBox_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Component_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Lifeline_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Node_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Actor_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__UseCase_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Connector_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__AssemblyConnector_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__SVGLayer_js__ = __webpack_require__(3);
















/**
  This class is the entry point for all the functionality provided
  by the CodeSmithy UMLWebWidget.
*/
class Diagram {

    constructor(settings) {
        this.settings = new __WEBPACK_IMPORTED_MODULE_1__Settings_js__["a" /* Settings */](settings)

        // The description of the UML diagram in JSON
        // format. This will then be parsed to create
        // the graphical form.
        this.diagramDescription = { }

        // The list of all UML class boxes present on the
        // diagram
        this.classboxes = { }

        // The list of all UML components present on the
        // diagram
        this.components = { }

        // The list of all UML lifelines present on the
        // diagram
        this.lifelines = { }

        // The list of all UML actors present on the
        // diagram
        this.actors = { }

        // The list of all UML use cases present on the
        // diagram
        this.usecases = { }
    }

    // Create a diagram from a div element in the HTML document.
    // The div element must contain a JSON object with the UML
    // diagram information. The contents of the div will be replaced
    // by the diagram.
    // - divId: this is the id of the div element to use, it should be the id
    //   without any '#' prefix.
    createFromDiv(divId, layout) {
        let jsonDiagramDescription = JSON.parse($('#' + divId).text())
        $('#' + divId).empty()
        var svg = SVG(divId).size(this.settings.width, this.settings.height)
        this.createFromJSON(svg, jsonDiagramDescription, layout)
    }

    createFromJSON(svg, jsonDiagramDescription, layout) {
        if (jsonDiagramDescription == null) {
            jsonDiagramDescription = { }
        }
        this.diagramDescription = jsonDiagramDescription
        let style = new __WEBPACK_IMPORTED_MODULE_2__Style_js__["a" /* Style */]()

        if (this.diagramDescription.elements) {
            this.drawDiagram(svg, this.diagramDescription.elements, style, layout)
        } else if (this.diagramDescription.componentdiagram) {
            this.drawComponentDiagram(svg, this.diagramDescription.componentdiagram, style, layout)
        } else if (this.diagramDescription.deploymentdiagram) {
            this.drawDeploymentDiagram(svg, this.diagramDescription.deploymentdiagram, style, layout)
        } else if (this.diagramDescription.usecasediagram) {
            this.drawUseCaseDiagram(svg, this.diagramDescription.usecasediagram, layout)
        }
    }

    drawDiagram(svg, description, style, layout) {
        let layoutManager = new __WEBPACK_IMPORTED_MODULE_3__LayoutManager_js__["a" /* LayoutManager */](layout)

        let classboxes = []
        let lifelines = []
        let connectors = []
        let messages = []

        // Construct the elements
        for (var i = 0; i < description.length; i++) {
            let item = description[i]
            if (item.class) {
                let className = item.class.name
                let newClassBox = new __WEBPACK_IMPORTED_MODULE_4__ClassBox_js__["a" /* ClassBox */](svg, className, item.class, this.settings.canMove, style)
                this.classboxes[className] = newClassBox
                classboxes.push(newClassBox)                
            } else if (item.lifeline) {
                let newLifeline = new __WEBPACK_IMPORTED_MODULE_6__Lifeline_js__["a" /* Lifeline */](svg, item.lifeline.name, item.lifeline, style)
                this.lifelines[item.lifeline.name] = newLifeline
                lifelines.push(newLifeline)
            } else if (item.relationship) {
                let classbox1
                let classbox2
                if (item.relationship.type == "inheritance") {
                    classbox1 = this.classboxes[item.relationship.derivedclass]
                    classbox2 = this.classboxes[item.relationship.baseclass] 
                } else if ((item.relationship.type == "composition") || (item.relationship.type == "aggregation")) {
                    classbox1 = this.classboxes[item.relationship.containedclass]
                    classbox2 = this.classboxes[item.relationship.containingclass]
                }
                let connectionPoint1 = classbox1.createConnectionPoint(svg)
                let connectionPoint2 = classbox2.createConnectionPoint(svg)
                let newConnector = new __WEBPACK_IMPORTED_MODULE_10__Connector_js__["a" /* Connector */](svg, item.relationship.type, connectionPoint1, connectionPoint2)
                connectors.push(newConnector)
            } else if (item.messages) {
                for (var j = 0; j < item.messages.length; j++) {
                    let message = item.messages[j]
                    let lifeline1
                    let lifeline2
                    let connectionPoint1
                    let connectionPoint2
                    let newConnector
                    if (message.synchronousmessage) {
                        lifeline1 = this.lifelines[message.synchronousmessage.caller]
                        lifeline2 = this.lifelines[message.synchronousmessage.callee]
                        connectionPoint1 = lifeline1.createConnectionPoint(svg)
                        connectionPoint2 = lifeline2.createConnectionPoint(svg)
                        newConnector = new __WEBPACK_IMPORTED_MODULE_10__Connector_js__["a" /* Connector */](svg, "synchronousmessage", connectionPoint1, connectionPoint2, message.synchronousmessage.name)
                    } else if (message.returnmessage) {
                        lifeline1 = this.lifelines[message.returnmessage.callee]
                        lifeline2 = this.lifelines[message.returnmessage.caller]
                        connectionPoint1 = lifeline1.createConnectionPoint(svg)
                        connectionPoint2 = lifeline2.createConnectionPoint(svg)
                        newConnector = new __WEBPACK_IMPORTED_MODULE_10__Connector_js__["a" /* Connector */](svg, "returnmessage", connectionPoint1, connectionPoint2, "")
                    }
                    messages.push(newConnector)
                }
            }
        }

        dolayout(layoutManager, classboxes, lifelines, connectors, messages)

        draw(classboxes, lifelines, connectors, messages)
    }

    drawComponentDiagram(svg, componentDiagram, style, layout) {
        for (var i = 0; i < componentDiagram.length; i++) {
            let item = componentDiagram[i]
            if (item.component) {
                this.components[item.component.name] = new __WEBPACK_IMPORTED_MODULE_5__Component_js__["a" /* Component */](svg, item.component, style, layout)
            } else if (item.assemblyconnector) {
                let consumerComponent = this.components[item.assemblyconnector.consumer]
                let providerComponent = this.components[item.assemblyconnector.provider]
                let newConnector = new __WEBPACK_IMPORTED_MODULE_11__AssemblyConnector_js__["a" /* AssemblyConnector */](svg)
                newConnector.move(consumerComponent.getSocketConnectionPoint("").x, consumerComponent.getSocketConnectionPoint("").y, providerComponent.getBallConnectionPoint("").x, providerComponent.getBallConnectionPoint("").y)
                newConnector.draw()
            }
        } 
    }

    drawDeploymentDiagram(svg, deploymentDiagram, style, layout) {
        for (var i = 0; i < deploymentDiagram.length; i++) {
            let item = deploymentDiagram[i]
            if (item.node) {
                new __WEBPACK_IMPORTED_MODULE_7__Node_js__["a" /* Node */](svg, item.node, style, layout)
            }
        }
    }

    drawUseCaseDiagram(svg, useCaseDiagram, layout) {
        let layoutManager = new __WEBPACK_IMPORTED_MODULE_3__LayoutManager_js__["a" /* LayoutManager */](layout)

        let actors = []
        let usecases = []

        for (var i = 0; i < useCaseDiagram.length; i++) {
            let item = useCaseDiagram[i]
            if (item.actor) {
                let newActor = new __WEBPACK_IMPORTED_MODULE_8__Actor_js__["a" /* Actor */](svg, item.actor.name, item.actor)
                this.actors[item.actor.name] = newActor
                actors.push(newActor)
            } else if (item.usecase) {
                let newUseCase = new __WEBPACK_IMPORTED_MODULE_9__UseCase_js__["a" /* UseCase */](svg, item.usecase.title, item.usecase)
                this.usecases[item.usecase.title] = newUseCase
                usecases.push(newUseCase)
            } else if (item.association) {
                let connectionPoint1 = this.actors[item.association.actor].createConnectionPoint(svg)
                let connectionPoint2 = this.usecases[item.association.usecase].createConnectionPoint(svg)
                let newConnector = new __WEBPACK_IMPORTED_MODULE_10__Connector_js__["a" /* Connector */](svg, "usecaseassociation", connectionPoint1, connectionPoint2)
                newConnector.getLayers().getLayer("shape").write()
                newConnector.getLayers().getLayer("text").write()
            }
        }

        if (actors != null) {
            for (var i = 0; i < actors.length; i++) {
               layoutManager.setElementPosition(actors[i])
            }
        }

        if (usecases != null) {
            for (var i = 0; i < usecases.length; i++) {
               layoutManager.setElementPosition(usecases[i])
            }
        }

        if (actors != null) {
            for (var i = 0; i < actors.length; i++) {
                let actor = actors[i]
                actor.getLayers().getLayer("shape").write()
                actor.getLayers().getLayer("text").write()
            }
        }

        if (usecases != null) {
            for (var i = 0; i < usecases.length; i++) {
                let usecase = usecases[i]
                usecase.getLayers().getLayer("shape").write()
                usecase.getLayers().getLayer("text").write()
            }
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Diagram;


function dolayout(layoutManager, classboxes, lifelines, connectors, messages) {
    if (classboxes != null) {
        for (var i = 0; i < classboxes.length; i++) {
            layoutManager.setElementPosition(classboxes[i])
        }
    }
    if (lifelines != null) {
        for (var i = 0; i < lifelines.length; i++) {
            layoutManager.setElementPosition(lifelines[i])
        }
    }
    if (connectors != null) {
        layoutManager.layoutConnectors(connectors)
    }
    if (messages != null) {
        layoutManager.layoutMessages(lifelines, messages)
    }
}

function draw(classboxes, lifelines, connectors, messages) {
    if (classboxes != null) {
        for (var i = 0; i < classboxes.length; i++) {
            let classbox = classboxes[i]
            classbox.getLayers().getLayer("shape").write()
            classbox.getLayers().getLayer("text").write()
        }
    }
    if (lifelines != null) {
        for (var i = 0; i < lifelines.length; i++) {
            let lifeline = lifelines[i]
            lifeline.getLayers().getLayer("shape").write()
            lifeline.getLayers().getLayer("text").write()
        }
    }
    for (var i = 0; i < connectors.length; i++) {
        let connector = connectors[i]
        connector.getLayers().getLayer("shape").write()
        connector.getLayers().getLayer("text").write()
    }
    for (var i = 0; i < messages.length; i++) {
        let connector = messages[i]
        connector.getLayers().getLayer("shape").write()
        connector.getLayers().getLayer("text").write()
    }
}


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class AssemblyConnector {

    constructor(svgParentGroup) {
        this.svgParentGroup = svgParentGroup
        this.startPoint = { x: 0, y: 0 }
        this.endPoint = { x: 0, y: 0 }
    }

    move(x1, y1, x2, y2) {
        this.startPoint = { x: x1, y: y1 }
        this.endPoint = { x: x2, y: y2 }
    }

    draw() {
        let assemblyConnectorGroup = this.svgParentGroup.group().addClass("UMLAssemblyConnector")
        assemblyConnectorGroup.line(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y).attr("stroke-dasharray", "8, 4")
        assemblyConnectorGroup.line(this.endPoint.x - 13, this.endPoint.y + 5, this.endPoint.x, this.endPoint.y)
        assemblyConnectorGroup.line(this.endPoint.x - 13, this.endPoint.y - 5, this.endPoint.x, this.endPoint.y)
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = AssemblyConnector;



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


var textDef = Symbol()

class BallConnector {

    constructor(svgDefs, svgParentGroup, text) {
        this.svgParentGroup = svgParentGroup
        this.x = 0
        this.y = 0
        this[textDef] = svgDefs.text(text).move(0, 0) 
        this.width = this[textDef].bbox().width + 5
    }

    // Move the connector so that the top left
    // corner of the bounding box is at position
    // (x, y)
    move(x, y) {
        this.x = x
        this.y = y
    }

    // Move the connector so that its connection
    // point is at position (x, y)
    moveConnectionPoint(x, y) {
        let connectorOffsetY = this[textDef].bbox().height + 6
        y -= connectorOffsetY
        this.move(x, y)
    }

    draw() {
        this.svgParentGroup.use(this[textDef]).move(this.x, this.y)
        this.svgParentGroup.circle(10).move(this.x + (this.width)/2 - 5, this.y + 22)
        this.svgParentGroup.line(this.x + 10 + (this.width)/2 - 5, this.y + 27, this.x + (this.width), this.y + 27)
    }

    getAssemblyConnectionPoint() {
        return { x: (this.x + (this.width / 2) - 4), y: this.y + this[textDef].bbox().height + 8 }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = BallConnector;



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Node {

    constructor(svg, nodeDescription, style, layout) {
        this.nodeDescription = nodeDescription
        
        var nodeGroup = svg.group().addClass("UMLNode")
    
        let currentDimensions = { 
            width: 0,
            height: 0
        }
    
        currentDimensions.height = style.getTopMargin("node")

        var nodeNameDef = svg.defs().text(nodeDescription.name).addClass("UMLNodeName").move(style.getLeftMargin("node"), currentDimensions.height)
        currentDimensions.width = Math.max(currentDimensions.width, nodeNameDef.bbox().width)
        currentDimensions.height += (nodeNameDef.bbox().height + style.getBottomMargin("node"))

        if (currentDimensions.width > nodeNameDef.bbox().width) {
            nodeNameDef.dx((currentDimensions.width - nodeNameDef.bbox().width)/2)
        }

        currentDimensions.width += (style.getLeftMargin("node") + style.getRightMargin("node"))
    
        nodeGroup.rect(currentDimensions.width, currentDimensions.height).move(0,0)
        nodeGroup.use(nodeNameDef)

        // Offset by 1 to leave some space because the border stroke width is 2
        nodeGroup.move(1,1)

        if (layout.nodes[nodeDescription.name]) {
            let position = layout.nodes[nodeDescription.name].position
            nodeGroup.move(position.x, position.y)
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Node;



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


var textDef = Symbol()

class SocketConnector {

    constructor(svgDefs, svgParentGroup, text) {
        this.svgParentGroup = svgParentGroup
        this.x = 0
        this.y = 0
        this[textDef] = svgDefs.text(text).move(0, 0)
        this.width = this[textDef].bbox().width + 5
    }

    // Move the connector so that the top left
    // corner of the bounding box is at position
    // (x, y)
    move(x, y) {
        this.x = x
        this.y = y
    }

    // Move the connector so that its connection
    // point is at position (x, y)
    moveConnectionPoint(x, y) {
        let connectorOffsetY = this[textDef].bbox().height + 6
        y -= connectorOffsetY
        this.move(x, y)
    }

    draw() {
        this.svgParentGroup.use(this[textDef]).move(this.x + 5, this.y)
        this.svgParentGroup.line(this.x, this.y + this[textDef].bbox().height + 8, this.x + (this.width / 2), this.y + this[textDef].bbox().height + 8)
        let clippath = this.svgParentGroup.clip()
        clippath.rect(10, 17).move(this.x + (this.width / 2) - 1, this.y + this[textDef].bbox().height, 0)
        this.svgParentGroup.circle(15).move(this.x + (this.width / 2), this.y + this[textDef].bbox().height + 1).clipWith(clippath)
    }

    getAssemblyConnectionPoint() {
        return { x: (this.x + (this.width / 2) - 1 + 10), y: this.y + this[textDef].bbox().height + 8 }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = SocketConnector;



/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__UMLWebWidgetError_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Settings_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Style_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Diagram_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ConnectionPoint_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ConnectionPointPosition_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__DiagramElement_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Connector_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__LayoutManager_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ClassBox_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Lifeline_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Actor_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__UseCase_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Component_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__SVGLayer_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__SVGLayerSet_js__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "UMLWebWidgetError", function() { return __WEBPACK_IMPORTED_MODULE_0__UMLWebWidgetError_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Settings", function() { return __WEBPACK_IMPORTED_MODULE_1__Settings_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Style", function() { return __WEBPACK_IMPORTED_MODULE_2__Style_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Diagram", function() { return __WEBPACK_IMPORTED_MODULE_3__Diagram_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "DiagramElement", function() { return __WEBPACK_IMPORTED_MODULE_6__DiagramElement_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Connector", function() { return __WEBPACK_IMPORTED_MODULE_7__Connector_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectionPoint", function() { return __WEBPACK_IMPORTED_MODULE_4__ConnectionPoint_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectionPointPosition", function() { return __WEBPACK_IMPORTED_MODULE_5__ConnectionPointPosition_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutManager", function() { return __WEBPACK_IMPORTED_MODULE_8__LayoutManager_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ClassBox", function() { return __WEBPACK_IMPORTED_MODULE_9__ClassBox_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Lifeline", function() { return __WEBPACK_IMPORTED_MODULE_10__Lifeline_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Actor", function() { return __WEBPACK_IMPORTED_MODULE_11__Actor_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "UseCase", function() { return __WEBPACK_IMPORTED_MODULE_12__UseCase_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return __WEBPACK_IMPORTED_MODULE_13__Component_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SVGLayer", function() { return __WEBPACK_IMPORTED_MODULE_14__SVGLayer_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SVGLayerSet", function() { return __WEBPACK_IMPORTED_MODULE_15__SVGLayerSet_js__["a"]; });






















/***/ })
/******/ ]);
});
'use strict'

var window = require("svgdom")
var SVG = require("svg.js")(window)
var UMLWebWidget = require("../dist/codesmithy-umlwebwidget.node.dev.js")
var tf = require("ishiko-test-framework")
var TestUtils = require("./TestUtils.js")

module.exports = function(theTestHarness) {
    let classboxSequence = theTestHarness.appendTestSequence("ClassBox tests")

    TestUtils.createDirectory(__dirname + "/output/classboxtests")

    new tf.FunctionBasedTest("Creation test 1", ClassBoxCreationTest1, classboxSequence)

    new tf.FileComparisonTest("getLayers test 1", ClassBoxGetLayersTest1, classboxSequence)
    new tf.FileComparisonTest("getLayers test 2", ClassBoxGetLayersTest2, classboxSequence)

    new tf.FileComparisonTest("move test 1", ClassBoxMoveTest1, classboxSequence)

    new tf.FunctionBasedTest("getConnectionPointsRectangle test 1", ClassBoxGetConnectionPointsRectangleTest1,
        classboxSequence)
}

function ClassBoxCreationTest1(resolve) {
    let svg = SVG(window.document.createElement("div"))
    let classDescription = {
        "name": "MyClass",
        "attributes":
            [
            ],
        "operations":
            [
            ]
    }
    let style = new UMLWebWidget.Style()
    let classbox = new UMLWebWidget.ClassBox(svg, classDescription.name, classDescription, false, style)
    resolve(tf.TestResultOutcome.ePassed)
}

function ClassBoxGetLayersTest1(resolve, reject, test) {
    let svg = SVG(window.document.createElement("div"))

    let classDescription = {
        "name": "MyClass",
        "attributes":
            [
            ],
        "operations":
            [
            ]
    }
    let style = new UMLWebWidget.Style()
    let classbox = new UMLWebWidget.ClassBox(svg, classDescription.name, classDescription, false, style)

    let layers = classbox.getLayers()
    layers.layers["shape"].write()
    layers.layers["text"].write()

    TestUtils.exportSVGToHTML(svg, __dirname + "/output/classboxtests/ClassBoxGetLayersTest1.html", true)

    test.setOutputFilePath(__dirname + "/output/classboxtests/ClassBoxGetLayersTest1.html")
    test.setReferenceFilePath(__dirname + "/reference/classboxtests/ClassBoxGetLayersTest1.html")

    resolve(tf.TestResultOutcome.ePassed)
}

function ClassBoxGetLayersTest2(resolve, reject, test) {
    let svg = SVG(window.document.createElement("div"))

    let classDescription = {
        "name": "MyClass",
        "attributes":
            [
                {
                    "name": "m_attr1", "visibility": "public" 
                },
                {
                    "name": "m_attr2", "visibility": "protected" 
                },
                {
                    "name": "m_attr3", "visibility": "private" 
                }
            ],
        "operations":
            [
                { 
                    "name": "method1()", "visibility": "public", "return": "int"
                },
                { 
                    "name": "method2()", "visibility": "protected", "return": "void"
                },
                { 
                    "name": "method3()", "visibility": "private", "return": "std::string"
                }
            ]
    }
    let style = new UMLWebWidget.Style()
    let classbox = new UMLWebWidget.ClassBox(svg, classDescription.name, classDescription, false, style)

    let layers = classbox.getLayers()
    layers.layers["shape"].write()
    layers.layers["text"].write()

    TestUtils.exportSVGToHTML(svg, __dirname + "/output/classboxtests/ClassBoxGetLayersTest2.html", true)

    test.setOutputFilePath(__dirname + "/output/classboxtests/ClassBoxGetLayersTest2.html")
    test.setReferenceFilePath(__dirname + "/reference/classboxtests/ClassBoxGetLayersTest2.html")

    resolve(tf.TestResultOutcome.ePassed)
}

function ClassBoxMoveTest1(resolve, reject, test) {
    let svg = SVG(window.document.createElement("div"))

    let classDescription = {
        "name": "MyClass",
        "attributes":
            [
            ],
        "operations":
            [
            ]
    }
    let style = new UMLWebWidget.Style()
    let classbox = new UMLWebWidget.ClassBox(svg, classDescription.name, classDescription, false, style)
    classbox.move(20, 50)

    let layers = classbox.getLayers()
    layers.layers["shape"].write()
    layers.layers["text"].write()

    TestUtils.exportSVGToHTML(svg, __dirname + "/output/classboxtests/ClassBoxMoveTest1.html", true)

    test.setOutputFilePath(__dirname + "/output/classboxtests/ClassBoxMoveTest1.html")
    test.setReferenceFilePath(__dirname + "/reference/classboxtests/ClassBoxMoveTest1.html")

    resolve(tf.TestResultOutcome.ePassed)
}

function ClassBoxGetConnectionPointsRectangleTest1(resolve) {
    let svg = SVG(window.document.createElement("div"))
    let classDescription = {
        "name": "MyClass",
        "attributes":
            [
            ],
        "operations":
            [
            ]
    }
    let style = new UMLWebWidget.Style()
    let classbox = new UMLWebWidget.ClassBox(svg, classDescription.name, classDescription, false, style)
    
    let rect = classbox.getConnectionPointsRectangle()
    if ((rect.x == 1) && (rect.y == 1) &&
        (rect.x2 == 85.8125) && (rect.y2 == 76.7890625)) {
        resolve(tf.TestResultOutcome.ePassed)
    } else {
        resolve(tf.TestResultOutcome.eFailed)
    }
}

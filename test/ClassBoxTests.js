'use strict'

var window = require("svgdom")
var SVG = require("svg.js")(window)
var UMLWebWidget = require("../dist/codesmithy-umlwebwidget.js")
var tf = require("ishiko-test-framework")
var TestUtils = require("./TestUtils.js")

module.exports = function(theTestHarness) {
    let classboxSequence = theTestHarness.appendTestSequence("ClassBox tests")

    new tf.FunctionBasedTest("Creation test 1", ClassBoxCreationTest1, classboxSequence)

    new tf.FileComparisonTest("getLayers test 1", ClassBoxGetLayersTest1, classboxSequence)
    new tf.FileComparisonTest("getLayers test 2", ClassBoxGetLayersTest2, classboxSequence)
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
    let classbox = new UMLWebWidget.ClassBox(svg, classDescription, false, style)
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
    let classbox = new UMLWebWidget.ClassBox(svg, classDescription, false, style)

    let layers = classbox.getLayers()
    layers.layers["shape"].write()
    layers.layers["text"].write()

    TestUtils.exportSVGToHTML(svg, __dirname + "/output/ClassBoxGetLayersTest1.html", true)

    test.setOutputFilePath(__dirname + "/output/ClassBoxGetLayersTest1.html")
    test.setReferenceFilePath(__dirname + "/reference/ClassBoxGetLayersTest1.html")

    resolve(tf.TestResultOutcome.ePassed)
}

function ClassBoxGetLayersTest2(resolve, reject, test) {
    let svg = SVG(window.document.createElement("div"))

    TestUtils.exportSVGToHTML(svg, __dirname + "/output/ClassBoxGetLayersTest2.html", true)

    test.setOutputFilePath(__dirname + "/output/ClassBoxGetLayersTest2.html")
    test.setReferenceFilePath(__dirname + "/reference/ClassBoxGetLayersTest2.html")

    resolve(tf.TestResultOutcome.ePassed)
}

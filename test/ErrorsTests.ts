/*
    Copyright (c) 2020 Xavier Leclercq
    Released under the MIT License
    See https://github.com/CodeSmithyIDE/UMLWebWidget/blob/master/LICENSE.txt
*/

'use strict'

var UMLWebWidget = require("../dist/codesmithy-umlwebwidget.node.dev.js")
var tf = require("ishiko-test-framework")

module.exports = function(theTestHarness) {
    let errorSequence = theTestHarness.appendTestSequence("Errors tests")

    new tf.FunctionBasedTest("Errors creation test 1", ErrorsCreationTest1, errorSequence)
    new tf.FunctionBasedTest("assertAlways test 1", ErrorsAssertAlwaysTest1, errorSequence)
    new tf.FunctionBasedTest("assertAlways test 2", ErrorsAssertAlwaysTest2, errorSequence)
    new tf.FunctionBasedTest("UMLWebWidgetError creation test 1", UMLWebWidgetErrorCreationTest1, errorSequence)
    new tf.FunctionBasedTest("UMLWebWidgetError try/catch test 1", UMLWebWidgetErrorTryCatchTest1, errorSequence)
}

function ErrorsCreationTest1(resolve) {
    let errors = new UMLWebWidget.Errors()
    if (errors instanceof UMLWebWidget.Errors) {
        resolve(tf.TestResultOutcome.ePassed)
    } else {
        resolve(tf.TestResultOutcome.eFailed)
    }
}

function ErrorsAssertAlwaysTest1(resolve) {
    let errors = new UMLWebWidget.Errors()
    errors.assertAlways(true);
    resolve(tf.TestResultOutcome.ePassed)
}

function ErrorsAssertAlwaysTest2(resolve) {
    let errors = new UMLWebWidget.Errors()
    try {
        errors.assertAlways(false);
        resolve(tf.TestResultOutcome.eFailed)
    } catch(e) {
        resolve(tf.TestResultOutcome.ePassed)
    }
}

function UMLWebWidgetErrorCreationTest1(resolve) {
    let error = new UMLWebWidget.UMLWebWidgetError()
    if (error instanceof UMLWebWidget.UMLWebWidgetError) {
        resolve(tf.TestResultOutcome.ePassed)
    } else {
        resolve(tf.TestResultOutcome.eFailed)
    }
}

function UMLWebWidgetErrorTryCatchTest1(resolve) {
    let result = tf.TestResultOutcome.eFailed
    try {
        throw new UMLWebWidget.UMLWebWidgetError()
    } catch(err) {
        if (err instanceof UMLWebWidget.UMLWebWidgetError) {
            result = tf.TestResultOutcome.ePassed
        }
    } finally {
        resolve(result)
    }
}

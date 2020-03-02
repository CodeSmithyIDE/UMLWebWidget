/*
    Copyright (c) 2020 Xavier Leclercq
    Released under the MIT License
    See https://github.com/CodeSmithyIDE/UMLWebWidget/blob/master/LICENSE.txt
*/

'use strict'

const enum CSSClassName {
    Diagram = "codesmithy-uml-diagram",
    ClassBox = "class-box",
    ClassBox_Shape = "class-box__shape",
    ClassBox_ClassNameCompartment = "class-box__class-name-compartment",
    ClassBox_AttributesCompartment = "class-box__attributes-compartment",
    ClassBox_OperationsCompartment = "class-box__operations-compartment",
    ClassTemplate = "codesmithy-uml-diagram__classtemplate",
    ClassTemplate_Shape = "classtemplate__shape",
    ClassTemplate_ClassNameCompartment = "classtemplate__class-name-compartment",
    ClassTemplate_AttributesCompartment = "classtemplate__attributes-compartment",
    ClassTemplate_OperationsCompartment = "classtemplate__operations-compartment",
    ClassTemplate_ParametersCompartment = "classtemplate__parameters-compartment",
    Lifeline = "codesmithy-uml-diagram__lifeline",
    Lifeline_Head = "lifeline__lifeline-head",
    Lifeline_Head_Shape = "lifeline-head__shape",
    Lifeline_Head_Text = "lifeline-head__text",
    Lifeline_Line = "lifeline__lifeline-line",
    InheritanceConnector = "codesmithy-uml-diagram__inheritance-connector",
    InheritanceConnector_Shape = "inheritance-connector__shape",
    CompositionConnector = "codesmithy-uml-diagram__composition-connector",
    CompositionConnector_Shape = "composition-connector__shape",
    AggregationConnector = "codesmithy-uml-diagram__aggregation-connector",
    AggregationConnector_Shape = "aggregation-connector__shape",
    CreationMessageConnector = "codesmithy-uml-diagram__creation-message-connector",
    CreationMessageConnector_Shape = "creation-message-connector__shape",
    SynchronousMessageConnector = "codesmithy-uml-diagram__synchronous-message-connector",
    SynchronousMessageConnector_Shape = "synchronous-message-connector__shape",
    ReturnMessageConnector = "codesmithy-uml-diagram__return-message-connector",
    ReturnMessageConnector_Shape = "return-message-connector__shape",
    DestructionMessageConnector = "codesmithy-uml-diagram__destruction-message-connector",
    DestructionMessageConnector_Shape = "destruction-message-connector__shape"
}

export { CSSClassName }

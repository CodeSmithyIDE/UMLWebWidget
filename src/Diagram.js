'use strict'

import { UMLWebWidgetError } from "./UMLWebWidgetError.js"
import { Settings } from "./Settings.js"
import { Style } from "./Style.js"
import { LayoutManager } from "./LayoutManager.js"
import { ClassBox } from "./ClassBox.js"
import { Component } from "./Component.js"
import { Lifeline } from "./Lifeline.js"
import { Node } from "./Node.js"
import { Actor } from "./Actor.js"
import { UseCase } from "./UseCase.js"
import { Connector } from "./Connector.js"
import { SVGLayer } from "./SVGLayer.js"

/**
  This class is the entry point for all the functionality provided
  by the CodeSmithy UMLWebWidget.
*/
export class Diagram {

    constructor(settings) {
        this.settings = new Settings(settings)

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
        let style = new Style()

        if (this.diagramDescription.elements) {
            this.drawDiagram(svg, this.diagramDescription.elements, style, layout)
        } else if (this.diagramDescription.deploymentdiagram) {
            this.drawDeploymentDiagram(svg, this.diagramDescription.deploymentdiagram, style, layout)
        } else if (this.diagramDescription.usecasediagram) {
            this.drawUseCaseDiagram(svg, this.diagramDescription.usecasediagram, layout)
        }
    }

    drawDiagram(svg, description, style, layout) {
        let layoutManager = new LayoutManager(layout)

        let classboxes = []
        let lifelines = []
        let components = []
        let connectors = []
        let messages = []
        let assemblyconnectors = []

        // Construct the elements
        for (var i = 0; i < description.length; i++) {
            let item = description[i]
            if (item.class) {
                let className = item.class.name
                let newClassBox = new ClassBox(svg, className, item.class, this.settings.canMove, style)
                this.classboxes[className] = newClassBox
                classboxes.push(newClassBox)                
            } else if (item.lifeline) {
                let newLifeline = new Lifeline(svg, item.lifeline.name, item.lifeline, style)
                this.lifelines[item.lifeline.name] = newLifeline
                lifelines.push(newLifeline)
            } else if (item.component) {
                let newComponent = new Component(svg, item.component.name, item.component, style)
                this.components[item.component.name] = newComponent
                components.push(newComponent)
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
                let newConnector = new Connector(svg, item.relationship.type, connectionPoint1, connectionPoint2)
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
                        newConnector = new Connector(svg, "synchronousmessage", connectionPoint1, connectionPoint2, message.synchronousmessage.name)
                    } else if (message.returnmessage) {
                        lifeline1 = this.lifelines[message.returnmessage.callee]
                        lifeline2 = this.lifelines[message.returnmessage.caller]
                        connectionPoint1 = lifeline1.createConnectionPoint(svg)
                        connectionPoint2 = lifeline2.createConnectionPoint(svg)
                        newConnector = new Connector(svg, "returnmessage", connectionPoint1, connectionPoint2, "")
                    }
                    messages.push(newConnector)
                }
            } else if (item.assemblyconnector) {
                let consumerComponent = this.components[item.assemblyconnector.consumer]
                let providerComponent = this.components[item.assemblyconnector.provider]
                let connectionPoint1 = consumerComponent.createConnectionPoint(svg)
                let connectionPoint2 = providerComponent.createConnectionPoint(svg)
                let newConnector = new Connector(svg, "assemblyconnector", connectionPoint1, connectionPoint2)
                assemblyconnectors.push(newConnector)
            }
        }

        if (components != null) {
            for (var i = 0; i < components.length; i++) {
                layoutManager.setElementPosition(components[i])
            }
        }
        if (assemblyconnectors != null) {
            for (var i = 0; i < assemblyconnectors.length; i++) {
                 let connector = assemblyconnectors[i]
                 connector.connectionPoint1.move(connector.connectionPoint1.element.getSocketConnectionPoint("").x, connector.connectionPoint1.element.getSocketConnectionPoint("").y)
                 connector.connectionPoint2.move(connector.connectionPoint2.element.getBallConnectionPoint("").x, connector.connectionPoint2.element.getBallConnectionPoint("").y)
            }
        }
        dolayout(layoutManager, classboxes, lifelines, connectors, messages)

        if (components != null) {
            for (var i = 0; i < components.length; i++) {
                let component = components[i]
                component.getLayers().getLayer("shape").write()
                component.getLayers().getLayer("text").write()
            }
        }
        if (assemblyconnectors != null) {
            for (var i = 0; i < assemblyconnectors.length; i++) {
                let connector = assemblyconnectors[i]
                connector.getLayers().getLayer("shape").write()
                connector.getLayers().getLayer("text").write()
            }
        }
        draw(classboxes, lifelines, connectors, messages)
    }

    drawDeploymentDiagram(svg, deploymentDiagram, style, layout) {
        let layoutManager = new LayoutManager(layout)

        let nodes = []

        for (var i = 0; i < deploymentDiagram.length; i++) {
            let item = deploymentDiagram[i]
            if (item.node) {
                let newNode = new Node(svg, item.node.name, item.node, style)
                nodes.push(newNode)
            }
        }

        if (nodes != null) {
            for (var i = 0; i < nodes.length; i++) {
                layoutManager.setElementPosition(nodes[i])
            }
        }

        if (nodes != null) {
            for (var i = 0; i < nodes.length; i++) {
                let node = nodes[i]
                node.getLayers().getLayer("shape").write()
                node.getLayers().getLayer("text").write()
            }
        }
    }

    drawUseCaseDiagram(svg, useCaseDiagram, layout) {
        let layoutManager = new LayoutManager(layout)

        let actors = []
        let usecases = []

        for (var i = 0; i < useCaseDiagram.length; i++) {
            let item = useCaseDiagram[i]
            if (item.actor) {
                let newActor = new Actor(svg, item.actor.name, item.actor)
                this.actors[item.actor.name] = newActor
                actors.push(newActor)
            } else if (item.usecase) {
                let newUseCase = new UseCase(svg, item.usecase.title, item.usecase)
                this.usecases[item.usecase.title] = newUseCase
                usecases.push(newUseCase)
            } else if (item.association) {
                let connectionPoint1 = this.actors[item.association.actor].createConnectionPoint(svg)
                let connectionPoint2 = this.usecases[item.association.usecase].createConnectionPoint(svg)
                let newConnector = new Connector(svg, "usecaseassociation", connectionPoint1, connectionPoint2)
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

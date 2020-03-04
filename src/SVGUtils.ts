/*
    Copyright (c) 2020 Xavier Leclercq
    Released under the MIT License
    See https://github.com/CodeSmithyIDE/UMLWebWidget/blob/master/LICENSE.txt
*/

'use strict'

class SVGUtils {
    static Group(parent) {
        let group = parent.group()
        group.id(null)
        return group
    }

    static Line(parent, x1: number, y1: number, x2: number, y2: number) {
        let line = parent.line(x1, y1, x2, y2)
        line.id(null)
        return line
    }

    static Rectangle(parent, left: number, top: number, width: number, height: number) {
        let rect = parent.rect(width, height).move(left, top)
        rect.id(null)
        return rect
    }

    static Polygon(parent, description: string) {
        let polygon = parent.polygon(description)
        polygon.id(null)
        return polygon
    }

    static Circle(parent, x: number, y: number, radius: number) {
        let circle = parent.circle(radius).move(x, y)
        circle.id(null)
        return circle
    }

    static Text(parent, left: number, top: number, str: string) {
        let text = parent.text(str).move(left, top)
        text.id(null)
        return text
    }
}

export { SVGUtils }

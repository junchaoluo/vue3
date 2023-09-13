import { h, createElementVNode, RendererElement } from "vue"

export default function(renderFunc: Function, scope: {
    row: object,
    column: object,
    $index: number
}) {
    const cel = createElementVNode
    return {
        render: () => {
            return renderFunc(cel, scope)
        }
    }
}
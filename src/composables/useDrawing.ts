import { ref } from 'vue'

interface Point { x: number; y: number }
interface Stroke { points: Point[] }

export function useDrawing() {
  const strokes = ref<Stroke[]>([])
  const currentStroke = ref<Point[]>([])
  const isDrawing = ref(false)
  let ctx: any = null
  let canvasWidth = 0
  let canvasHeight = 0
  let pixelRatio = 1

  function init(context: any, width: number, height: number, dpr = 1) {
    ctx = context
    canvasWidth = width
    canvasHeight = height
    pixelRatio = dpr
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = 4 * pixelRatio
    ctx.strokeStyle = '#333'
  }

  function touchStart(x: number, y: number) {
    isDrawing.value = true
    currentStroke.value = [{ x, y }]
  }

  function touchMove(x: number, y: number) {
    if (!isDrawing.value || !ctx) return
    currentStroke.value.push({ x, y })
    const pts = currentStroke.value
    if (pts.length < 2) return

    ctx.beginPath()
    const prev = pts[pts.length - 2]
    const curr = pts[pts.length - 1]
    // Smooth with midpoint
    const mx = (prev.x + curr.x) / 2
    const my = (prev.y + curr.y) / 2
    ctx.moveTo(prev.x * pixelRatio, prev.y * pixelRatio)
    ctx.quadraticCurveTo(prev.x * pixelRatio, prev.y * pixelRatio, mx * pixelRatio, my * pixelRatio)
    ctx.stroke()
  }

  function touchEnd() {
    if (!isDrawing.value) return
    isDrawing.value = false
    if (currentStroke.value.length > 0) {
      strokes.value.push({ points: [...currentStroke.value] })
    }
    currentStroke.value = []
  }

  function undo() {
    strokes.value.pop()
    redraw()
  }

  function clear() {
    strokes.value = []
    currentStroke.value = []
    if (ctx) {
      ctx.clearRect(0, 0, canvasWidth * pixelRatio, canvasHeight * pixelRatio)
    }
  }

  function redraw() {
    if (!ctx) return
    ctx.clearRect(0, 0, canvasWidth * pixelRatio, canvasHeight * pixelRatio)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = 4 * pixelRatio
    ctx.strokeStyle = '#333'

    for (const stroke of strokes.value) {
      if (stroke.points.length < 2) continue
      ctx.beginPath()
      ctx.moveTo(stroke.points[0].x * pixelRatio, stroke.points[0].y * pixelRatio)
      for (let i = 1; i < stroke.points.length; i++) {
        const prev = stroke.points[i - 1]
        const curr = stroke.points[i]
        const mx = (prev.x + curr.x) / 2
        const my = (prev.y + curr.y) / 2
        ctx.quadraticCurveTo(prev.x * pixelRatio, prev.y * pixelRatio, mx * pixelRatio, my * pixelRatio)
      }
      ctx.stroke()
    }
  }

  return {
    strokes, isDrawing,
    init, touchStart, touchMove, touchEnd,
    undo, clear, redraw,
  }
}

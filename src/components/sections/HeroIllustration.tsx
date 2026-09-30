import { useEffect, useRef, useState } from 'react'
import heroImage from '../../assets/Images/hero-team.webp'
import { prefersReducedMotion } from '../../lib/motion'

// Source crop of the original 896x745 artwork: all shader coordinates below are in original-art pixels.
const ART_WIDTH = 682
const ART_HEIGHT = 590

const VERTEX_SHADER = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = vec2(aPos.x * 0.5 + 0.5, 0.5 - aPos.y * 0.5);
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`

// Warps the flat illustration so each part moves independently without tearing:
// the human stack sways and bobs from the feet, the top girl waves, the bar follows her
// string hand, the bottom boy's hands tremble, leaves and bushes sway, motion ticks flicker.
const FRAGMENT_SHADER = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform sampler2D uTex;
uniform float uTime;
varying vec2 vUv;

const vec2 ORIGIN = vec2(125.0, 113.0);
const vec2 SIZE = vec2(${ART_WIDTH}.0, ${ART_HEIGHT}.0);

float box(vec2 p, vec4 r, float f) {
  return smoothstep(r.x - f, r.x + f, p.x) * (1.0 - smoothstep(r.z - f, r.z + f, p.x))
       * smoothstep(r.y - f, r.y + f, p.y) * (1.0 - smoothstep(r.w - f, r.w + f, p.y));
}

float spot(vec2 p, vec2 c, float r) {
  return 1.0 - smoothstep(r * 0.45, r, length(p - c));
}

vec2 rotateBy(vec2 p, vec2 c, float a) {
  vec2 d = p - c;
  float s = sin(a);
  float co = cos(a);
  return c + vec2(co * d.x - s * d.y, s * d.x + co * d.y) - p;
}

vec2 stackMove(vec2 p, float t) {
  vec2 pivot = vec2(683.0, 668.0);
  float h = clamp((pivot.y - p.y) / 530.0, 0.0, 1.0);
  vec2 d = rotateBy(p, pivot, 0.011 * sin(t * 1.3) * h);
  d.y += 3.0 * (0.5 + 0.5 * sin(t * 2.6 - 1.0)) * h;
  return d;
}

void main() {
  vec2 p = ORIGIN + vUv * SIZE;
  float t = uTime;
  vec2 d = vec2(0.0);

  float stack = box(p, vec4(552.0, 128.0, 800.0, 690.0), 5.0);
  stack *= 1.0 - box(p, vec4(330.0, 262.0, 572.0, 700.0), 3.0);
  stack *= 1.0 - box(p, vec4(380.0, 266.0, 594.0, 370.0), 3.0);
  stack *= 1.0 - box(p, vec4(330.0, 195.0, 579.0, 266.0), 3.0);
  d += stack * stackMove(p, t);

  float bar = box(p, vec4(360.0, 150.0, 582.0, 258.0), 4.0) * (1.0 - stack);
  float ramp = clamp((p.x - 380.0) / 185.0, 0.0, 1.0);
  d += bar * ramp * stackMove(vec2(565.0, 177.0), t);

  d += box(p, vec4(702.0, 150.0, 752.0, 222.0), 5.0) * rotateBy(p, vec2(700.0, 184.0), 0.14 * sin(t * 2.4));

  d.y += spot(p, vec2(625.0, 473.0), 17.0) * 1.6 * sin(t * 11.0);
  d.y += spot(p, vec2(708.0, 467.0), 17.0) * 1.6 * sin(t * 11.0 + 1.7);

  d += box(p, vec4(140.0, 225.0, 364.0, 540.0), 4.0) * rotateBy(p, vec2(358.0, 528.0), 0.02 * sin(t * 1.1));

  float bush = smoothstep(500.0, 540.0, p.y);
  bush *= 1.0 - box(p, vec4(605.0, 440.0, 745.0, 600.0), 6.0);
  bush *= 1.0 - box(p, vec4(636.0, 590.0, 718.0, 700.0), 6.0);
  bush *= 1.0 - box(p, vec4(414.0, 262.0, 552.0, 700.0), 6.0);
  float lift = pow(clamp((676.0 - p.y) / 165.0, 0.0, 1.0), 1.5);
  d.x += bush * lift * 2.4 * sin(t * 1.6 + p.x * 0.035);

  vec2 q = p - d;
  vec2 uv = (q - ORIGIN) / SIZE;
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) {
    gl_FragColor = vec4(0.0);
    return;
  }

  float tick = spot(q, vec2(610.0, 402.0), 12.0) * (0.5 + 0.5 * sin(t * 5.0))
             + spot(q, vec2(738.0, 413.0), 12.0) * (0.5 + 0.5 * sin(t * 5.0 + 2.1))
             + spot(q, vec2(708.0, 160.0), 10.0) * (0.5 + 0.5 * sin(t * 4.0 + 4.0));
  gl_FragColor = texture2D(uTex, uv) * (1.0 - 0.85 * clamp(tick, 0.0, 1.0));
}
`

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

type HeroIllustrationProps = {
  alt: string
}

function HeroIllustration({ alt }: HeroIllustrationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || prefersReducedMotion()) return

    const gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false })
    if (!gl) return

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    const program = gl.createProgram()
    if (!vertex || !fragment || !program) return
    gl.attachShader(program, vertex)
    gl.attachShader(program, fragment)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)
    const uTime = gl.getUniformLocation(program, 'uTime')

    let frame = 0
    let visible = true
    let textureReady = false
    let disposed = false
    const start = performance.now()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = Math.round(canvas.clientWidth * dpr)
      const height = Math.round(canvas.clientHeight * dpr)
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
      // object-contain: fit the artwork inside the canvas, centered.
      const scale = Math.min(width / ART_WIDTH, height / ART_HEIGHT)
      const drawWidth = ART_WIDTH * scale
      const drawHeight = ART_HEIGHT * scale
      gl.viewport((width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight)
    }

    const render = () => {
      frame = 0
      if (disposed || !textureReady || !visible || document.hidden) return
      resize()
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(uTime, (performance.now() - start) / 1000)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      frame = requestAnimationFrame(render)
    }
    const play = () => {
      if (!frame) frame = requestAnimationFrame(render)
    }

    const image = new Image()
    image.decoding = 'async'
    image.onload = () => {
      if (disposed) return
      const texture = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      textureReady = true
      setAnimated(true)
      play()
    }
    image.src = heroImage

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) play()
    })
    observer.observe(canvas)

    const onVisibility = () => {
      if (!document.hidden) play()
    }
    const onContextLost = () => {
      disposed = true
      cancelAnimationFrame(frame)
      setAnimated(false)
    }
    document.addEventListener('visibilitychange', onVisibility)
    canvas.addEventListener('webglcontextlost', onContextLost)

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      canvas.removeEventListener('webglcontextlost', onContextLost)
      image.onload = null
    }
  }, [])

  return (
    <div className="relative size-full">
      <img
        alt={alt}
        className={`size-full object-contain transition-opacity duration-500 ${animated ? 'opacity-0' : 'opacity-100'}`}
        decoding="async"
        fetchPriority="high"
        height={ART_HEIGHT}
        src={heroImage}
        width={ART_WIDTH}
      />
      <canvas aria-hidden="true" className="absolute inset-0 size-full" ref={canvasRef} />
    </div>
  )
}

export default HeroIllustration

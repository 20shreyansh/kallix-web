"use client"

import { useEffect, useRef } from "react"
import { Renderer, Program, Mesh, Triangle, Vec3 } from "ogl"
import "./Orb.css"

interface OrbProps {
  hue?: number
  hoverIntensity?: number
  rotateOnHover?: boolean
  forceHoverState?: boolean
}

// Shader code defined outside component since they never change
const vert = /* glsl */ `
  precision highp float;
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const frag = /* glsl */ `
  precision highp float;
  uniform float iTime;
  uniform vec3 iResolution;
  uniform float hue;
  uniform float hover;
  uniform float rot;
  uniform float hoverIntensity;
  varying vec2 vUv;

  vec3 rgb2yiq(vec3 c) {
    float y = dot(c, vec3(0.299, 0.587, 0.114));
    float i = dot(c, vec3(0.596, -0.274, -0.322));
    float q = dot(c, vec3(0.211, -0.523, 0.312));
    return vec3(y, i, q);
  }
  
  vec3 yiq2rgb(vec3 c) {
    float r = c.x + 0.956 * c.y + 0.621 * c.z;
    float g = c.x - 0.272 * c.y - 0.647 * c.z;
    float b = c.x - 1.106 * c.y + 1.703 * c.z;
    return vec3(r, g, b);
  }
  
  vec3 adjustHue(vec3 color, float hueDeg) {
    float hueRad = hueDeg * 3.14159265 / 180.0;
    vec3 yiq = rgb2yiq(color);
    float cosA = cos(hueRad);
    float sinA = sin(hueRad);
    float i = yiq.y * cosA - yiq.z * sinA;
    float q = yiq.y * sinA + yiq.z * cosA;
    yiq.y = i;
    yiq.z = q;
    return yiq2rgb(yiq);
  }
  
  vec3 hash33(vec3 p3) {
    p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));
    p3 += dot(p3, p3.yxz + 19.19);
    return -1.0 + 2.0 * fract(vec3(
      p3.x + p3.y,
      p3.x + p3.z,
      p3.y + p3.z
    ));
  }
  
  float simplex_noise(vec3 p) {
    vec3 s = floor(p + dot(p, vec3(0.33333333)));
    vec3 x0 = p - s + dot(s, vec3(0.16666666));
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 x1 = x0 - g + vec3(0.16666666);
    vec3 x2 = x0 - l + vec3(0.33333333);
    
    vec3 w = 1.0 / vec3(dot(x0, x0), dot(x1, x1), dot(x2, x2));
    w = max(w - 0.85, 0.0);
    
    vec3 d0 = x0;
    vec3 d1 = x1;
    vec3 d2 = x2;
    
    vec3 h = 0.5 - vec3(dot(x0, x0), dot(x1, x1), dot(x2, x2));
    h = max(h, 0.0);
    vec3 nn = h * h * h * h;
    vec3 s0 = nn * dot(d0, hash33(s));
    vec3 s1 = nn * dot(d1, hash33(s + g));
    vec3 s2 = nn * dot(d2, hash33(s + l));
    
    return 0.6 * dot(w, vec3(dot(s0, vec3(1.0)), dot(s1, vec3(1.0)), dot(s2, vec3(1.0))));
  }
  
  float fbm(vec3 p) {
    float f = 0.0;
    f += 0.5000 * simplex_noise(p); p = p * 2.02;
    f += 0.2500 * simplex_noise(p); p = p * 2.03;
    f += 0.1250 * simplex_noise(p); p = p * 2.01;
    f += 0.0625 * simplex_noise(p);
    return f / 0.9375;
  }
  
  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / min(iResolution.y, iResolution.x);
    vec3 rd = normalize(vec3(uv, 1.0));
    vec3 ro = vec3(0.0, 0.0, -3.0);
    
    // Rotation for hover effect
    float rotationAngle = rot * hover;
    mat3 rotationMatrix = mat3(
      cos(rotationAngle), -sin(rotationAngle), 0.0,
      sin(rotationAngle), cos(rotationAngle), 0.0,
      0.0, 0.0, 1.0
    );
    
    vec3 p = ro + rd * 2.0;
    p = rotationMatrix * p;
    
    float t = iTime * 0.2;
    vec3 q = vec3(p.xy, t);
    
    float f = fbm(q * 2.0 + fbm(q));
    f = fbm(q + f);
    
    vec3 color = vec3(f);
    color = mix(color, vec3(0.1, 0.4, 0.8), f * 0.5);
    color = mix(color, vec3(0.6, 0.2, 0.8), dot(p.xy, p.xy) * 0.5);
    
    // Apply hue shift
    color = adjustHue(color, hue);
    
    // Hover effect intensity
    color += hover * hoverIntensity;
    
    gl_FragColor = vec4(color, 1.0);
  }
`

export default function Orb({
  hue = 0,
  hoverIntensity = 0.2,
  rotateOnHover = true,
  forceHoverState = false,
}: OrbProps) {
  const ctnDom = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ctnDom.current
    if (!container) return

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false })
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    container.appendChild(gl.canvas)

    const geometry = new Triangle(gl)
    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new Vec3(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height),
        },
        hue: { value: hue },
        hover: { value: 0 },
        rot: { value: 0 },
        hoverIntensity: { value: hoverIntensity },
      },
    })

    const mesh = new Mesh(gl, { geometry, program })

    let rafId: number
    const startTime = Date.now()
    let hover = 0
    let rot = 0

    const resize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height)
      program.uniforms.iResolution.value = new Vec3(width, height, width / height)
      gl.viewport(0, 0, width, height)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      
      hover = Math.min(1, Math.sqrt((x - 0.5) ** 2 + (y - 0.5) ** 2) * 2)
      if (rotateOnHover) {
        rot = Math.atan2(y - 0.5, x - 0.5)
      }
    }

    const handleMouseLeave = () => {
      hover = 0
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("resize", resize)
    resize()

    const update = () => {
      const currentTime = (Date.now() - startTime) / 1000
      program.uniforms.iTime.value = currentTime
      program.uniforms.hover.value = forceHoverState ? 1 : hover
      program.uniforms.rot.value = rot
      program.uniforms.hue.value = hue

      renderer.render({ scene: mesh })
      rafId = requestAnimationFrame(update)
    }

    rafId = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize", resize)
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
      container.removeChild(gl.canvas)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    }
  }, [hue, hoverIntensity, rotateOnHover, forceHoverState])

  return <div ref={ctnDom} className="orb-container" />
}
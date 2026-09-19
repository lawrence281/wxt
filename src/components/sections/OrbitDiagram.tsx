import { useEffect, useRef, useState } from 'react'
import Icon from '../ui/Icon'
import SocialIcon from '../ui/SocialIcon'
import { orbitNodes, orbitSocialLinks } from '../../data/ecosystem'

function OrbitDiagram() {
  const outerRingRef = useRef<HTMLDivElement>(null)
  const [outerRingVisible, setOuterRingVisible] = useState(false)

  useEffect(() => {
    const node = outerRingRef.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOuterRingVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOuterRingVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -10% 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="orbit-pause-hover relative w-full aspect-square max-w-[390px] mx-auto flex items-center justify-center select-none group/orbit">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="115" stroke="var(--color-secondary)" strokeOpacity="0.08" strokeWidth="1" />
        <circle cx="200" cy="200" r="70" stroke="var(--color-secondary)" strokeOpacity="0.12" strokeWidth="1.5" />
      </svg>

      <div className="absolute w-64 h-64 rounded-full bg-secondary/5 blur-xl pointer-events-none" />

      <div className="relative z-20 w-36 h-36 rounded-full bg-secondary text-on-secondary flex flex-col items-center justify-center text-center p-3 shadow-orbit border-4 border-surface-container-lowest transition-transform duration-300 hover:scale-105">
        <div className="absolute -inset-1.5 rounded-full border border-secondary/30 animate-pulse pointer-events-none" />
        <Icon name="supervised_user_circle" className="text-icon-28 mb-1" />
        <span className="font-label-lg text-label-lg font-bold leading-tight">Brand Advocacy</span>
        <span className="font-label-sm text-label-sm text-white/80">Social Media Users</span>
      </div>

      {/* Outer ring: category nodes; flies out from center once scrolled into view, then holds still */}
      <div
        className={`orbit-outer-ring absolute inset-0 w-full h-full pointer-events-none ${outerRingVisible ? 'orbit-outer-ring--visible' : ''}`}
        ref={outerRingRef}
      >
        <svg className="absolute inset-0 w-full h-full" fill="none" viewBox="0 0 400 400">
          <circle cx="200" cy="200" r="160" stroke="var(--color-secondary)" strokeDasharray="5 5" strokeOpacity="0.15" strokeWidth="1.5" />
        </svg>
        {orbitNodes.map((node) => (
          <div key={node.label} className={`absolute ${node.position} pointer-events-auto`}>
            <div className="orbit-node flex flex-col items-center group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-surface-container-lowest shadow-md flex items-center justify-center text-secondary border border-outline-variant/30 group-hover:scale-110 group-hover:shadow-lg group-hover:bg-secondary group-hover:text-on-secondary transition-all duration-200">
                <Icon name={node.icon} className="text-icon-18" />
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-secondary font-medium mt-1 bg-surface-container-lowest/90 backdrop-blur-xs px-1.5 py-0.5 rounded transition-colors whitespace-nowrap">
                {node.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Inner ring: social icons only, continuously rotating along the r=115 guide circle */}
      <div className="absolute inset-[21.25%] pointer-events-none">
        <div className="animate-orbit-track absolute inset-0">
          {orbitSocialLinks.map((social, index) => {
            const angle = (360 / orbitSocialLinks.length) * index
            return (
              <div className="absolute inset-0" key={social.label} style={{ transform: `rotate(${angle}deg)` }}>
                <div className="animate-orbit-counter absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                  <a
                    aria-label={social.label}
                    className="w-8 h-8 rounded-full bg-surface-container-lowest shadow-md flex items-center justify-center text-secondary border border-outline-variant/30 transition-all duration-200 hover:scale-110 hover:shadow-lg hover:bg-secondary hover:text-on-secondary"
                    href={social.href}
                    rel="noopener noreferrer"
                    target="_blank"
                    title={social.label}
                  >
                    <SocialIcon className="w-3.5 h-3.5" name={social.icon} />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default OrbitDiagram

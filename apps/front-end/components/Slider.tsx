import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {
  FC,
  ReactFragment,
  useState,
  Children,
  cloneElement,
  ReactNode,
  useEffect,
} from 'react'
type Props = {
  children: ReactFragment
  className: string
}
export const Slider: FC<Props> = ({ children, className }) => {
  const [current, setCurrent] = useState(0)
  const [width, setWidth] = useState(0)
  const total = Array.from(children).length

  useEffect(() => {
    if (!window) return

    setWidth(window.innerWidth > 1024 ? 1024 : window.innerWidth)

    const setSlideWidth = () => {
      setWidth(window.innerWidth > 1024 ? 1024 : window.innerWidth)
    }

    window.addEventListener('resize', setSlideWidth)

    return setSlideWidth
  }, [])

  const handleChangeSlide = (slide: number) => {
    if (slide > 0) {
      const isBackToHead = current + slide >= total
      setCurrent(isBackToHead ? 0 : current + slide)
      return
    }

    if (slide < 0) {
      const isGoToEnd = current === 0
      setCurrent(isGoToEnd ? total - 1 : current + slide)
    }
  }
  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden">
        <div
          className="flex items-center bg-black transition-transform ease-in-out duration-300"
          style={{
            width: width * total,
            transform: `translate3d(${width * -current}px, 0px, 0px)`,
          }}
        >
          {Children.map(children, (child) => {
            return <div style={{ width, maxWidth: '1024px' }}>{child}</div>
          })}
        </div>
      </div>
      <div
        className="absolute top-0 bottom-0 flex items-center"
        onClick={() => handleChangeSlide(-1)}
      >
        <button className="bg-slate-100 p-1">
          <ChevronLeftIcon
            className="h-7 w-7 text-sky-400"
            aria-hidden="true"
          />
        </button>
      </div>
      <div
        className="absolute top-0 bottom-0 right-0 flex items-center"
        onClick={() => handleChangeSlide(1)}
      >
        <button className="bg-slate-100 p-1">
          <ChevronRightIcon
            className="h-7 w-7 text-sky-400"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  )
}

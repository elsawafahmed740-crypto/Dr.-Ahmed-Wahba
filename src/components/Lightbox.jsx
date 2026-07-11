import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Download } from 'lucide-react'

const MIN_ZOOM = 0.5
const MAX_ZOOM = 4

/**
 * Full-screen image lightbox with zoom, drag-to-pan, keyboard navigation,
 * thumbnail strip, and download support.
 *
 * @param {{ images: { src: string, title: string }[], startIndex: number, onClose: () => void }} props
 */
export function Lightbox({ images, startIndex, onClose }) {
  const shouldReduceMotion = useReducedMotion()

  const [current, setCurrent]     = useState(startIndex)
  const [zoom, setZoom]           = useState(1)
  const [pos, setPos]             = useState({ x: 0, y: 0 })
  const [dragging, setDragging]   = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const resetZoom = useCallback(() => {
    setZoom(1)
    setPos({ x: 0, y: 0 })
  }, [])

  const prev = useCallback(() => {
    setCurrent(i => (i - 1 + images.length) % images.length)
    resetZoom()
  }, [images.length, resetZoom])

  const next = useCallback(() => {
    setCurrent(i => (i + 1) % images.length)
    resetZoom()
  }, [images.length, resetZoom])

  const zoomIn  = useCallback(() => setZoom(z => Math.min(z + 0.3, MAX_ZOOM)), [])
  const zoomOut = useCallback(() => setZoom(z => Math.max(z - 0.3, MIN_ZOOM)), [])

  // Lock body scroll + keyboard navigation — single combined effect with proper deps
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e) => {
      if (e.key === 'Escape')              onClose()
      if (e.key === 'ArrowRight')          next()
      if (e.key === 'ArrowLeft')           prev()
      if (e.key === '+' || e.key === '=')  zoomIn()
      if (e.key === '-')                   zoomOut()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose, next, prev, zoomIn, zoomOut])

  const handleWheel = (e) => {
    e.preventDefault()
    if (e.deltaY < 0) zoomIn()
    else zoomOut()
  }

  const handleMouseDown = (e) => {
    if (zoom <= 1) return
    setDragging(true)
    setDragStart({ x: e.clientX - pos.x, y: e.clientY - pos.y })
  }
  const handleMouseMove = (e) => {
    if (!dragging) return
    setPos({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
  }
  const handleMouseUp = () => setDragging(false)

  const handleDownload = () => {
    const link    = document.createElement('a')
    link.href     = images[current].src
    link.download = (images[current].title || 'image') + '.jpg'
    link.click()
  }

  const motionDuration = shouldReduceMotion ? 0 : 0.25

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: motionDuration }}
        className="fixed inset-0 z-[9999] flex flex-col bg-black/95 backdrop-blur-xl"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        role="dialog"
        aria-modal="true"
        aria-label="Image lightbox"
      >
        {/* ── Toolbar ── */}
        <div className="flex shrink-0 items-center justify-between px-4 py-3 sm:px-6 bg-black/60 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-white/50 text-sm font-semibold">
              {current + 1} / {images.length}
            </span>
            <span className="hidden sm:block text-white text-sm font-bold truncate max-w-xs">
              {images[current]?.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={zoomOut}
              disabled={zoom <= MIN_ZOOM}
              aria-label="Zoom out"
              className="grid size-9 place-items-center rounded-xl bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 transition"
            >
              <ZoomOut size={18} />
            </button>

            <button
              onClick={resetZoom}
              aria-label="Reset zoom"
              className="min-w-[56px] rounded-xl bg-white/10 px-3 py-2 text-center text-xs font-black text-white hover:bg-white/20 transition"
            >
              {Math.round(zoom * 100)}%
            </button>

            <button
              onClick={zoomIn}
              disabled={zoom >= MAX_ZOOM}
              aria-label="Zoom in"
              className="grid size-9 place-items-center rounded-xl bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 transition"
            >
              <ZoomIn size={18} />
            </button>

            <div className="w-px h-6 bg-white/20 mx-1" aria-hidden="true" />

            <button
              onClick={handleDownload}
              aria-label="Download image"
              className="grid size-9 place-items-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
            >
              <Download size={18} />
            </button>

            <button
              onClick={onClose}
              aria-label="Close lightbox"
              className="grid size-9 place-items-center rounded-xl bg-white/10 text-white hover:bg-red-500/80 transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ── Image area ── */}
        <div
          className="relative flex-1 overflow-hidden flex items-center justify-center"
          onWheel={handleWheel}
          style={{ cursor: zoom > 1 ? (dragging ? 'grabbing' : 'grab') : 'default' }}
        >
          {images.length > 1 && (
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 z-10 grid size-11 place-items-center rounded-full bg-black/50 text-white hover:bg-black/80 border border-white/10 transition"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={images[current]?.src}
              alt={images[current]?.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: motionDuration }}
              style={{
                transform:       `scale(${zoom}) translate(${pos.x / zoom}px, ${pos.y / zoom}px)`,
                transformOrigin: 'center',
                maxWidth:        zoom <= 1 ? '100%' : 'none',
                maxHeight:       zoom <= 1 ? 'calc(100vh - 130px)' : 'none',
                cursor:          zoom > 1 ? (dragging ? 'grabbing' : 'grab') : 'default',
                userSelect:      'none',
              }}
              onMouseDown={handleMouseDown}
              draggable={false}
              className="object-contain rounded-lg shadow-2xl"
            />
          </AnimatePresence>

          {images.length > 1 && (
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 z-10 grid size-11 place-items-center rounded-full bg-black/50 text-white hover:bg-black/80 border border-white/10 transition"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        {/* ── Thumbnail strip ── */}
        {images.length > 1 && (
          <div className="shrink-0 flex gap-2 overflow-x-auto px-4 py-3 bg-black/60 border-t border-white/10 justify-center">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); resetZoom() }}
                aria-label={`View image ${i + 1}: ${img.title}`}
                aria-pressed={i === current}
                className={`shrink-0 size-14 rounded-xl overflow-hidden ring-2 transition ${
                  i === current ? 'ring-white scale-110' : 'ring-white/20 opacity-50 hover:opacity-80'
                }`}
              >
                <img src={img.src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* ── Keyboard hint ── */}
        <div
          className="hidden sm:flex shrink-0 items-center justify-center gap-6 py-2 text-xs text-white/30"
          aria-hidden="true"
        >
          <span>← → Navigate</span>
          <span>+ / − Zoom</span>
          <span>Scroll to zoom</span>
          <span>Esc Close</span>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from 'react-icons/fi'
import { useEffect } from 'react'

const toastIcons = {
  success: FiCheckCircle,
  error: FiAlertCircle,
  info: FiInfo,
}

/** Props: message, type, onClose, and duration in milliseconds. */
function Toast({ message, type = 'info', onClose, duration = 4500 }) {
  const reduceMotion = useReducedMotion()
  const Icon = toastIcons[type] || toastIcons.info

  useEffect(() => {
    if (!message) return undefined
    const timer = window.setTimeout(onClose, duration)
    return () => window.clearTimeout(timer)
  }, [duration, message, onClose])

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="fixed bottom-6 left-1/2 z-[90] flex w-[min(calc(100vw-2rem),28rem)] -translate-x-1/2 items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-text shadow-2xl shadow-bg/30"
          role={type === 'error' ? 'alert' : 'status'}
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
        >
          <Icon aria-hidden="true" className={type === 'error' ? 'shrink-0 text-red-400' : type === 'success' ? 'shrink-0 text-emerald-400' : 'shrink-0 text-accent'} />
          <span className="flex-1">{message}</span>
          <button type="button" onClick={onClose} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-text" aria-label="Dismiss notification">
            <FiX aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast

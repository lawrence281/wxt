/**
 * One shared requestAnimationFrame loop for every scroll-driven effect.
 * Each frame runs all `read` callbacks first, then all `write` callbacks,
 * so layout is measured once and never thrashed by interleaved style writes.
 */
interface ScrollTask {
  read: () => void
  write: () => void
}

const tasks = new Set<ScrollTask>()
let frame = 0
let bound = false

function run() {
  frame = 0
  tasks.forEach((task) => task.read())
  tasks.forEach((task) => task.write())
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(run)
}

export function subscribeScroll(task: ScrollTask): () => void {
  tasks.add(task)
  if (!bound) {
    bound = true
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
  }
  schedule()

  return () => {
    tasks.delete(task)
    if (tasks.size === 0 && bound) {
      bound = false
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }
}

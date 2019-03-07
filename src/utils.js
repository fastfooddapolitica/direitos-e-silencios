export function scrollIntoView (el) {
  try {
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  } catch (e) {
    el.scrollIntoView()
  }
}

export function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

export const parsePercentage = percentage =>
  parseInt(percentage.substring(0, percentage.length -1))

export const calculateWidth = (width, containerWidth) =>
  typeof width === 'string'
    ? containerWidth * parsePercentage(width) / 100
    : width

export const triangleMetrics = (containerHeight, containerWidth, angle) => {
  // shape height equals its container's height
  const height = containerHeight

  // calculates shape width from it's height and wanted angle
  const width = height / Math.tan((angle * Math.PI) / 180)
  
  // shape x position equals its container minus its width
  const pos = containerWidth - width

  return { width, height, pos }
}
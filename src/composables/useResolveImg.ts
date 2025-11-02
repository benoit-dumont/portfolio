export function useResolveImg() {
  const resolveImg = (folder: string, fileName: string): string => {
    const hasExt = /\.[a-zA-Z0-9]+$/.test(fileName)
    const finalName = hasExt ? fileName : `${fileName.toLowerCase()}.svg`

    return new URL(`../assets/${folder}/${finalName}`, import.meta.url).href
  }

  return { resolveImg }
}

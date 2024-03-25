export const slug = (text: string) =>
  text.toLowerCase().replace(/[ &]/g, "-").replace(/-+/g, "-")

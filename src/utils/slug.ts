export const slug = (text: string) =>
  text
    .toLowerCase()
    .replaceAll(" ", "-")
    .replaceAll("&", "-")
    .replace(/-+/g, "-")

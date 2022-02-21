export function makeImpagePath(id: string, format: string = "original") {
  return `https://image.tmdb.org/t/p/${format}/${id}`;
}

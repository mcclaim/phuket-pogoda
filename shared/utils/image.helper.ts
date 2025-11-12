export function iconUrl(icon: string): string {
  return `/images/icons/${icon}.svg`;
}

export function weatherIconUrl(icon: string): string {
  return `/images/icons/weather-icons/${icon}.svg`;
}

export function uvImage(uv: number): string {
  return weatherIconUrl(`uv-index-${Math.round(uv)}`);
}

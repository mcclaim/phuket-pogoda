export function dynamicIcon(iconName: string): string {
  return new URL(
    `../../assets/images/weather-icons/${iconName}.svg`,
    import.meta.url
  ).href;
}

export function uvImage(uv: number): string {
  return new URL(
    `../../assets/images/weather-icons/uv-index-${Math.round(uv)}.svg`,
    import.meta.url
  ).href;
}

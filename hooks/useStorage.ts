const useLocalStorage = () => {
  return [
    (key: string) => JSON.parse(localStorage.getItem(key)),
    (key: string, data: any) =>
      localStorage.setItem(
        key,
        JSON.stringify(data)
      )
  ]
}
const useSessionStorage = () => {
  return [
    (key: string) => JSON.parse(sessionStorage.getItem(key)),
    (key: string, data: any) =>
      sessionStorage.setItem(
        key,
        JSON.stringify(data)
      )
  ];
}

export { useLocalStorage, useSessionStorage }
import create from 'zustand'

const useDarkMode: any = create((set: Function) => ({
  darkModeStatus: true,
  toggleMode: () => set((state: any) => ({darkModeStatus: !state.darkModeStatus})),
}))

export default useDarkMode
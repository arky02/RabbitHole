import { create } from 'zustand';

interface Props {
  prevPath: string;
  setPrevPath: (value: string) => void;
}

const usePrevPath = create<Props>((set) => ({
  prevPath: '/',
  setPrevPath: (value: string) => set({ prevPath: value }),
}));

export default usePrevPath;

import { create } from 'zustand';

interface Props {
  prevPath: string;
  setPrevPath: (value: string) => void;
}

const usePrevPath = create<Props>((set) => ({
  prevPath: '메인',
  setPrevPath: (value: string) => set({ prevPath: value }),
}));

export default usePrevPath;

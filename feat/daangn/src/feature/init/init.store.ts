import { create } from 'zustand';
import type { MemberType } from './init.type';

type InitStoreType = {
  step: number;
  setStep: (step: number) => void;
  memberType: MemberType | null;
  setMemberType: (memberType: MemberType) => void;
};

export const useInitStore = create<InitStoreType>((set) => ({
  step: 1,
  setStep: (step) => set({ step }),
  memberType: null,
  setMemberType: (memberType) => set({ memberType }),
}));

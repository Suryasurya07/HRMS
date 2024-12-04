// src/store/useDashboardStore.js
import { create } from 'zustand';

const useDashboardStore = create((set) => ({
  selectedPage: 'home',
  isDialogOpen: false,
  dialogContent: { title: '', children: null },
  date: new Date(),

  setSelectedPage: (page) => set({ selectedPage: page }),
  openDialog: (title, children) =>
    set({ isDialogOpen: true, dialogContent: { title, children } }),
  closeDialog: () =>
    set({ isDialogOpen: false, dialogContent: { title: '', children: null } }),
  setDate: (newDate) => set({ date: newDate }),
}));

export default useDashboardStore;

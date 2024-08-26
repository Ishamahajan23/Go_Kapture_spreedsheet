import create from "zustand";

const useSpreadsheetStore = create((set) => ({
  cells: Array.from({ length: 1000 }, () => ""),
  setCell: (index, value) =>
    set((state) => {
      const newCells = [...state.cells];
      newCells[index] = value;
      return { cells: newCells };
    }),
  undoStack: [],
  redoStack: [],
  undo: () =>
    set((state) => {
      if (state.undoStack.length === 0) return state;
      const { index, value } = state.undoStack.pop();
      const newCells = [...state.cells];
      const redoAction = { index, value: newCells[index] };
      newCells[index] = value;
      return {
        cells: newCells,
        redoStack: [...state.redoStack, redoAction],
      };
    }),
  redo: () =>
    set((state) => {
      if (state.redoStack.length === 0) return state;
      const { index, value } = state.redoStack.pop();
      const newCells = [...state.cells];
      const undoAction = { index, value: newCells[index] };
      newCells[index] = value;
      return {
        cells: newCells,
        undoStack: [...state.undoStack, undoAction],
      };
    }),
  addAction: (index, value) =>
    set((state) => {
      const undoAction = { index, value: state.cells[index] };
      return { undoStack: [...state.undoStack, undoAction] };
    }),
  page: 0,
  pageSize: 100,
  nextPage: () => set((state) => ({ page: state.page + 1 })),
  prevPage: () => set((state) => ({ page: Math.max(state.page - 1, 0) })),
}));

export default useSpreadsheetStore;

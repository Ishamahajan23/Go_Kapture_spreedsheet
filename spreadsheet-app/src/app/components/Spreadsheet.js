"use client";
import { useEffect, useState, useCallback } from "react";
import useSpreadsheetStore from "../store/useSpreadsheetStore";
import Toolbar from "./Toolbar";

const Spreadsheet = () => {
  const {
    cells,
    setCell,
    addAction,
    undo,
    redo,
    page,
    pageSize,
    nextPage,
    prevPage,
  } = useSpreadsheetStore();

  const [alignment, setAlignment] = useState("center");
  const [fontSize, setFontSize] = useState("14");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const handleInputChange = useCallback(
    (e, index) => {
      const value = e.target.value;

      if (index < 100 && isNaN(value)) return;

      addAction(index + page * pageSize, cells[index]);
      setCell(index + page * pageSize, value);
    },
    [addAction, cells, page, pageSize, setCell]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.ctrlKey && e.key === "z") {
        undo();
      }
      if (e.ctrlKey && e.key === "y") {
        redo();
      }
    },
    [undo, redo]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleAlignmentChange = (alignment) => {
    setAlignment(alignment);
  };

  const handleFontSizeChange = (size) => {
    setFontSize(size);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const startIdx = page * pageSize;
  const filteredCells = cells
    .filter((cell) => cell.toLowerCase().includes(search.toLowerCase()))
    .filter((cell) => (filter ? cell.includes(filter) : true));

  const visibleCells = filteredCells.slice(startIdx, startIdx + pageSize);

  return (
    <div className="p-4">
      <Toolbar
        onAlign={handleAlignmentChange}
        onFontSize={handleFontSizeChange}
        onSearch={handleSearchChange}
        onFilter={handleFilterChange}
      />
      <div className="grid grid-rows-12 grid-cols-5 lg:grid-cols-10 gap-1">
        {visibleCells.map((cell, index) => (
          <input
            key={index}
            className={`border text-black p-2 ${
              alignment ? `text-${alignment}` : ""
            } ${fontSize ? `text-${fontSize}` : ""}`}
            value={cell}
            onChange={(e) => handleInputChange(e, index)}
          />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={prevPage} className="btn">
          Previous
        </button>
        <button onClick={nextPage} className="btn">
          Next
        </button>
      </div>
    </div>
  );
};

export default Spreadsheet;

const Toolbar = ({ onAlign, onFontSize, onSearch, onFilter }) => {
    return (
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => onAlign("left")}
          className="btn px-4 py-2 bg-blue-500 text-white rounded"
        >
          Left
        </button>
        <button
          onClick={() => onAlign("center")}
          className="btn px-4 py-2 bg-blue-500 text-white rounded"
        >
          Center
        </button>
        <button
          onClick={() => onAlign("right")}
          className="btn px-4 py-2 bg-blue-500 text-white rounded"
        >
          Right
        </button>
        <input
          type="number"
          placeholder="Font size"
          onChange={(e) => onFontSize(e.target.value)}
          className="border p-1 text-black"
        />
        <input
          type="text"
          placeholder="Search"
          onChange={onSearch}
          className="border p-1 text-black"
        />
        <input
          type="text"
          placeholder="Filter"
          onChange={onFilter}
          className="border p-1 text-black"
        />
      </div>
    );
  };
  
  export default Toolbar;
  
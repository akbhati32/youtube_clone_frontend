// Predefined filter categories
const filters = ['All', 'Education', 'News', 'Music', 'Gaming', 'Sports', 'Entertainment'];

const FilterBar = ({ selectedFilter, onSelectFilter }) => {

  return (
    // Hidden on mobile, visible from md breakpoint
    <div className="hidden md:flex gap-4 overflow-x-auto p-2">

      {/* Render filter buttons */}
      {filters.map((filter) => {
        const isActive = selectedFilter === filter;

        return (
          <button
            key={filter}
            onClick={() => onSelectFilter(filter)}  // Pass selected filter to parent
            className={`
              px-4 py-2 text-sm font-medium rounded-lg cursor-pointer whitespace-nowrap transition-colors duration-300 shadow-sm outline-none
              ${isActive
                ? 'bg-black text-white'
                : 'bg-gray-100 hover:bg-gray-200'}
            `}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}

export default FilterBar;
import { Search, XIcon } from "lucide-react";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../features/search/searchSlice';


const SearchBar = () => {

  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.search.term);

  // Update global search state whenever input changes
  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div className="flex items-center flex-1 justify-center">
      {/* Search box with input + search button */}
      <div className="flex w-7/12 gap-2">
        <div className="w-full flex flex-grow">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={(e) => e.key === "Enter"}
              aria-label="Search"
              className="border rounded-l-full px-3 py-2 w-full border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
            />

            {/* Clear button appears only when input has text */}
            {searchTerm && (
              <button
                onClick={() => dispatch(setSearchTerm(""))}
                className=" text-gray-500 hover:text-black p-1 md:p-2 border-y border-gray-400"
                aria-label="Clear search"
              >
                <XIcon size={16} />
              </button>
            )}
          
          {/* Search button (icon) */}
          <button
            type="submit"
            className="text-white border border-gray-400 bg-gray-100 md:px-6 rounded-r-full hover:bg-gray-200 py-2 cursor-pointer"
          >
            <Search className="text-black" />
          </button>
        </div>
      </div>

      {/* Voice search button (mic) - visible on large screens */}
      <button
        type="button"
        className="hidden lg:flex justify-center items-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 ml-2"
      >
        <KeyboardVoiceIcon className="text-black" />
      </button>
    </div>
  );
}

export default SearchBar;
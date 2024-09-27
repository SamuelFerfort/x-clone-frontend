import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const SearchBar = ({ users }) => {
  const [filter, setFilter] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);


  const navigate = useNavigate()

  let filteredUsers = users;
  const searchRef = useRef(null);

  if (filter) {
    filteredUsers = users.filter(
      (u) =>
        u.username.toLowerCase().includes(filter.toLowerCase()) ||
        u.handler.toLowerCase().includes(filter.toLowerCase())
    );
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    if(filter.length > 0) {
      navigate(`/explore?search=${filter}`)

    }

  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
        setFilter("")
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className=" max-w-80  mt-1 ml-9 relative" ref={searchRef}>
      <form onSubmit={handleSubmit}>

      <label htmlFor="users">
        <Search size={17} className="absolute top-4 left-3" color="#71767B" />
      </label>
      <input
        onFocus={() => setShowDropdown(true)}
        type="search"
        name="users"
        autoComplete="off"
        id="users"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search"
        className=" w-full px-9 bg-[#202327] outline-none text-base focus:border-btn-blue focus:bg-black border focus:border-2 rounded-full h-12 border-[#202327] placeholder:text-gray-secondary"
      />
      </form>

      {showDropdown && (
        <div className="w-full min-h-10 max-h-[80vh] absolute z-10 bg-black rounded-lg border  border-white/20 shadow-md overflow-hidden shadow-white/20 ">
          <ul>
            {filter.length > 0 ? (
              filteredUsers.map((u) => (
                <Link
                  to={`/${u.handler}`}
                  key={u.id}
                  onClick={() => {
                    setShowDropdown(false), setFilter("");
                  }}
                >
                  <li className="flex items-center justify-between px-4 py-3 hover:bg-gray-hover transition-colors duration-200">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        {u.avatar ? (
                          <img
                            src={u.avatar}
                            alt={u.username}
                            className="rounded-full w-10 h-10 object-cover"
                          />
                        ) : (
                          <div className="rounded-full w-10 h-10 bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-400 text-xl">
                              {u.username[0]}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-bold text-sm hover:underline">
                          {u.username}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {u.handler}
                        </span>
                      </div>
                    </div>
                  </li>
                </Link>
              ))
            ) : (
              <span className="flex text-sm p-5 text-gray-secondary h-24">
                Try searching for people, posts, or keywords
              </span>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

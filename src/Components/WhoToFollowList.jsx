import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "./Spinner";

const WhoToFollowList = ({ data, isLoading }) => {
  return (
    <div className="bg-black border-white/20 border rounded-xl overflow-hidden  ml-9 mt-5 max-w-80">
      <h2 className="text-xl font-bold text-white p-4">You might like</h2>
      <ul className="mb-3">
        {(isLoading || !data) && (
          <div className="flex justify-center ">
            <Spinner />
          </div>
        )}
        {data?.map((u) => (
          <Link to={`/${u.handler}`} key={u.id}>
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
                  <span className="text-gray-500 text-sm">{u.handler}</span>
                </div>
              </div>
              <button className="bg-white text-black font-bold text-sm rounded-full px-4 py-1.5 hover:bg-gray-200 transition-colors duration-200">
                Follow
              </button>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

WhoToFollowList.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default WhoToFollowList;

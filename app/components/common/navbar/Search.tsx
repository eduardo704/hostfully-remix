import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Search() {
  return (
    <div>
      <div className="border-1 w-full md:w-auto py-2">
        <div className="flex flex-row justify-between items-center ring-1">
          <div>
            <select
              name="levelSelect"
              className="block w-full border-0 p-2  text-gray-900 shadow-sm  ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              id="levelSelect"
            >
              <option value="all">All levels</option>
              <option value="begginer">Begginer</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="flex  shadow-sm ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="username"
              className="block flex-1 text-center border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              placeholder="Anywhere"
            />
            <span className="flex select-none items-center px-3 ">
              <FontAwesomeIcon
                color="#C3002F"
                size="2x"
                icon={faMagnifyingGlass}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

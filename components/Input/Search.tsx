import { SearchIcon } from "@heroicons/react/outline";

export default function InputSearch({ searchAllPerson } : any) {
  return (
    <div>
        <input id="search" name="search" onKeyUp={ searchAllPerson } className="dark:bg-gray-600 dark:text-gray-300 dark:border-transparent dark:shadow-inner block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Search.." type="search" />
    </div>
  );
}

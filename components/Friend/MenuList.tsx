export default function MenuList({ name, icon }: any) {
  return (
    <li className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          { icon }
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
          <p className="font-medium text-gray-900 truncate dark:text-white">
            { name }
          </p>
        </div>
      </div>
    </li>
  );
}

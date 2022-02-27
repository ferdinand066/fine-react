export default function ChatHeader(props: any) {
    let person = props.person;
    return (
      <li className="p-4 cursor-pointer hover:bg-gray-600">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img className="h-12 w-12 rounded-full" src={person.imageUrl} alt="" />
          </div>
          <div className="flex-1 min-w-0 flex flex-col gap-0.5">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {person.name}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {"@" + person.handle}
            </p>
          </div>
        </div>
      </li>
    );
  }
  
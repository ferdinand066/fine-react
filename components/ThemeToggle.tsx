/* This example requires Tailwind CSS v2.0+ */
import { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import { useTheme } from 'next-themes';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  function changeTheme(): void {
    setTheme(theme === "dark" ? "light" : "dark");
  }
  
  function checkEnable() : boolean{
    return theme === "dark";
  }
  
  return (
    <Switch
      checked={ checkEnable() }
      onChange={changeTheme}
      className={classNames(
        checkEnable() ? 'bg-indigo-600' : 'bg-gray-200',
        'mr-2 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        className={classNames(
          checkEnable() ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
        )}
      >
        <span
          className={classNames(
            checkEnable() ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200',
            'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            className='w-3 h-3 text-gray-400'
            viewBox="0 0 30 30">
              <path d="M 14.984375 0.98632812 A 1.0001 1.0001 0 0 0 14 2 L 14 5 A 1.0001 1.0001 0 1 0 16 5 L 16 2 A 
                1.0001 1.0001 0 0 0 14.984375 0.98632812 z M 5.796875 4.7988281 A 1.0001 1.0001 0 0 0 5.1015625 6.515625 
                L 7.2226562 8.6367188 A 1.0001 1.0001 0 1 0 8.6367188 7.2226562 L 6.515625 5.1015625 A 1.0001 1.0001 0 0 0 
                5.796875 4.7988281 z M 24.171875 4.7988281 A 1.0001 1.0001 0 0 0 23.484375 5.1015625 L 21.363281 7.2226562 
                A 1.0001 1.0001 0 1 0 22.777344 8.6367188 L 24.898438 6.515625 A 1.0001 1.0001 0 0 0 24.171875 4.7988281 z 
                M 15 8 C 11.134 8 8 11.134 8 15 C 8 18.866 11.134 22 15 22 C 18.866 22 22 18.866 22 15 C 22 11.134 18.866 8 
                15 8 z M 2 14 A 1.0001 1.0001 0 1 0 2 16 L 5 16 A 1.0001 1.0001 0 1 0 5 14 L 2 14 z M 25 14 A 1.0001 1.0001 
                0 1 0 25 16 L 28 16 A 1.0001 1.0001 0 1 0 28 14 L 25 14 z M 7.9101562 21.060547 A 1.0001 1.0001 0 0 0 7.2226562 
                21.363281 L 5.1015625 23.484375 A 1.0001 1.0001 0 1 0 6.515625 24.898438 L 8.6367188 22.777344 A 1.0001 1.0001 
                0 0 0 7.9101562 21.060547 z M 22.060547 21.060547 A 1.0001 1.0001 0 0 0 21.363281 22.777344 L 23.484375 24.898438 
                A 1.0001 1.0001 0 1 0 24.898438 23.484375 L 22.777344 21.363281 A 1.0001 1.0001 0 0 0 22.060547 21.060547 z M 14.984375 
                23.986328 A 1.0001 1.0001 0 0 0 14 25 L 14 28 A 1.0001 1.0001 0 1 0 16 28 L 16 25 A 1.0001 1.0001 0 0 0 14.984375 23.986328 z">
              </path>
            </svg>
        </span>
        <span
          className={classNames(
            checkEnable() ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100',
            'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="66" height="66"
viewBox="0 0 30 30"
className="bg-white h-3 w-3 text-indigo-600"><path d="M26.6421013,19.9179306c-1.9799805,4.2998047-6.3399658,7.0800781-11.0999756,7.0800781 c-6.7700195,0-12.2800293-5.5-12.2800293-12.2700205c0-5.3701172,3.4299927-10.0600586,8.5400391-11.6801758 c0.3800049-0.1196289,0.789978,0,1.0599976,0.300293c0.2600098,0.2998047,0.3200073,0.7197266,0.1499634,1.0800781 c-0.6300049,1.3496094-0.9599609,2.7998047-0.9599609,4.3198237c0,5.6699219,4.6199951,10.2797861,10.2799683,10.2797861 c1.0599976,0,2.1099854-0.1699219,3.1000366-0.4799805c0.3799438-0.1196289,0.789978-0.0097656,1.0599976,0.2900391 C26.7520866,19.1381454,26.8120842,19.5580673,26.6421013,19.9179306z"></path></svg>
        </span>
      </span>
    </Switch>
  )
}

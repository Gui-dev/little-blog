import Link from 'next/link'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from './../services/firebase'

export const Nav = () => {
  const [user, loading] = useAuthState(auth)

  return (
    <nav className="flex items-center justify-between py-10">
      <Link href="/">
        <button className="text-lg text-white font-medium">
          <span className="text-transparent bg-clip-text bg-gradient-text">
            Creative Minds
          </span>
        </button>
      </Link>
      <ul className="flex items-center gap-10">
        {!user && (
          <li>
            <Link href="/auth/login">
              <a className="text-sm text-zinc-800 font-medium ml-8 py-2 px-4 bg-green-500 rounded-lg hover:bg-green-400">
                Join Now
              </a>
            </Link>
          </li>
        )}

        {user && (
          <div className="flex items-center gap-6">
            <li>
              <Link href="/post">
                <button className="text-sm text-zinc-900 font-medium py-2 px-4 bg-cyan-500 rounded-md hover:bg-cyan-400">
                  Post
                </button>
              </Link>
            </li>

            <li>
              <div
                className="flex items-center justify-center align-middle h-[50px] w-[50px] bg-pink-300 rounded-full hover:bg-pink-500 "
              >
                <Link href="/dashboard">
                  <img
                    src={`${user ? user?.photoURL : ''}`}
                    alt={`${user ? user?.displayName : ''}`}
                    title={`${user ? user?.displayName : ''}`}
                    className="h-12 w-12 rounded-full cursor-pointer"
                  />
                </Link>

              </div>
            </li>
          </div>
        )}
      </ul>
    </nav>
  )
}

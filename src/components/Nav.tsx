import Link from 'next/link'

export const Nav = () => {
  return (
    <nav className="flex items-center justify-between py-10">
      <Link href="/">
        <button className="text-lg text-white font-medium">
          Creative Minds
        </button>
      </Link>
      <ul className="flex items-center gap-10">
        <li>
          <Link href="/auth/login">
            <a className="text-sm text-zinc-800 font-medium ml-8 py-2 px-4 bg-green-500 rounded-lg hover:bg-green-400">
              Join Now
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

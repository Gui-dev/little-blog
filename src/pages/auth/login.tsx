import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { FacebookLogo, GoogleLogo } from 'phosphor-react'
import { signInWithPopup, FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from './../../services/firebase'

const Login = () => {
  const route = useRouter()
  const [user, loading] = useAuthState(auth)
  const googleProvider = new GoogleAuthProvider()
  const facebookProvider = new FacebookAuthProvider()

  useEffect(() => {
    if (user) {
      route.push('/')
    } else {
      console.log('login')
    }
  }, [route, user])

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      console.log(error)
    }
  }

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="text-gray-200 mt-32 p10 rounded-lg shadow-xl">
      <h1 className="text-2xl font-medium">Join Today</h1>
      <div className="py-4">
        <h2 className="py-4">Sign in with one of the providers</h2>
        <button
          className="flex items-center justify-center gap-2 align-middle text-zinc-900 font-medium p-4  mt-4 w-full bg-yellow-300 rounded-lg hover:bg-yellow-400"
          onClick={handleGoogleLogin}
        >
          <GoogleLogo weight="bold" className="text-2xl" />
          Sign in with Google
        </button>
        <button
          className="flex items-center justify-center gap-2 align-middle text-zinc-900 font-medium p-4  mt-4 w-full bg-blue-300 rounded-lg hover:bg-blue-400"
          onClick={handleFacebookLogin}
        // disabled={true}
        >
          <FacebookLogo weight="bold" className="text-2xl" />
          Sign in with Facebook
        </button>
      </div>
    </section>
  )
}

export default Login

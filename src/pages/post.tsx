import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { clsx } from 'clsx'
import { toast } from 'react-toastify'

import Loading from '../components/Loading'
import { auth, db } from '../services/firebase'

type PostProps = {
  description: string
}

const Post = () => {
  const route = useRouter()
  const [user, loading] = useAuthState(auth)
  const [post, setPost] = useState<PostProps>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getData = async () => {
      if (loading) {
        return (
          <div className="flex items-center justify-center h-full">
            <Loading />
          </div>
        )
      }

      if (!user) {
        return route.push('/auth/login')
      }
    }
    getData()
  }, [user, loading, route])

  const handleSubmitPost = async (event: FormEvent) => {
    event.preventDefault()
    try {
      if (!post?.description) {
        toast.error('Description field empty 😅')
        return
      }
      if (post?.description.length > 300) {
        toast.error('Description too long 😅')
        return
      }

      setIsLoading(true)
      const collectionRef = collection(db, 'posts')
      await addDoc(collectionRef, {
        ...post,
        timestamp: serverTimestamp(),
        user: user?.uid,
        avatar: user?.photoURL,
        username: user?.displayName
      })
      setPost({ description: '' })
      route.push('/')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="flex items-center justify-center my-6 p-12 mx-auto max-w-md rounded-lg shadow-lg">
      <form onSubmit={handleSubmitPost}>
        <h1 className="text-2xl text-zinc-200 font-bold">
          Create a new post
        </h1>
        <div className="py-2">
          <h2 className="text-lg text-zinc-300 font-medium py-2">
            Description
          </h2>
          <textarea
            className={clsx(
              'text-sm text-zinc-200 p-2 h-48 w-full bg-zinc-900 rounded-lg outline-none focus:ring-1 ring-green-200',
              {
                'ring-pink-200': post && post?.description.length > 300
              }
            )}
            value={post?.description}
            onChange={(event) => setPost({ ...post, description: event.target.value })}
          >
          </textarea>
          <p
            className={clsx(
              'text-xs py-2 text-zinc-300',
              {
                'text-pink-400': post && post?.description.length > 300
              }
            )}
          >
            {post && post?.description.length > 0 ? post?.description.length : '0'}/300
          </p>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center text-sm text-zinc-900 font-medium bg-green-500 my-2 p-2 w-full rounded-lg hover:bg-green-400"
        >
          {
            isLoading
              ? <Loading />
              : 'Submit'
          }
        </button>
      </form>
    </section >
  )
}

export default Post

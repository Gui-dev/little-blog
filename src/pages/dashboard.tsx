import { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuthState } from 'react-firebase-hooks/auth'
import { PencilSimple, Power, Trash } from 'phosphor-react'

import { auth, db } from './../services/firebase'
import Loading from '../components/Loading'
import { PostProps } from '.'
import Message from '../components/Message'

const Dashboard = () => {
  const route = useRouter()
  const [user, loading] = useAuthState(auth)
  const [isLoading, setIsloading] = useState(false)
  const [posts, setPosts] = useState<PostProps[]>([])

  const handleSignOut = async () => {
    await signOut(auth)
  }

  const handleDeletePost = async (id: string) => {
    try {
      setIsloading(true)
      const docRef = doc(db, 'posts', id)
      await deleteDoc(docRef)
    } catch (error) {
      console.log(error)
    } finally {
      setIsloading(false)
    }
  }

  useEffect(() => {
    const getData = async () => {
      if (loading) {
        return (
          <div className="flex items-center justify-center">
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

  useEffect(() => {
    try {
      const postsData: PostProps[] = []
      const collectionRef = collection(db, 'posts')
      const queryResult = query(collectionRef, where('user', '==', user?.uid))
      const unsubscribe = onSnapshot(queryResult, (snapshot) => {
        snapshot.docs.forEach(doc => {
          const id = doc.id
          const data = doc.data()
          postsData.push(
            {
              id,
              user: data.user,
              username: data.username,
              description: data.description,
              avatar: data.avatar
            }
          )
          return setPosts(postsData)
        })
      })

      return unsubscribe
    } catch (error) {

    }
  }, [user?.uid])

  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="text-lg text-zinc-200 font-medium">
          Your posts
        </h1>
        <button
          onClick={handleSignOut}
          className="text-zinc-200 font-medium my-6 py-2 px-2 bg-pink-600 rounded-full hover:bg-pink-500"
          title="Sign out"
        >
          <Power weight="bold" />
        </button>
      </div>

      <div className="pt-2 pb-10">
        {posts.map(post => {
          return (
            <Message key={post.id} post={post}>
              <div className="flex items-center justify-end gap-4">
                <button
                  className="flex items-center justify-center gap-2 text-sm text-pink-600 py-2 hover:text-pink-500"
                  onClick={() => handleDeletePost(post.id)}
                >
                  {isLoading
                    ? <Loading />
                    : <Trash weight="bold" className="text-2xl" />
                  }
                </button>
                {/* @ts-ignore */}
                <Link href={{ pathname: '/post', query: post }}
                  className="flex items-center justify-center gap-2 py-2"
                >
                  <a className="text-2xl text-cyan-600 hover:text-cyan-500">
                    <PencilSimple weight="bold" />
                  </a>
                </Link>
              </div>
            </Message>
          )
        })}
      </div>
    </section>
  )
}

export default Dashboard

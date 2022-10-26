import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

import { db } from './../services/firebase'
import Loading from '../components/Loading'
import Message from '../components/Message'

export type PostProps = {
  id: string
  user: string
  username: string
  description: string
  avatar: string
  timestamp: {
    seconds: number
    nanoseconds: number
  }
}

const Home: NextPage = () => {
  const [hasPosts, setHasPosts] = useState(true)
  const [posts, setPosts] = useState<PostProps[]>([])

  useEffect(() => {
    getPosts()
  }, [])

  console.log('POSTS: ', posts)

  const getPosts = async () => {
    try {
      const postsData: PostProps[] = []
      const collectionRef = collection(db, 'posts')
      const queryResult = query(collectionRef, orderBy('timestamp', 'desc'))
      const unsubscribe = onSnapshot(queryResult, (snapshot) => {
        snapshot.docs.map(doc => {
          const id = doc.id
          const data = doc.data()
          postsData.push(
            {
              id,
              user: data.user,
              username: data.username,
              description: data.description,
              avatar: data.avatar,
              timestamp: {
                seconds: data.timestamp.seconds,
                nanoseconds: data.timestamp.nanoseconds
              }
            }
          )

          return setPosts(postsData)
        })
      })

      return () => unsubscribe
    } catch (error) {
      console.log(error)
    } finally {
      setHasPosts(false)
    }
  }

  if (hasPosts) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loading />
      </div>
    )
  }

  return (
    <section className="my-12">
      <h1 className="text-lg font-medium text-zinc-200">See what other people are saying</h1>

      {posts.map(post => {
        return (
          <Message key={post.id} post={post}>

          </Message>
        )
      })}
    </section>
  )
}

export default Home

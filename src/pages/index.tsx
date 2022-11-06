import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

import { db } from './../services/firebase'
import Loading from '../components/Loading'
import Message from '../components/Message'
import Link from 'next/link'

export type PostProps = {
  id: string
  user: string
  username: string
  description: string
  avatar: string
  comments?: {
    username: string
    avatar: string
    message: string
    timestamp?: {
      nanoseconds: number
      seconds: number
    }
  }[]
}

const Home: NextPage = () => {
  const [hasPosts, setHasPosts] = useState(true)
  const [posts, setPosts] = useState<PostProps[]>([])

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
              comments: data.comments
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

  useEffect(() => {
    getPosts()
  }, [])

  console.log(posts)

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
            {/* @ts-ignore */}
            <Link href={{ pathname: `/${post.id}`, query: post }}>
              <a className="text-lg font-bold text-zinc-500 hover:text-yellow-500 transition-colors">
                {
                  post.comments &&
                    post.comments?.length > 0
                    ? post.comments?.length
                    : '0'
                } comments
              </a>
            </Link>
          </Message>
        )
      })}
    </section>
  )
}

export default Home

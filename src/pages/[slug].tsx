import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { arrayUnion, doc, onSnapshot, Timestamp, updateDoc } from 'firebase/firestore'
import { auth, db } from '../services/firebase'
import { toast } from 'react-toastify'

import Message from '../components/Message'

type MessageProps = {
  avatar: string
  description: string
  id: string
  user: string
  username: string
}

type CommentProps = {
  username: string
  avatar: string
  message: string
  timestamp?: {
    nanoseconds: number
    seconds: number
  }
}

const Details = () => {
  const router = useRouter()
  const routeData = router.query as MessageProps
  const [message, setMessage] = useState<undefined | string>(undefined)
  const [allComments, setAllComments] = useState<CommentProps[]>([])

  const handleSubmitMessage = async (event: FormEvent) => {
    event.preventDefault()
    if (!message) {
      toast.error("Don't leave an empty message 😅")
      return
    }
    const docRef = doc(db, 'posts', routeData.id)
    await updateDoc(docRef, {
      comments: arrayUnion({
        username: auth.currentUser?.displayName,
        avatar: auth.currentUser?.photoURL,
        message,
        timestamp: Timestamp.now()
      })
    })
    toast.success('Message sent successfully 😃')
    setMessage('')
  }

  useEffect(() => {
    const checkUser = () => {
      if (!auth.currentUser) {
        return router.push('/auth/login')
      }
    }
    checkUser()
  }, [router])

  useEffect(() => {
    const getComments = async () => {
      if (!router.isReady) {
        return
      }
      const docRef = doc(db, 'posts', routeData.id)
      const unsubscribe = onSnapshot(docRef, snapshot => {
        if (!snapshot.exists()) {
          return
        }
        setAllComments(snapshot.data().comments as CommentProps[])
      })
      return unsubscribe
    }
    getComments()
  }, [router.isReady, routeData.id])

  console.log('Comments: ', allComments)

  return (
    <section>
      <Message key={routeData.id} post={routeData}>

      </Message>
      <div className="my-4">
        <form
          className="flex gap-2"
          onSubmit={handleSubmitMessage}
        >
          <input
            className="text-zinc-200 p-2 w-full bg-gray-800 rounded-lg outline-none focus:ring-1 ring-green-200"
            type="text"
            placeholder="Send a message 😃"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <button
            type="submit"
            className="flex items-center justify-center text-sm text-zinc-900 font-medium bg-green-500 py-2 px-4 rounded-lg hover:bg-green-400"
          >
            Submit
          </button>
        </form>

        <div className="py-6">
          <h2 className="text-lg font-medium text-zinc-200">Comments</h2>

          {
            allComments && allComments.length > 0
              ? allComments.map(comment => {
                return (
                  <article
                    key={comment.timestamp?.seconds}
                    className="p-4 my-4 bg-gray-700 border-b-2 border-gray-600 rounded-lg"
                  >
                    <div
                      className="flex items-center gap-4 mb-4"
                    >
                      <img
                        src={comment.avatar}
                        alt={comment.username}
                        title={comment.username}
                        className="w-8 rounded-full"
                      />
                      <h1 className="text-sm font-medium text-zinc-200">{comment.username}</h1>
                    </div>
                    <p className="text-sm text-zinc-200">
                      {comment.message}
                    </p>
                  </article>
                )
              })
              : <p className="text-sm text-zinc-500 mt-6">
                No comments at the moment
              </p>
          }

        </div>
      </div>
    </section>
  )
}

export default Details

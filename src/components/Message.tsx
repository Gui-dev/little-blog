import { ReactNode } from 'react'
import { PostProps } from './../pages/'

type MessageProps = {
  post: PostProps
  children: ReactNode
}

const Message = ({ post, children }: MessageProps) => {
  return (
    <article className="mt-8 p-8 bg-gray-800 border-b-2 border-gray-700 rounded-lg">
      <div className="flex items-center gap-2">
        <img
          src={post.avatar}
          alt={post.username}
          title={post.username}
          className="w-10 rounded-full"
        />
        <h1 className="text-lg font-medium text-zinc-200">
          {post.username}
        </h1>
      </div>
      <div className="py-4">
        <p className="text-sm text-zinc-200">
          {post.description}
        </p>
      </div>
      {children}
    </article>
  )
}

export default Message

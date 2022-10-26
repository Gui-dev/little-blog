import { Spinner } from 'phosphor-react'

const Loading = () => {
  return (
    <Spinner
      weight="bold"
      className="text-2xl text-pink-500 animate-spin"
    />
  )
}

export default Loading

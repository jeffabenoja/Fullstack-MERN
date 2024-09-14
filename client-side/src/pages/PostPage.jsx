import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useData } from "../context/AppDataContext"
import { Button, Spinner } from "flowbite-react"
import CallToAction from "../components/callToAction"
import CommentSection from "../components/CommentSection"

const PostPage = () => {
  const { fetchData, error, loading } = useData()
  const [formData, setFormData] = useState({})
  const { postSlug } = useParams()

  useEffect(() => {
    fetchData(`/api/post/getposts?slug=${postSlug}`, setFormData)
  }, [postSlug])

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    )
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {formData && formData.title}
      </h1>
      <Link
        to={`/search?category=${formData && formData.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs' className='uppercase'>
          {formData && formData.category}
        </Button>
      </Link>
      <img
        src={formData && formData.image}
        alt={formData && formData.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover'
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>
          {formData && new Date(formData.createdAt).toLocaleDateString()}
        </span>
        <span className='italic'>
          {formData && (formData?.content?.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className='p-3 max-w-2xl mx-auto w-full content'
        dangerouslySetInnerHTML={{ __html: formData && formData.content }}
      ></div>
      <div className='max-w-4xl mx-auto w-full'>
        <CallToAction />
      </div>
      <CommentSection postId={formData._id} />
    </main>
  )
}

export default PostPage

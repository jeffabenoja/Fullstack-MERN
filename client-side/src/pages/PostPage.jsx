import { Link, useParams } from "react-router-dom"
import { Button, Spinner } from "flowbite-react"
import CallToAction from "../components/callToAction"
import CommentSection from "../components/CommentSection"
import { usePosts } from "../hooks/usePosts"
import PostCard from "../components/PostCard"

const PostPage = () => {
  const { postSlug } = useParams()

  const POST_BY_SLUG = `/api/post/getposts?slug=${postSlug}`
  const { post, isLoading: loading } = usePosts(POST_BY_SLUG, postSlug)

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    )
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs' className='uppercase'>
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover'
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {post && (post?.content?.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className='p-3 max-w-2xl mx-auto w-full content'
        dangerouslySetInnerHTML={{ __html: post && post?.content }}
      ></div>
      <div className='max-w-4xl mx-auto w-full'>
        <CallToAction />
      </div>
      <CommentSection postId={post?._id} />
      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent Articles</h1>
        <div className='flex flex-col md:flex-row gap-5 mt-5 justify-center'>
          <PostCard url={`/api/post/getposts?limit=3`} />
        </div>
      </div>
    </main>
  )
}

export default PostPage

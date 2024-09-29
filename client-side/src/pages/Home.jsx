import CallToAction from "../components/callToAction"
import PostCard from "../components/PostCard"
import { Link } from "react-router-dom"
const Home = () => {
  return (
    <div>
      <div className='flex flex-col gap-6 px-3 p-28 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my Blog!</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed
          voluptatem libero, culpa impedit ipsam cupiditate animi voluptates!
          Libero nemo dicta numquam atque sed minus officia impedit eveniet
          reiciendis. Provident, corporis?
        </p>
        <Link
          to='/search'
          className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
        >
          View All Post
        </Link>
      </div>
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
        <div className='flex flex-wrap gap-5 '>
          <PostCard
            url={`/api/post/getposts`}
            queryKey={["post", "Home Post"]}
          />
        </div>
        <Link
          to='/search'
          className='text-lg text-teal-500 font-bold hover:underline text-center'
        >
          View All Post
        </Link>
      </div>
    </div>
  )
}

export default Home

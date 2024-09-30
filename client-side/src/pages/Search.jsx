import { TextInput, Select, Button } from "flowbite-react"
import { useState } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { nextPostPage } from "../api/post"
import { useInfiniteData } from "../hooks/useInfinite"

const Search = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const urlParams = new URLSearchParams(location.search)
  const [sidebarData, setSidebarData] = useState({
    searchTerm: urlParams.get("searchTerm") || "",
    sort: urlParams.get("sort") || "desc",
    category: urlParams.get("category") || "uncategorized",
  })
  const searchQuery = urlParams.toString()

  // Set the URL_POST dynamically based on the search parameters
  const URL_POST = `/api/post/getposts?${searchQuery}&startIndex=`

  // Infinite query for posts, auto-refetches on `searchQuery` change
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteData(["posts", searchQuery], URL_POST, searchQuery, nextPostPage)

  // Flatten pages into a single list of posts
  const posts = data?.pages.flatMap((page) => page.posts) || []

  // Unified handler for all input changes
  const handleChange = (e) => {
    const { id, value } = e.target
    setSidebarData((prev) => ({ ...prev, [id]: value }))
  }

  // Handle form submission and URL update
  const handleSubmit = (e) => {
    e.preventDefault()
    const queryParams = new URLSearchParams(sidebarData).toString()
    navigate(`/search?${queryParams}`)
  }

  const handleShowMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='flex items-center gap-2 w-full justify-between'>
            <label className='whitespace-nowrap font-semibold w-2/5'>
              Search Term:
            </label>
            <div className='w-3/6'>
              <TextInput
                placeholder='Search...'
                id='searchTerm'
                type='text'
                value={sidebarData?.searchTerm}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='flex items-center gap-2 w-full justify-between'>
            <label className='whitespace-nowrap font-semibold w-2/5'>
              Sort:
            </label>
            <div className='w-3/6'>
              <Select
                onChange={handleChange}
                value={sidebarData.sort}
                id='sort'
              >
                <option value='desc'>Latest</option>
                <option value='asc'>Oldest</option>
              </Select>
            </div>
          </div>
          <div className='flex items-center gap-2 w-full justify-between'>
            <label className='whitespace-nowrap font-semibold w-2/5'>
              Category
            </label>
            <div className='w-3/6'>
              <Select
                onChange={handleChange}
                value={sidebarData.category}
                id='category'
              >
                <option value='uncategorized'>Uncategorized</option>
                <option value='reactjs'>React.JS</option>
                <option value='nextjs'>Next.JS</option>
                <option value='javascript'>Javascript.JS</option>
                <option value='typescript'>Typescript</option>
              </Select>
            </div>
          </div>
          <Button type='submit' outline gradientDuoTone='purpleToPink'>
            Search By Filters
          </Button>
        </form>
      </div>
      <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'>
          Post Result
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!isLoading && posts?.length === 0 && (
            <p className='text-xl text-gray-500'>No posts found</p>
          )}

          {isLoading && <p className='text-xl text-gray-500'>Loading...</p>}

          {!isLoading &&
            posts &&
            posts.map((post) => (
              <div
                key={post._id}
                className='group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:!w-[360px] transition-all'
              >
                <Link to={`/post/${post.slug}`}>
                  <img
                    src={post.image}
                    alt='post cover'
                    className='h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20'
                  />
                </Link>
                <div className='p-3 flex flex-col gap-2'>
                  <p className='text-lg font-semibold line-clamp-2'>
                    {post.title}
                  </p>
                  <span className='italic text-sm'>{post.category}</span>
                  <Link
                    to={`/post/${post.slug}`}
                    className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
                  >
                    Read article
                  </Link>
                </div>
              </div>
            ))}
        </div>
        {hasNextPage && (
          <button
            onClick={handleShowMore}
            className='w-full text-teal-500 text-sm self-center py-7'
          >
            {isFetchingNextPage ? "Loading more..." : "Show More"}
          </button>
        )}
      </div>
    </div>
  )
}

export default Search

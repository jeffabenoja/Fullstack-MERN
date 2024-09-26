import { Table } from "flowbite-react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { HiOutlineExclamationCircle } from "react-icons/hi"
import CustomModal from "./CustomModal"
import { useInfiniteData } from "../hooks/useInfinite"
import { nextPostPage } from "../api/post"
import { useDeleteData } from "../hooks/useDeleteData"

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [idToDelete, setIdToDelete] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const API_POST_BY_USER_ID = `/api/post/getposts?userId=${currentUser._id}&startIndex=`
  const API_DELETE_POST_BY_USER_ID = `/api/post/deleteposts/${idToDelete}/${currentUser._id}`
  const queryKey = ["posts", currentUser._id]
  // Infinite query for posts
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteData(
      queryKey,
      API_POST_BY_USER_ID,
      currentUser._id,
      nextPostPage
    )

  const { deletePost } = useDeleteData(queryKey)

  // Flatten pages into a single list of posts
  const allPosts = data?.pages.flatMap((page) => page.posts) || []

  const handleDeletePost = () => {
    if (idToDelete) {
      deletePost(API_DELETE_POST_BY_USER_ID)
      setShowModal(false)
      setIdToDelete(null)
    }
  }

  const handleShowMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  return (
    <div className='table-auto w-full overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser?.isAdmin && allPosts.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {allPosts.map((post) => (
              <Table.Body className='divide-y' key={post._id}>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='text-gray-900 font-medium dark:text-white'
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell className='capitalize'>
                    {post.category}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                      onClick={() => {
                        setShowModal(true)
                        setIdToDelete(post._id)
                      }}
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='text-teal-500 hover:underline'
                      to={`/post/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {hasNextPage && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 text-sm self-center py-7'
            >
              {isFetchingNextPage ? "Loading more..." : "Show More"}
            </button>
          )}
        </>
      ) : (
        <p>There are no posts yet!</p>
      )}
      <CustomModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        icon={
          <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
        }
        title='Are you sure you want to delete this post?'
        description='This action cannot be undone and the post will be permanently removed.'
        confirmText='Yes, delete post'
        cancelText='No, cancel'
        onClick={handleDeletePost}
      />
    </div>
  )
}

export default DashPosts

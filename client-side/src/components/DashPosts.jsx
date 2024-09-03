import { Table } from "flowbite-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { usePost } from "../context/PostContext"

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user)
  const { showMore, userPost, fetchPost, showMorePost } = usePost()

  useEffect(() => {
    if (currentUser?.isAdmin) {
      fetchPost(currentUser._id)
    }
  }, [currentUser._id])

  const handleShowMore = () => {
    const startIndex = userPost.length

    showMorePost(currentUser._id, startIndex)
  }

  return (
    <div className='table-auto w-full overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userPost.length > 0 ? (
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
            {userPost.map((post) => (
              <Table.Body className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.img}
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
                    <span className='font-medium text-red-500 hover:underline cursor-pointer'>
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='text-teal-500 hover:underline'
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 text-sm self-center py-7'
            >
              Show More
            </button>
          )}
        </>
      ) : (
        <p>You have no post yet</p>
      )}
    </div>
  )
}

export default DashPosts

import React from "react"
import { useSelector } from "react-redux"
import { useQueries } from "@tanstack/react-query"
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi"
import { Button, Table } from "flowbite-react"
import { Link } from "react-router-dom"

const fetchData = async (url) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error("Failed to load post")
  }
  return res.json()
}
const DashBoard = () => {
  const { currentUser } = useSelector((state) => state.user)

  const query = useQueries({
    queries: [
      {
        queryKey: ["user", currentUser],
        queryFn: () => fetchData(`/api/user/getUsers?limit=5`),
        enabled: !!currentUser.isAdmin,
      },
      {
        queryKey: ["posts", currentUser],
        queryFn: () => fetchData(`/api/post/getposts?limit=5`),
        enabled: !!currentUser.isAdmin,
      },
      {
        queryKey: ["comments", currentUser],
        queryFn: () => fetchData(`/api/comment/getComments?limit=5`),
        enabled: !!currentUser.isAdmin,
      },
    ],
  })

  const [usersQuery, postsQuery, commentsQuery] = query
  // Data Destructuring
  const { data: user = [] } = usersQuery || {}
  const { data: post = [] } = postsQuery || {}
  const { data: comment = [] } = commentsQuery || {}

  return (
    <div className='p-3 w-full'>
      <div className='flex flex-col md:flex-row gap-4 justify-center '>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-gray-500 text-md uppercase'>Total User</h3>
              <p className='text-2xl '>{user.totalUsers}</p>
            </div>
            <HiOutlineUserGroup className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            {user.lastMonthUsers > 0 ? (
              <>
                <span className='flex text-green-500 items-center'>
                  <HiArrowNarrowUp />
                  {user.lastMonthUsers}
                </span>
                <div className='text-gray-500 '>Last Month</div>
              </>
            ) : (
              <div className='text-gray-500 '>Last Month</div>
            )}
          </div>
        </div>

        <div className='flex flex-col  p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-gray-500 text-md uppercase'>Total Post</h3>
              <p className='text-2xl '>{post.totalPosts}</p>
            </div>
            <HiDocumentText className='bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            {post.lastMonthPosts > 0 ? (
              <>
                <span className='flex text-green-500 items-center'>
                  <HiArrowNarrowUp />
                  {post.lastMonthPosts}
                </span>
                <div className='text-gray-500 '>Last Month</div>
              </>
            ) : (
              <div className='text-gray-500 '>No New Post Last Month</div>
            )}
          </div>
        </div>

        <div className='flex flex-col  p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-gray-500 text-md uppercase'>
                Total Comments
              </h3>
              <p className='text-2xl '>{comment.totalComments}</p>
            </div>
            <HiAnnotation className='bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            {comment.lastMonthComments > 0 ? (
              <>
                <span className='flex text-green-500 items-center'>
                  <HiArrowNarrowUp />
                  {comment.lastMonthComments}
                </span>
                <div className='text-gray-500 '>Last Month</div>
              </>
            ) : (
              <div className='text-gray-500 '>No New Comment Last Month</div>
            )}
          </div>
        </div>
      </div>

      <div className='flex flex-wrap gap-4 py-3 justify-center w-full'>
        <div className='flex flex-col w-full md:!w-5/12  shawdow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent Users</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to='/dashboard?tab=users'>See All</Link>
            </Button>
          </div>
          <Table>
            <Table.Head>
              <Table.HeadCell>
                <span className='text-gray-500'>User Image</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className='text-gray-500'>Username</span>
              </Table.HeadCell>
            </Table.Head>
            {user && user.users ? (
              user.users.map((user) => (
                <Table.Body key={user._id} className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt=''
                        className='w-10 h-10 rounded-full bg-gray-500'
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))
            ) : (
              <Table.Body className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell colSpan='2' className='text-center'>
                    No recent users found.
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            )}
          </Table>
        </div>

        <div className='flex flex-col w-full md:!w-5/12  shawdow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent Posts</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to='/dashboard?tab=posts'>See All</Link>
            </Button>
          </div>
          <Table>
            <Table.Head>
              <Table.HeadCell>
                <span className='text-gray-500'>Post Image</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className='text-gray-500'>Post Title</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className='text-gray-500'>Post Category</span>
              </Table.HeadCell>
            </Table.Head>
            {post && post.posts ? (
              post.posts.map((post) => (
                <Table.Body key={post._id} className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      <img
                        src={post.image}
                        alt='Post Image'
                        className='w-14 h-10 rounded-md bg-gray-500'
                      />
                    </Table.Cell>
                    <Table.Cell className='w-96'>{post.title}</Table.Cell>
                    <Table.Cell className='w-5'>{post.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))
            ) : (
              <Table.Body className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell colSpan='2' className='text-center'>
                    No recent posts found.
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            )}
          </Table>
        </div>

        <div className='flex flex-col w-full md:!w-5/12 shawdow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent Comments</h1>
          </div>
          <Table>
            <Table.Head>
              <Table.HeadCell>
                <span className='text-gray-500'>COmment Content</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className='text-gray-500'>Likes</span>
              </Table.HeadCell>
            </Table.Head>
            {comment && comment.comments ? (
              comment.comments.map((comment) =>
                comment.numberOfLikes === 0 ? (
                  <></>
                ) : (
                  <Table.Body key={comment._id} className='divide-y'>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell className='w-96'>
                        <p>
                          <span className='line-clamp-2'>
                            {comment.content}
                          </span>
                        </p>
                      </Table.Cell>
                      <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                )
              )
            ) : (
              <Table.Body className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell colSpan='2' className='text-center'>
                    No recent comments found.
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            )}
          </Table>
        </div>
      </div>
    </div>
  )
}

export default DashBoard

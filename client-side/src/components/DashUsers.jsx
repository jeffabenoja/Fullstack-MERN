import { Table } from "flowbite-react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { HiOutlineExclamationCircle } from "react-icons/hi"
import { FaCheck, FaTimes } from "react-icons/fa"
import CustomModal from "./CustomModal"
import { useInfiniteData } from "../hooks/useInfinite"
import { useDeleteData } from "../hooks/useDeleteData"
import { nextUserPage } from "../api/apiUrl"

const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [idToDelete, setIdToDelete] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const API_DELETE_USER_BY_USER_ID = `/api/user/delete/${idToDelete}`
  const API_USER_BY_USER_ID = `/api/user/getusers?startIndex=`
  const queryKey = ["users", currentUser._id]

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteData(
      queryKey,
      API_USER_BY_USER_ID,
      currentUser._id,
      nextUserPage
    )
  const { deletePost } = useDeleteData(queryKey)

  // Flatten pages into a single list of posts
  const allUsers = data?.pages.flatMap((page) => page.users) || []

  const handleShowMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  const handleDeleteUser = () => {
    if (idToDelete) {
      deletePost(API_DELETE_USER_BY_USER_ID)
      setShowModal(false)
      setIdToDelete(null)
    }
  }

  return (
    <div className='table-auto w-full overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser?.isAdmin && allUsers?.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {allUsers.map((user) => (
              <Table.Body className='divide-y' key={user?._id}>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={user?.profilePicture}
                      alt={user?.username}
                      className='w-10 h-10 object-cover rounded-full bg-gray-500'
                    />
                  </Table.Cell>
                  <Table.Cell>{user?.username}</Table.Cell>
                  <Table.Cell>{user?.email}</Table.Cell>
                  <Table.Cell>
                    {user?.isAdmin ? (
                      <FaCheck className='text-green-500' />
                    ) : (
                      <FaTimes className='text-red-500' />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                      onClick={() => {
                        setShowModal(true)
                        setIdToDelete(user._id)
                      }}
                    >
                      Delete
                    </span>
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
        <p>There is no users yet!</p>
      )}
      <CustomModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        icon={
          <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
        }
        title='Are you sure you want to delete this user?'
        description='This action cannot be undone and the account will be permanently removed.'
        confirmText='Yes, delete user'
        cancelText='No, cancel'
        onClick={handleDeleteUser}
      />
    </div>
  )
}

export default DashUsers

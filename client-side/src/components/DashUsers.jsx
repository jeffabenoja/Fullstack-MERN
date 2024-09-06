import { Table } from "flowbite-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { HiOutlineExclamationCircle } from "react-icons/hi"
import { FaCheck, FaTimes } from "react-icons/fa"
import CustomModal from "./CustomModal"
import { useData } from "../context/AppDataContext"

const DashUsers = () => {
  const {
    showMoreUsers,
    data,
    fetchData,
    showMoreData,
    showModal,
    deleteData,
    setShowModal,
  } = useData()
  const { currentUser } = useSelector((state) => state.user)
  const [IdToDelete, setIdToDelete] = useState(null)

  useEffect(() => {
    if (currentUser?.isAdmin) {
      fetchData(`/api/user/getusers`)
    }
  }, [currentUser._id])

  const handleShowMore = () => {
    const startIndex = data.length

    showMoreData(`/api/user/getusers?startIndex=${startIndex}`, false)
  }

  const handleDeleteUser = () => {
    deleteData(`/api/user/deleteuser/`, currentUser._id)
  }

  return (
    <div className='table-auto w-full overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && data.length > 0 ? (
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
            {data.map((user) => (
              <Table.Body className='divide-y' key={user._id}>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className='w-10 h-10 object-cover rounded-full bg-gray-500'
                    />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    {user.isAdmin ? (
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
          {showMoreUsers && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 text-sm self-center py-7'
            >
              Show More
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

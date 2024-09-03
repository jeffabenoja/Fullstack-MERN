import React from "react"
import { Modal, Button } from "flowbite-react"

const CustomModal = ({
  showModal,
  onClose,
  icon,
  title,
  description,
  confirmText,
  cancelText,
  onClick,
  confirmColor = "failure",
  cancelColor = "gray",
}) => {
  return (
    <Modal show={showModal} onClose={onClose} popup size='md'>
      <Modal.Header />
      <Modal.Body>
        <div className='text-center'>
          {icon && <>{icon}</>}
          <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
            {title}
          </h3>
          <p className='text-sm text-gray-500 dark:text-gray-400 mb-5'>
            {description}
          </p>
          <div className='flex justify-center gap-4'>
            <Button color={confirmColor} onClick={onClick}>
              {confirmText}
            </Button>
            <Button color={cancelColor} onClick={onClose}>
              {cancelText}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default CustomModal

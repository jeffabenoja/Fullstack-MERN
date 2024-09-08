import { Button } from "flowbite-react"

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center rounded-tl-3xl rounded-br-3xl text-center'>
      <div className='flex-1 justify-center flex flex-col'>
        <h2 className='text-2xl'>Want to learn more about JavaScript?</h2>
        <p className="text-gray-500 my-2">Check out this 100 JavaScript Projects</p>
        <Button
          gradientDuoTone='purpleToPink'
          className='rounded-tl-xl rounded-bl-none'
        >
          <a
            href='https://www.100jsprojects.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn More?
          </a>
        </Button>
      </div>
      <div className='p-7 flex-1'>
        <img
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJA6UFV6kBwQkGnmhpKTjNlTnO2WTq9WdjxA&s'
          alt=''
        />
      </div>
    </div>
  )
}

export default CallToAction

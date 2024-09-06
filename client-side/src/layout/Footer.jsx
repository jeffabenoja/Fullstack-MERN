import { Footer as FlowbiteFooter } from "flowbite-react"
import { Link } from "react-router-dom"
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs"

const Footer = () => {
  return (
    <FlowbiteFooter container className='border border-t-8 border-teal-500 '>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link
              to='/'
              className='text-lg sm:text-xl whitespace-nowrap self-center font-semibold dark:text-white'
            >
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-yellow-200 rounded'>
                Tatche's
              </span>
              Website
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <FlowbiteFooter.Title title='About' />
              <FlowbiteFooter.LinkGroup col>
                <FlowbiteFooter.Link
                  href='https://github.com/jsvigneshkanna/100-react-projects'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  100 ReactJS Projects
                </FlowbiteFooter.Link>
                <FlowbiteFooter.Link
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Tatche's Website
                </FlowbiteFooter.Link>
              </FlowbiteFooter.LinkGroup>
            </div>
            <div>
              <FlowbiteFooter.Title title='Follow Us' />
              <FlowbiteFooter.LinkGroup col>
                <FlowbiteFooter.Link
                  href='https://github.com/jeffabenoja'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Github
                </FlowbiteFooter.Link>
                <FlowbiteFooter.Link
                  href='#'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Discord
                </FlowbiteFooter.Link>
              </FlowbiteFooter.LinkGroup>
            </div>
            <div>
              <FlowbiteFooter.Title title='Legal' />
              <FlowbiteFooter.LinkGroup col>
                <FlowbiteFooter.Link href='#'>
                  Privacy Policy
                </FlowbiteFooter.Link>
                <FlowbiteFooter.Link href='#'>
                  Terms &amp; Conditions
                </FlowbiteFooter.Link>
              </FlowbiteFooter.LinkGroup>
            </div>
          </div>
        </div>
        <FlowbiteFooter.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <FlowbiteFooter.Copyright
            href='#'
            by="Tatche's Website"
            year={new Date().getFullYear()}
          />
          <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
            <FlowbiteFooter.Icon href='#' icon={BsFacebook} />
            <FlowbiteFooter.Icon href='#' icon={BsInstagram} />
            <FlowbiteFooter.Icon href='#' icon={BsTwitter} />
            <FlowbiteFooter.Icon
              href='https://github.com/jeffabenoja'
              icon={BsGithub}
            />
            <FlowbiteFooter.Icon href='#' icon={BsDribbble} />
          </div>
        </div>
      </div>
    </FlowbiteFooter>
  )
}

export default Footer

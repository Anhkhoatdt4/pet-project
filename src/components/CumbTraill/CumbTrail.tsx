import { Link } from 'react-router-dom'

const CumbTrail = ({ links }: { links: { title: string; path: string }[] }) => {
  return (
    <nav className='flex' aria-label='CumbTrail'>
        <ol className='inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse'>
            {
                links.map((link,index) => (
                    <li className='inline-flex items-center'>
                        <Link to={link?.path} className='inline-flex items-center text-sm font-medium text-gray-500'>
                            {link.title}
                        </Link>
                        {
                        (links?.length - 1) !== index &&
                        <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 9l4-4-4-4"></path>
                        </svg>
                        }
                    </li>
                ))
            }
        </ol>
    </nav>
  )
}

export default CumbTrail

// Component that renders the login form and gives perform the login action
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Login and Manage your <span className="text-black">Patients</span></h1>
      </div>
      <div>
        <form action="">
          <div className="my-6">
            <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
            <input type="email" id="email" placeholder="Register email" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
          </div>
          <div className="my-6">
            <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
            <input type="password" id="password" placeholder="Your password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
          </div>
          <input type="submit" value="Login" className="bg-indigo-700 text-white font-bold rounded-xl w-full py-3 uppercase mt-5  hover:cursor-pointer hover:bg-indigo-900 md:w-auto px-16" />
        </form>
        <nav className='mt-10'>
          <ul className="lg:flex lg:justify-between mt-5 text-center">
            <li>
              <Link to="/forget-password" className="text-indigo-500 hover:text-indigo-900">Forget password?</Link>
            </li>
            <li>
              <Link to="/register" className="text-indigo-500 hover:text-indigo-900">Register</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Login

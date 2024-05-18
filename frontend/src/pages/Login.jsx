// Component that renders the login form and gives perform the login action
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Alert from '../components/Alert';
import axiosClient from '../config/axios';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if([email, password].includes('')) {
      setAlert({
        type: 'alert',
        msg: 'All fields are required'
      });
      return;
    }
    setAlert(null);
    try {
      const { data } = await axiosClient.post('/login', { email, password });
      localStorage.setItem('token', data.token);
      navigate('/admin');
    } catch (error) {
      setAlert({
        type: 'alert',
        msg: error.response.data.error
      });
    }
  }

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Login and Manage your <span className="text-black">Patients</span></h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {
          alert && <Alert type={alert.type} msg={alert.msg} />
        }
        <form onSubmit={handleSubmit}>
          <div className="my-6">
            <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
            <input type="email" id="email" placeholder="Register email" value={email} onChange={e => setEmail(e.target.value)} className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
          </div>
          <div className="my-6">
            <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
            <input type="password" id="password" placeholder="Your password" value={password} onChange={e => setPassword(e.target.value)} className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
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

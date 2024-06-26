import { Link }  from 'react-router-dom'
import { useState } from 'react'
import Alerta from '../components/Alert'
import axiosClient from '../config/axios'

const ForgetPassword = () => {

    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState(null);

    const handleSubmit = async (e) => {
        try {
          e.preventDefault();
          if (!email || email.length < 10) {
            setAlert({
              type: 'alert',
              msg: 'Email is required'
            });
            return;
          }
          setAlert(null);
          const response = await axiosClient.post('/reset-password', { email });
          if (response.status === 200){
            setAlert({
              type: 'success',
              msg: response.data.message
            });
          }
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
            <h1 className="text-indigo-600 font-black text-6xl">Recover your Access and not Stray your <span className="text-black">Patients</span></h1>
          </div>
          <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
            {
              alert && <Alerta type={alert.type} msg={alert.msg} />
            }
            <form onSubmit={handleSubmit}>
              <div className="my-6">
                <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" id="email" placeholder="Your email" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
              </div>
              <input type="submit" value="Send instructions" className="bg-indigo-700 text-white font-bold rounded-xl w-full py-3 uppercase mt-5  hover:cursor-pointer hover:bg-indigo-900 md:w-auto px-16" />
            </form>
            <nav className='mt-10'>
              <ul className="lg:flex lg:justify-between mt-5 text-center">
                <li>
                  <Link to="/" className="text-indigo-500 hover:text-indigo-900">Do you already have an account? Login</Link>
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

export default ForgetPassword

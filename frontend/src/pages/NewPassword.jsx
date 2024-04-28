import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import Alert from '../components/Alert';
import axiosClient from '../config/axios';

const NewPassword = () => {

    const [alert, setAlert] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password || password.length < 6) {
            setAlert({
                type: 'alert',
                msg: 'Password is required and must be at least 6 characters'
            });
            return;
        }
        if (password !== confirmPassword) {
            setAlert({
                type: 'alert',
                msg: 'Passwords do not match'
            });
            return;
        }
        setAlert(null);

        resetPassword();
    }

    const resetPassword = async () => {
        try {
            let response = await axiosClient.get(`/reset-password/${token}`, { token });
            if(response.status !== 200){
                setAlert({
                    type: 'error',
                    msg: response.data.message
                });
                return;
            }
            response = await axiosClient.post(`/reset-password/${token}`, { password, token });
            if(response.status === 200){
                setAlert({
                    type: 'success',
                    msg: response.data.message
                });
            }
            return;
        } catch (error) {
            setAlert({
                type: 'error',
                msg: error.response.data.msg
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
                alert && <Alert type={alert.type} msg={alert.msg} />
            }
            <form onSubmit={handleSubmit}>
                <div className="my-6">
                    <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} id="password" placeholder="Your password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
                </div>
                <div className="my-6">
                    <label htmlFor="confirm-password" className="uppercase text-gray-600 block text-xl font-bold">Confirm Password</label>
                    <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" id="confirm-password" placeholder="Confirm your password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
                </div>
                <input type="submit" value="Change Password" className="bg-indigo-700 text-white font-bold rounded-xl w-full py-3 uppercase mt-5  hover:cursor-pointer hover:bg-indigo-900 md:w-auto px-16" />
            </form>
            <nav className='mt-10 text-center'>
                <Link to="/" className="text-indigo-500 hover:text-indigo-900">Login</Link>
            </nav>
          </div>
    </>
  )
}

export default NewPassword

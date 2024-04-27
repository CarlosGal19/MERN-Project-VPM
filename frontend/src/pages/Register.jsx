import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Alert from '../components/Alert'

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [alert, setAlert] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if([name, email, password, repeatPassword].includes('')) {
            setAlert({
                type: 'alert',
                msg: 'All fields are required'
            });
            return;
        }
        if(password !== repeatPassword) {
            setAlert({
                type: 'alert',
                msg: 'Passwords do not match'
            });
            return;
        }
        if(password.length < 6) {
            setAlert({
                type: 'alert',
                msg: 'Password must be at least 6 characters'
            });
            return;
        }
        setAlert(null);

        try {
            const url = 'http://localhost:4000/vet';
            const response = await axios.post(url, {
                name,
                email,
                password
            });
            if(response.status === 200) {
                setAlert({
                    type: 'success',
                    msg: 'Check your email to activate your account. Redirecting to login...'
                });
                setTimeout(() => {
                    window.location.href = '/';
                }, 3000);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">Create your account and manage your <span className="text-black">Patients</span></h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {
                    alert && <Alert type={alert.type} msg={alert.msg} />
                }
                <form onSubmit={handleSubmit}>
                    <div className="my-6">
                        <label htmlFor="name" className="uppercase text-gray-600 block text-xl font-bold">Name</label>
                        <input type="text" id="name" placeholder="Your name" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={name} onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className="my-6">
                        <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input type="email" id="email" placeholder="Register email" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="my-6">
                        <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                        <input type="password" id="password" placeholder="Your password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="my-6">
                        <label htmlFor="repeat-password" className="uppercase text-gray-600 block text-xl font-bold">Repeat Password</label>
                        <input type="password" id="repeat-password" placeholder="Repeat your password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} />
                    </div>
                    <input type="submit" value="Register" className="bg-indigo-700 text-white font-bold rounded-xl w-full py-3 uppercase mt-5  hover:cursor-pointer hover:bg-indigo-900 md:w-auto px-16" />
                </form>
                <nav className='mt-10'>
                    <ul className="lg:flex lg:justify-between mt-5 text-center">
                        <li>
                        <Link to="/" className="text-indigo-500 hover:text-indigo-900">Do you already have an account? Login</Link>
                        </li>
                        <li>
                        <Link to="/forget-password" className="text-indigo-500 hover:text-indigo-900">Forget password?</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Register

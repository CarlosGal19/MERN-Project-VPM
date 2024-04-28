import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axiosClient from '../config/axios';
import Alert from '../components/Alert';

const ConfirmAccount = () => {

  const [confirm, setConfirm] = useState(false);
  const [load, setLoad] = useState(true);
  const [alert, setAlert] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axiosClient.get(`/confirm/${id}`);
        if (response.status === 200) {
          setConfirm(true);
          setAlert({
            type: 'success',
            msg: 'Account confirmed. Go to login'
          });
        }
      } catch (error) {
        setAlert({
          type: 'alert',
          msg: error.response.data.error
        });
      } finally {
        setLoad(false);
      }
    };
    return () => checkToken();
  }, [id]);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Confirm your account and manage your <span className="text-black">Patients</span></h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {
          !load && <Alert type={alert.type} msg={alert.msg} />
        }
        {
          confirm && (
            <>
              <nav className='mt-10 text-center'>
                <Link to="/" className="text-indigo-500 hover:text-indigo-900">Login</Link>
              </nav>
            </>
          )
        }

      </div>
    </>
  )
}

export default ConfirmAccount

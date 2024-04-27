import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Alert from '../components/Alert';

const ConfirmAccount = () => {

  const [alert, setAlert] = useState(null);
  const [load, setLoad] = useState(true);
  const { id } = useParams();

  const checkToken = async () => {
    try {
      const url = `http://localhost:4000/vet/confirm/${id}`;
      const response = await axios.get(url);
      if(response.status === 200) {
        setAlert({
          type: 'success',
          msg: 'Account confirmed. Redirecting to login...'
        });
        setTimeout(() => {
          window.location.href = '/';
        }, 5000);
      }
    } catch (error) {
      setAlert({
        type: 'alert',
        msg: error.response.data.error
      });
    }
    setLoad(false);
  }

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Confirm your account and manage your <span className="text-black">Patients</span></h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {
          !load && <Alert type={alert.type} msg={alert.msg} />
        }
      </div>
    </>
  )
}

export default ConfirmAccount

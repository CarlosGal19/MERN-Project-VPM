const Alert = (alert) => {
  return (
    <>
        <div className="alert alert-danger text-center block bg-red-600 text-white text-bold text-xl rounded-2xl py-5" role="alert">
            {alert.msg}
        </div>
    </>
  )
}

export default Alert

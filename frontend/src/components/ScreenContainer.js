import React from 'react'

const ScreenContainer = ({
  title = 'screen Name',
  description = 'description',
  className = 'bg-dark text-white p-4',
  children
}) => {
  return (
    <div>
      <div className='container-fluid'>
        <div className='jumbotron bg-dark text-white text-center'>
          <h2 className='display-4'>{title}</h2>
          <p className='lead'>{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className='text-center py-3'>
        CopyRight &copy; AchyuthReddy
      </footer>
    </div>
  )
}

export default ScreenContainer

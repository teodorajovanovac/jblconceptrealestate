import React from 'react'
import './ErrorPage.css'

const ErrorPage: React.FC = () => {
  return (
    <>
    <div className='main'>
    <div className='errorpage'>
      <h1 className="text-jumbo ">Oops!</h1>
          <h2>We can't seem to find the page you're looking for.</h2>
          <h6>Error code: 404</h6>
          <ul className="list-unstyled">
            <li>Here are some helpful links instead:</li>
            <li><a href="/">Home</a></li>
            <li><a href="/search">Search</a></li>
            <li><a href="/sitemaps">Sitemap</a></li>
          </ul>
    </div>
    </div>
    </>
    
  )
}

export default ErrorPage;

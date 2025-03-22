import React from 'react'
import './ErrorPage.css'
import { useCmsData } from "../services/CmsProvider"

const ErrorPage: React.FC = () => {
  const { t } = useCmsData();

  return (
    <>
    <div className='main'>
    <div className='errorpage'>
      <h1 className="text-jumbo">{t("error-title")}</h1>
          <h2>{t("error-subtitle")}</h2>
          <h6>{t("error-code")}</h6>
          <ul className="list-unstyled">
            <li>{t("error-helpful-links")}</li>
            <li><a href="/">{t("error-home")}</a></li>
            <li><a href="/search">{t("error-search")}</a></li>
            <li><a href="/sitemaps">{t("error-sitemap")}</a></li>
          </ul>
    </div>
    </div>
    </>
  )
}

export default ErrorPage;

import React from 'react'
import { Helmet } from 'react-helmet'

const TitleHelmet = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title> {title} </title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}
TitleHelmet.defaultProps = {
  title: 'geekcart geekskool',
  keywords: 'we sell great products for geeks',
  description: 'electronics, cheap electronics, great brands'
}

export default TitleHelmet

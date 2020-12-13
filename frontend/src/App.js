import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Footer from './components/Footer'
import Header from './components/Header'
import Home from './screens/Home'
import ProductScreen from './screens/ProductScreen'
import Login from './screens/Login'
import Register from './screens/Register'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={Home} exact />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App

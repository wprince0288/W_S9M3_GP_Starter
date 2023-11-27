import './styles/reset.css'
import './styles/styles.css'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, NavLink, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'

const root = createRoot(document.getElementById('root'))

root.render(
  <Router>
    <div className="routing">
      <h2>ACME Site</h2>
      <nav>
        <NavLink to="login">Login</NavLink> <NavLink to="/">Home</NavLink>
      </nav>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  </Router>
)

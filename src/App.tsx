import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import Create from './pages/create'
import DropEditor from './pages/dropeditor'
import Demo from './pages/demo'
import Project from './pages/project'
import ProjectManager from './pages/project_manager'
import Creator from './pages/creator'
import Reservation from './pages/reservation'

import Header from './components/Header'
import Footer from './components/Footer'
import WalletContextProvider from './contexts/WalletContextProvider'
import Background from './components/Background'
import ClaimPage from './pages/claimPage'

const App: React.FC<{}> = () => {

  return (
    <WalletContextProvider>
      <div className="text-medici-primary relative overflow-auto min-h-full">
        <Router>
          <main className="font-sans mt-16">
            <Background />
            <Header />
            <div className="z-1 relative">
              <Routes>
                <Route path="/create" element={<Creator />} />
                <Route path="/launch" element={<DropEditor />} />
                <Route path="/page/:name" element={<ClaimPage />} />
                <Route path="/projects" element={<ProjectManager/>}/>
                <Route path="/project/:contractaddress" element={<Project />} />
                <Route path="/reservation/:name" element={<Reservation />} />
                <Route path="/" element={<Home />} />
              </Routes>
            </div>
          </main>
        </Router>
      </div>
    </WalletContextProvider>
  )
}

export default App

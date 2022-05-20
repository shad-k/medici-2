import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import Create from './pages/create'
import DropEditor from './pages/dropeditor'
import Demo from './pages/demo'
import Project from './pages/project'

import Header from './components/Header'
import Footer from './components/Footer'
import WalletContextProvider from './contexts/WalletContextProvider'
import Background from './components/Background'


const App: React.FC<{}> = () => {
  return (
    <WalletContextProvider>
      <div className="text-medici-primary relative overflow-auto min-h-full">
        <Router>
          <main className="font-sans mt-16 pb-6">
            <Background />
            <Header />
            <div className="z-1 relative">
              <Routes>
                <Route path="/demo" element={<Demo/>}/>
                <Route path="/create" element={<Create/>}/>
                <Route path="/launch" element={<DropEditor/>}/>
                <Route
                  path="/project/:contractaddress"
                  element={<Project />}
                />
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

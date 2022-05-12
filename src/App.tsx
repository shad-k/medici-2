import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import Create from './pages/create'
import DropEditor from './pages/dropeditor'
import Demo from './pages/demo'
import Header from './components/Header'
import Footer from './components/Footer'
import WalletContextProvider from './contexts/WalletContextProvider'
import ProjectContextProvider from './contexts/ProjectContextProvider'
import Background from './components/Background'

const App: React.FC<{}> = () => {
  return (
    <WalletContextProvider>
      <ProjectContextProvider>
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
                <Route path="/" element={<Home />} />
              </Routes>
            </div>
          </main>
        </Router>
      </div>
      </ProjectContextProvider>
    </WalletContextProvider>
  )
}

export default App

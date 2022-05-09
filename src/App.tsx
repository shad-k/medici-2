import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import Collection from './pages/collection'
import Asset from './pages/asset'
import Create from './pages/create'
import DropEditor from './pages/dropeditor'
import Header from './components/Header'
import Footer from './components/Footer'
import AllCollectionsPage from './pages/collections'
import WalletContextProvider from './components/WalletContextProvider'
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
                {/* <Route path="/collections" element={<AllCollectionsPage />} />
                <Route path="/collection/:id" element={<Collection />} />
                <Route
                  path="/asset/:collectionId/:tokenId"
                  element={<Asset />}
                /> */}
                <Route path="/create" element={<Create/>}/>
                <Route path="/launch" element={<DropEditor/>}/>
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

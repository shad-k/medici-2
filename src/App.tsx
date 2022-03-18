import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import Collection from './pages/collection'
import Asset from './pages/asset'
import Header from './components/Header'
import AllCollectionsPage from './pages/collections'
import WalletContextProvider from './components/WalletContextProvider'

const App: React.FC<{}> = () => {
  return (
    <WalletContextProvider>
      <div className="bg-background border-t border-transparent h-full">
        <Router>
          <Header />
          <main className="bg-background text-text-primary font-sans mt-16 pb-6 h-[calc(100%-64px)] overflow-auto">
            <Routes>
              <Route path="/collections" element={<AllCollectionsPage />} />
              <Route path="/collection/:id" element={<Collection />} />
              <Route path="/asset/:collectionId/:tokenId" element={<Asset />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
        </Router>
      </div>
    </WalletContextProvider>
  )
}

export default App

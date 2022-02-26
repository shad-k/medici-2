import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import Collection from './pages/collection'
import Asset from './pages/asset'
import Header from './components/Header'

const App: React.FC<{}> = () => {
  return (
    <div className="bg-background border-t border-transparent h-full">
      <Router>
        <Header />
        <main className="bg-background text-text-primary font-sans mt-16 pb-6 min-h-[calc(100%-64px)]">
          <Routes>
            <Route path="/collection/:slug" element={<Collection />} />
            <Route path="/asset/:collectionSlug/:tokenId" element={<Asset />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App

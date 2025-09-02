import './App.css'
import { useState } from 'react'
import ChangeBgButton from './components/ChangeBgButton'
import SimpleBgButton from './components/SimpleBgButton'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [mode, setMode] = useState<'optimistic' | 'simple'>('optimistic')
  return (
    <div>
      <h1>Background Color Demo — using {mode === 'optimistic' ? 'Optimistic Mutation' : 'Simple Mutation'}</h1>
      <nav style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button onClick={() => setMode('optimistic')} disabled={mode === 'optimistic'}>Optimistic</button>
        <button onClick={() => setMode('simple')} disabled={mode === 'simple'}>Simple</button>
      </nav>
      {mode === 'optimistic' ? <ChangeBgButton /> : <SimpleBgButton />}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar theme="light" />
    </div>
  )
}

export default App



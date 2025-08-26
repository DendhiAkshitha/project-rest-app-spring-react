import { useState } from 'react'
 
export default function UserForm({ onAdd }) {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
 
  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    try {
      await onAdd({ name: name.trim() })
      setName('')
    } finally {
      setLoading(false)
    }
  }
 
  return (
    <form 
    className="card" 
    onSubmit={handleSubmit} 
    style={{ 
        marginBottom: '1rem', 
        display: 'grid', 
        gap: '0.75rem', 
        gridTemplateColumns: '1fr auto' 
        }}
        >
       <input className = "input" placeholder = "Enter name" value = {name} onchange = {e => setName(e.target.value)} />
      <button className="button" disabled={loading}>
        {loading ? 'Adding…' : 'Add User'}
      </button>
    </form>
  )
}
 
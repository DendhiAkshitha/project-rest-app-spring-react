import { useEffect, useState } from 'react'
import { api } from './api'
import UserList from './components/UserList'
import UserForm from './components/UserForm'
 
export default function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
 
  async function load() {
    setLoading(true)
    setError('')
    try {
      const res = await api.get('/users')
      setUsers(res.data)
    } catch (err) {
      setError(err?.message || 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }
 
  useEffect(() => { load() }, [])
 
  async function addUser(payload) {
    const res = await api.post('/users', payload)
    setUsers(prev => [...prev, res.data])
  }
 
  async function deleteUser(id) {
    await api.delete(`/users/${id}`)
    setUsers(prev => prev.filter(u => u.id !== id))
  }
 
  return (
    <div>
      <h1>Users</h1>
      <UserForm onAdd={addUser} />
      <div className="card">
        {loading && <p>Loading…</p>}
        {error && <p style={{ color: 'crimson' }}>{error}</p>}
        {!loading && !error && <UserList users={users} onDelete={deleteUser} />}
      </div>
      <p style={{ marginTop: '1rem', color: '#666' }}>
      <code> API base: http://localhost:8080/api/users</code>
      </p>
    </div>
  )
}
 
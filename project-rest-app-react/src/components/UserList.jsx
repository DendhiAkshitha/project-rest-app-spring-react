export default function UserList({ users, onDelete }) {
  if (!users.length) return <p>No users yet.</p>
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
    {users.map(u => (
        <li 
        key = {u.id}
        className = "card"
        style = {{
            marginBottom: '0.75rem', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center'
            }}
            >
            <span>
                <strong>{u.name}</strong> 
            <small style = {{ color: '#777' }}>#{u.id}</small>
            </span>
            <button className = "button" onClick = {() => onDelete(u.id)}>Delete</button>
            </li>
        ))}
    </ul>
  );
}
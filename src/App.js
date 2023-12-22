import { useEffect, useState } from "react";

function App() {
  const getItem = JSON.parse(localStorage.getItem('users'))
  const [users, setUsers] = useState(getItem || []);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  
  useEffect(() =>{
    localStorage.setItem('users', JSON.stringify(users))

    if (editIndex !== null) {
      setNewUser(users[editIndex]);
    }

  }, [users, editIndex])

  const handleInputChange =(e) =>{
    const {name, value} = e.target
    setNewUser({
      ...newUser, [name]: value
    })
  }

  const addUser = () => {
    if (editIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = newUser;
      setUsers(updatedUsers);
      setEditIndex(null);
    } else {
      setUsers([...users, newUser]);
    }
  
    setNewUser({
      name: "",
      email: "",
      role: "",
    });
  };

  const deleteUser = (index) =>{
    const updatedUsers = [...users]
    updatedUsers.splice(index, 1)
    setUsers(updatedUsers)
  }

  return (
    <div className="App">
      <h1>User management system</h1>
      <div className="form">
        <div className="inputWrap">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            name="name"
            id="name"
            onChange={handleInputChange}
          />
        </div>

        <div className="inputWrap">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            value={newUser.email}
            name="email"
            id="email"
            onChange={handleInputChange}
          />
        </div>

        <div className="inputWrap">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            placeholder="Role"
            value={newUser.role}
            name="role"
            id="role"
            onChange={handleInputChange}
          />
        </div>

        <button onClick={addUser}>Add User</button>
      </div>

      <div className="content">
        <h2>List of Users</h2>
        <div className="users">
          {users.map((user, idx) =>(
            <div className="user" key={idx}>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>

                <div className="actionBtns">

                <button onClick={() =>deleteUser(idx)}>Delete User</button>
                <button className="edit" onClick={() => setEditIndex(idx)}>Edit User</button>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

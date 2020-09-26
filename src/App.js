import React, { useState } from 'react';
import UserTable from './components/UserTable.jsx';
import { v4 as uuidv4 } from 'uuid';
import AddUserForm from './components/AddUserForm.jsx';
import EditUserForm from './components/EditUserForm.jsx';

function App() {

  const usersData = [
    { id: uuidv4(), name: 'tania', username: 'floppydiskette' },
    { id: uuidv4(), name: 'craig', username: 'siliconeidolon' },
    { id: uuidv4(), name: 'ben', username: 'benisphere' },
  ]

  //state
  const [users, setUsers] = useState(usersData);

  //agregar usuarios
  const addUser = (user) => {
    user.id = uuidv4()
    setUsers([
      ...users,
      user
    ])
  }

  //eliminar usuario
  const deleteUser = (id) => {
    //console.log(id)

    const arrayFiltrado = users.filter(user => user.id !== id);
    setUsers(arrayFiltrado);
  }

  //editar usuarios
  const [editing, setEditing] = useState(false);

  const [currentUser, setCurrenUser] = useState({
    id: null, name: '', username: ''
  });

  const editRow = (user) => {
    setEditing(true);
    setCurrenUser({
      id: user.id, name: user.name, username: user.username
    })
  }

  const updateUser = (id, updateUser) => {
    setEditing(false);

    setUsers(users.map(user => (user.id === id ? updateUser : user)))
  }

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          {
            editing ? (
              <div>
                <h2>edit user</h2>
                <EditUserForm
                  currentUser={currentUser}
                  updateUser={updateUser}
                />
              </div>
            ) : (
                <div>
                  <h2>add user</h2>
                  <AddUserForm addUser={addUser} />
                </div>
              )
          }
        </div>
        <div className="flex-large">
          <h2>view users</h2>
          <UserTable
            users={users}
            deleteUser={deleteUser}
            editRow={editRow}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

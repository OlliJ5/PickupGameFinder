import React, { useState } from 'react'
import userService from '../../services/users'

const NewAccountForm = () => {
  const [newUsername, setNewUsername] = useState('')
  const [newName, setNewName] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const createAccount = async (event) => {
    event.preventDefault()
    try {
      const newUser = {
        username: newUsername,
        name: newName,
        password: newPassword
      }
      await userService.create(newUser)
      setNewUsername('')
      setNewName('')
      setNewPassword('')
    } catch (exception) {
      console.log('something went wrong')
    }
  }

  return (
    <div>
      <h2>or create an account</h2>
      <form onSubmit={createAccount}>
        <div>
          username
          <input
            type="text"
            value={newUsername}
            name="newUsername"
            onChange={({ target }) => setNewUsername(target.value)}
          />
        </div>
        <div>
          name
          <input
            type="text"
            value={newName}
            name="name"
            onChange={({ target }) => setNewName(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={newPassword}
            name="newPassword"
            onChange={({ target }) => setNewPassword(target.value)}
          />
        </div>
        <button type="submit">create an account</button>
      </form>
    </div>
  )
}

export default NewAccountForm
import React from 'react'

const CreateAccountForm = ({ createAccount, newUsername, newName, newPassword, setNewUsername, setNewName, setNewPassword }) => {
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

export default CreateAccountForm
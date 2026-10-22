import db from '#db/client'
import bcrypt from 'bcryptjs'

export async function createUser(username, password) {
  const sql = `
    INSERT INTO users
      (username, password)
    VALUES
      ($1, $2)
    RETURNING *
    `
  const hash = await bcrypt.hash(password, 10)
  const { rows: [user] } = await db.query(sql, [username, hash])
  return user
}

export async function getUserByCred(username, password) {
  const sql = `SELECT * FROM users WHERE username = $1`
  const { rows: [user] } = await db.query(sql, [username])
  if (!user) return null
  const verified = await bcrypt.compare(password, user.password)
  if (!verified) return null
  return user
}

export async function getUser(id) {
  const sql = `SELECT * FROM users WHERE id = $1`
  const { rows: [user] } = await db.query(sql, [id])
  return user
}

import client from '../database/index'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const pepper = 'sfdsdf'
const saltRounds = '10'

type User = {
  id: number,
  username: string,
  password: string
}

//insert into user(username, passwrord) values('phuc','phuc123');
class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT * FROM users'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }

  async create(u: Partial<User>): Promise<[User, string]> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'INSERT INTO users (username, password) VALUES($1, $2) RETURNING *'
      const hash = bcrypt.hashSync(
        u.password + pepper,
        parseInt(saltRounds)
      );
      const result = await conn.query(sql, [u.username, hash])
      conn.release()
      const token = jwt.sign(result.rows[0], process.env.TOKEN_SECRET!)
      return [result.rows[0], token]

    } catch (err) {
      throw new Error(`unable create user (${u.username}): ${err}`)
    }
  }
}

export { User, UserStore }
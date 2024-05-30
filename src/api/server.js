import express from 'express';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';

config();

const app = express();
const PORT = process.env.PORT || 5600;
const SECRET_KEY_LENGTH = 32;
const SECRET_KEY = process.env.JWT_SECRET || generateSecretKey(SECRET_KEY_LENGTH);
const users = [
  { id: 1, username: "apreswilson@gmail.com", password: "3519216968Aw!" },
  { id: 2, username: "johnwilson@gmail.com", password: "3519216968Aw!" }
];

app.use(express.json());

function generateSecretKey(length) {
  const buffer = randomBytes(length);
  return buffer.toString('hex');
}

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.post("/calendar/", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username && user.password === password);

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign({ userId: user.id }, SECRET_KEY);

  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
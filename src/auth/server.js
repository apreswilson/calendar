import express from 'express';
import cors from 'cors';
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
app.use(cors()); // Enable CORS

function generateSecretKey(length) {
  const buffer = randomBytes(length);
  return buffer.toString('hex');
}

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
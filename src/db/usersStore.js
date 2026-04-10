const fs = require('fs/promises');
const path = require('path');

const dataPath = path.join(__dirname, '../../data/users.json');

async function readUsers() {
  try {
    const text = await fs.readFile(dataPath, 'utf-8');
    const data = JSON.parse(text);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function list() {
  return readUsers();
}

async function getById(id) {
  const users = await readUsers();
  return users.find((user) => String(user._id) === String(id)) || null;
}

async function getByUsername(username) {
  const users = await readUsers();
  return users.find((user) => user.username === username) || null;
}

async function listJobs() {
  const users = await readUsers();
  return [...new Set(users.map((user) => user.job))];
}

async function listByIdRange(minId, maxId) {
  const users = await readUsers();
  return users.filter((user) => user._id >= minId && user._id <= maxId);
}

module.exports = {
  list,
  getById,
  getByUsername,
  listJobs,
  listByIdRange,
};

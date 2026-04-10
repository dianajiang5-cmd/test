const fs = require('fs/promises');
const path = require('path');
const { randomUUID } = require('crypto');

const dataPath = path.join(__dirname, '../../data/employees.json');

async function readEmployees() {
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

async function writeEmployees(employees) {
  await fs.mkdir(path.dirname(dataPath), { recursive: true });
  await fs.writeFile(dataPath, JSON.stringify(employees, null, 2), 'utf-8');
}

async function list() {
  return readEmployees();
}

async function getById(id) {
  const employees = await readEmployees();
  return employees.find((employee) => employee._id === id) || null;
}

async function getByName(name) {
  const employees = await readEmployees();
  return employees.find((employee) => employee.name === name) || null;
}

async function create({ name, job }) {
  const employees = await readEmployees();
  const newEmployee = {
    _id: randomUUID(),
    name,
    job,
  };

  employees.push(newEmployee);
  await writeEmployees(employees);
  return newEmployee;
}

async function update(id, nextData) {
  const employees = await readEmployees();
  const index = employees.findIndex((employee) => employee._id === id);

  if (index === -1) {
    return null;
  }

  const updatedEmployee = {
    ...employees[index],
    ...nextData,
  };

  employees[index] = updatedEmployee;
  await writeEmployees(employees);
  return updatedEmployee;
}

async function remove(id) {
  const employees = await readEmployees();
  const nextEmployees = employees.filter((employee) => employee._id !== id);

  if (nextEmployees.length === employees.length) {
    return false;
  }

  await writeEmployees(nextEmployees);
  return true;
}

module.exports = {
  list,
  getById,
  getByName,
  create,
  update,
  remove,
};

const express = require('express');
const users = require('../db/usersStore');

const router = express.Router();

/* Get all users */
router.get('/', async (req, res, next) => {
  try {
    const allUsers = await users.list();
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
});

/* Get one user by username */
router.get('/by-username/:username', async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await users.getByUsername(username);

    if (!user) {
      res.status(404);
      return next(new Error('User does not exist'));
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

/* Get all jobs */
router.get('/jobs/all', async (req, res, next) => {
  try {
    const jobs = await users.listJobs();
    res.json(jobs);
  } catch (error) {
    next(error);
  }
});

/* Get users by id range */
router.get('/range/ids', async (req, res, next) => {
  try {
    const { minId, maxId } = req.query;
    const min = Number(minId);
    const max = Number(maxId);

    if (Number.isNaN(min) || Number.isNaN(max)) {
      res.status(400);
      return next(new Error('minId and maxId query parameters are required numbers'));
    }

    const usersInRange = await users.listByIdRange(min, max);
    res.json(usersInRange);
  } catch (error) {
    next(error);
  }
});

/* Get one user by _id */
router.get('/:_id', async (req, res, next) => {
  try {
    const { _id } = req.params;
    const user = await users.getById(_id);

    if (!user) {
      res.status(404);
      return next(new Error('User does not exist'));
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

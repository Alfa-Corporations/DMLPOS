const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Inventario base' });
});

module.exports = router;

// Create web server to handle comments

'use strict';

const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

router.get('/', (req, res) => {
  Comment.find((err, comments) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(comments);
  });
});

router.post('/', (req, res) => {
  const comment = new Comment(req.body);
  comment.save((err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ message: 'New comment created' });
  });
});

router.get('/:id', (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(comment);
  });
});

router.patch('/:id', (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (req.body._id) {
      delete req.body._id;
    }
    for (let p in req.body) {
      comment[p] = req.body[p];
    }
    comment.save((err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({ message: 'Comment updated' });
    });
  });
});

router.delete('/:id', (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    comment.remove((err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({ message: 'Comment deleted' });
    });
  });
});

module.exports = router;
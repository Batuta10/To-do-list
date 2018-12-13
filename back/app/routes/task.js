import express from 'express'
import Task from '../database/task'

const router = express.Router()

//Done
router.get('/all', (req, res) => {
  Task.find()
    .exec()
    .then(task => {
      res.status(200).json(task);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    })
});
//Done
router.get('/me', (req, res) => {
  Task.findById(req.body.id)
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      });
    })
});
//Done
router.post('/new', (req, res) => {
  const {
    titulo,
    descricao,
    done
  } = req.body;

  const task = new Task({
    titulo,
    descricao,
    done
  });
  //Mongoose Function do add
  task.save()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      });
    });
});
//Done
router.delete('/delete/:id', (req, res) => {
  Task.deleteOne({
      _id: req.params.id
    }).exec().then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
//Done
router.patch('/update', (req, res) => {
  let id = req.body.id;

  delete req.body['id'];

  Task.findOneAndUpdate({
      _id: id
    }, {
      $set: req.body
    })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      });
    })
});

export default router
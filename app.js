import express from 'express';
import bodyParser from 'body-parser';
import './db/connect.js';
import User from './model/user.js';

const app = express();
const PORT = process.env.PORT || 3000
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
app.get('/', async (req, res) => {
  
  const data = await User.find()
    try {
    res.status(200).send({
      data:data.sort((a, b) => parseFloat(a.Age) - parseFloat(b.Age))
    })
  } catch (error) {
    res.status(404).send({
      message: 'Data not found',
      error:error.message
    })
  }
});
app.get('/average', async(req, res) => {
  const data = await User.find()
  let avg = 0
  data.forEach((d) => {
    return avg+=parseInt(d.Marks)
  })
  // console.log(avg/data.length);
  res.status(200).send({
    Average:avg/data.length.toFixed(2)
  })

})
app.post('/', async(req, res) => {
  const { Name, Age, Marks } = req.body;

  try {
    if (Name===''||Age===''|| Marks==='') {
      return res.status(220).send({
        message:'Each field is required'
      })
    }
    else {
      const newUser = new User({Name,Age,Marks})
      const saveUser = await newUser.save()
      res.status(200).send({
        message: 'User added successfully',
        data:saveUser
      })
    }
    
  } catch (error) {
    console.log(error)
    res.status(512).send({
      message: 'Unsuccessfull ',
      error: error.message
      
    })
  }
})
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
})
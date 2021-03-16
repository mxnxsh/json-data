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
  var array_length;
  /* to create MAX  array */  
  function heap_root(input, i) {
    // console.log(input);console.log("I=>",i);
      var left = 2 * i + 1;
      var right = 2 * i + 2;
      var max = i;
  
      if (left < array_length && input[left] > input[max]) {
          max = left;
      }
  
      if (right < array_length && input[right] > input[max])     {
          max = right;
      }
  
      if (max != i) {
          swap(input, i, max);
          heap_root(input, max);
      }
  }
  
  function swap(input, index_A, index_B) {
      var temp = input[index_A];
  
      input[index_A] = input[index_B];
      input[index_B] = temp;
  }
  
  function heapSort(input) {
    array_length = input.length;
    // console.log(array_length);
  
      for (var i = Math.floor(array_length / 2); i >= 0; i -= 1)      {
          heap_root(input, i);
        }
  
      for (i = input.length - 1; i > 0; i--) {
          swap(input, 0, i);
          array_length--;
        
        
          heap_root(input, 0);
      }
  }
  const data = await User.find()
  var arr = [3, 0, 2, 5, -1, 4, 1];
  heapSort(arr);
  console.log(arr);
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
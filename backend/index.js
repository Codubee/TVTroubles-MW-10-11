const express = require('express')
const app = express()
const axios = require('axios');
var cors = require('cors')
app.use(express.json());
app.use(cors())

app.get('/getMatches', async (req, res) => 
{
    try 
    {
        id = req.query.id;

        axios.get(`https://codubee-projects-api.herokuapp.com/tvTroubles/getUserMatches?id=${id}`)
        .then((response) => 
        {
            data = response.data;
            res.status(200).json(data);
        })
        .catch(function (err) {
            res.status(404).json(err.response.data);
        })
    } 
    catch (err) 
    {
        res.status(404).json(err);
    }
})

app.post('/addUserMovie', function (req, res) {

    const body = {
        id: req.body.id,
        record: req.body.record
    }

    axios.post('https://codubee-projects-api.herokuapp.com/tvTroubles/addUserMovie',body)

    .then(function (response) {
         res.status(200).json(response.data);
    })
    .catch(function (error) {
        console.log(error)
        res.status(400).json({error:"An error occurred with addUserMovie"})
    })
})

//Backend route to get the movie/show description
app.get('/getDescription', function (req, res) {

    axios.get('https://codubee-projects-api.herokuapp.com/tvTroubles/getDescription')
    .then(function (response) {
        res.status(200).json(response.data);
    })
    .catch(function (error) {
        console.log(error)
        res.status(400).json({error:"An error occurred"});
    })
})

app.get('/getPreview', function (req, res) {

    var name = req.query.name
    axios.get('https://codubee-projects-api.herokuapp.com/tvTroubles/getPreview?name='+name)
    .then(function (response) {
        res.status(200).json(response.data);
    })
    .catch(function (error) {
        console.log(error)
        res.status(400).json({error:"An error occurred"});
    })
})


app.listen(process.env.PORT || 8080, () => console.log('Listening at localhost:8080'))

const express = require('express');
const path = require('path')
const app = express();
const sslRedirect = require('heroku-ssl-redirect');
//Init middleware
app.use(express.json({ extended: false }));


//Force https
// if (process.env.NODE_ENV === 'production') {
//     app.use((req, res, next) => {
//         if (req.header('x-forwarded-proto') !== 'https')
//             res.redirect(`https://${req.header('host')}${req.url}`)
//         else
//             next()
//     })
// }

// enable ssl redirect
if (process.env.NODE_ENV === 'production') {
    app.use(sslRedirect());
}

//Routes
const maps = require('./routes/api/maps');

//use Routes
app.use('/api/maps', maps);

//serve static assets in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('./client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
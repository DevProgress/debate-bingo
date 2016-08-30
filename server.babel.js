import express from 'express';

const app = express();

app.use('/', express.static('dist'));
app.get('/api/getCardData/:type', function(req, res) {
    var options = {
        root: __dirname + '/dist',
        dotfiles: 'deny'
    };
    switch(req.params.type) {
        case "hillary":
            res.sendFile('data/hillary.json', options);
            return;
        case "trump":
            res.sendFile('data/trump.json', options);
            return;
        case "mixed":
            res.sendFile('data/mixed.json', options);
            return;
    }

    res.sendStatus(404);
});

app.listen(process.env.PORT || 3000);
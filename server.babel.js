import express from 'express';

const app = express();

function getRandomSet(arr, len) {
    var ret = [];
    var used = [];
    for(var i=0; i<len; i++) {
        var idx;
        do {
            idx = Math.floor(Math.random() * arr.length);
        } while(used.indexOf(idx) !== -1);
        used.push(idx);
        ret.push(arr[idx]);
    }
    return ret;
}
function getTerms(termsFile) {
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(termsFile)
    });
    var ret = [];
    lineReader.on('line', function (line) {
        ret.push(line);
    });
    return ret;
} 

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

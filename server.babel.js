import express from 'express';

const app = express();

function getRandomSet(arr, len) {
    if(len > arr.length) {
        throw 'len cannot exceed length of arr';
    }
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
function getTerms(termsFile, party) {
    var array = fs.readFileSync(termsFile).toString().split("\n");
    var ret = [];
    for(i in array) {
        ret.push({text: line, colorClass: party});
    }

    console.log('loaded ' + ret.length + ' terms from file ' + termsFile);
    return ret;
}

function getCardData(type) {
    var hillary = type === 'hillary';
    var trump = type === 'trump';
    var mixed = hillary && trump;

    if(!(hillary || trump)) {
       return null;
    }

    var root = __dirname + '/dist/data/';
    var hillaryTerms, trumpTerms;
    if(hillary) {
        hillaryTerms = getTerms(root + 'hillary.dat', 'democrat');
    }
    if(trump) {
        trumpTerms = getTerms(root + 'trump.dat', 'republican');
    }
    if(mixed) {
        var hillarySet = getRandomSet(hillaryTerms, 12);
        var trumpSet = getRandomSet(trumpTerms, 12);
        return getRandomSet(hillarySet.concat(trumpSet), 24);
    }
    var terms = hillary ? hillaryTerms : trumpTerms;
    return getRandomSet(terms, 24);
}

app.use('/', express.static('dist'));
app.get('/api/getCardData/:type', function(req, res) {
    var data = getCardData(req.params.type);

    if(!data) {
        res.sendStatus(404);
    }

    res.json(data);
});

app.listen(process.env.PORT || 3000);

var fs = require('fs');
var data = process.argv[2];
var json = fs.readFileSync(__dirname + '/' + data, 'utf8');

var sheet = JSON.parse(json);
console.log(typeof sheet)
var x = sheet.feed.entry.filter(function(cell) {
    return cell.title.$t === 'B27';
})

// console.log(sheet.feed.entry);
console.log(x)
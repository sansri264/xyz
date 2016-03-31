
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'blabla',
  password : 'password'
});

function makeTree(node,rows){
    for(var i=0;i<node.length;i++){
        for(var j=0;j<rows.length;j++){
            if(node[i].id==rows[j].parent_id && node[i].id!=rows[j].id){
                node[i].childNodes.push(rows[j]);
                node[i].childNodes[node[i].childNodes.length - 1].childNodes=[];

                makeTree(node[i].childNodes,rows);
            }
        }
    }
}

app.get = function(req, res) {

connection.connect();

// var rows=[
//     {id:1,parent_id:1,d:'A'},
//     {id:2,parent_id:2,d:'A'},
//     {id:3,parent_id:2,d:'A'},
//     {id:4,parent_id:2,d:'A'},
// ];

connection.query('SELECT * FROM points WHERE resume_id = ? ' ,req.params.request, function(err, rows, fields) {
  if (err) throw err;
  
  
var Tree = [];
var offset= rows[0].id;
for (var i = 0; i < rows.length; i++) {
    var row = rows[i];

    if(row.id==row.parent_id){
        Tree.push(row);
        Tree[Tree.length-1].childNodes=[];
    }
}
makeTree(Tree,rows);
console.log(JSON.stringify(Tree));
});


connection.end();

}



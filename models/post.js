var mysql = require('mysql');

function Post(name, title, post) {
    this.name = name;
    this.title = title;
    this.post = post;
}

module.exports = Post;

//存储一篇文章
Post.prototype.save = function(callback) {
    var date = new Date();
    //存储各种时间格式
    var time = {
        date: date,
        year: date.getFullYear(),
        month: date.getFullYear() + "-" + (date.getMonth() + 1),
        day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
            date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    };
    //要存入数据库的文档
    var post = {
        num: null,
        name: this.name,
        title: this.title,
        post: this.post,
        time: time.minute
    }

    //连接数据库
    var conn = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'matengfei',
        database: 'new_schema'
    });

    conn.connect();
    conn.query('SELECT count(*) FROM post', function(err, rows, fields) {
        if (err) {
            return callback(err);
        }
        post.num = parseInt(rows[0]['count(*)']) + 1;
        conn.end();
        //查询到当前文章总数后重新
        conn = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'matengfei',
            database: 'new_schema'
        });
        conn.connect();
        conn.query('insert into post(number, name, title, post, time) values(?, ?, ?, ?, ?)', [post.num, post.name, post.title, post.post, post.time], function(err, results) {
            if (err) {
                return callback(err);
            }

            callback(err, results);
        });
        conn.end();
    });
}

//读取文章
Post.get = function(name, callback) {
    //连接数据库
    var conn = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'matengfei',
        database: 'new_schema'
    });

    conn.query('select * from post where name = "' + name + '"', function(err, rows, fields) {
        if (err) {
            return callback(err);
        }

        callback(err, rows);
    });
    conn.end();
}

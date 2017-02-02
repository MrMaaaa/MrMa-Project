var mysql = require('mysql');

function User(user) {
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
}

module.exports = User;

User.prototype.save = function(callback) {
    //要存储的用户数据
    var user = {
        username: this.username,
        password: this.password,
        email: this.email
    }

    //打开数据库
    var conn = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'matengfei',
        database: 'new_schema'
    });

    conn.connect();
    conn.query('insert into user_info(username, password, email) values(?, ?, ?)', [user.username, user.password, user.email], function(err, results) {
        if (err) {
            return callback(err);
        }

        callback(err, results);
    });
    conn.end();
}

User.get = function(name, callback) {
    //打开数据库
    var conn = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'matengfei',
        database: 'new_schema'
    });

    conn.connect();
    conn.query('select * from user_info where username = "' + name + '"', function(err, rows, fields) {
        if (err) {
            return callback(err);
        }

        callback(err, rows);
    });
    conn.end();
}

// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('index', {
//         title: 'Express'
//     });
// });

// module.exports = router;
var crypto = require('crypto'),
    User = require('../models/user.js'),
    Post = require('../models/post.js');

module.exports = function(app) {
    app.get('/', function(req, res) {
        if (req.session.user != undefined) {
            Post.get(req.session.user.username, function(err, posts) {
                if (err) {
                    posts = [];
                }
                res.render('index', {
                    title: '主页',
                    user: req.session.user,
                    posts: posts,
                    success: req.flash('success').toString(),
                    error: req.flash('error').toString()
                });
            });
        } else {
            res.render('index', {
                title: '主页',
                user: req.session.user,
                posts: null,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        }
    });
    app.post('/checkUsername', function(req, res) {
        User.get(req.body.username, function(err, data) {
            if (err) {
                req.flash('error', '检测用户名发生异常');
                return res.redirect('/reg'); //出现异常返回注册页
            }

            if (data[0]) {
                res.json({
                    result: false
                });
            } else {
                res.json({
                    result: true
                });
            }
        });
    });
    app.get('/reg', checkNologin);
    app.get('/reg', function(req, res) {
        res.render('reg', {
            title: '注册',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
    app.post('/reg', checkNologin);
    app.post('/reg', function(req, res) {
        var username = req.body.username,
            password = req.body.password,
            password_re = req.body['password-repeat'];

        // //生成密码的md5值
        // var md5 = crypto.createHash('md5'),
        //     password = md5.update(req.body.password).digest('hex');
        var newUser = new User({
            username: username,
            //注意，此时的密码已经变为MD5值，因此数据库的password列的长度一定要大于32
            password: password,
            email: req.body.email
        });

        /*//检查用户名是否存在，检查用户名的操作在用户名输入框失去焦点后就已经进行
        User.get(newUser.username, function(err, data) {
            if (err) {
                req.flash('error', '检测用户名发生异常');
                return res.redirect('/reg'); //注册失败返回注册页
            }

            if (data[0]) {
                req.flash('error', '用户已存在！');
                return res.redirect('/reg'); //返回注册页
            }

            //如果不存在则插入新用户
            newUser.save(function(err, user) {
                if (err) {
                    req.flash('error', '注册出现异常，请重试');
                    return res.redirect('/reg'); //注册失败返回注册页
                }

                //用户信息存入session
                req.session.user = newUser;
                req.flash('success', '注册成功');
                //注册成功返回主页
                res.redirect('/');
            });
        });*/
        newUser.save(function(err, user) {
            if (err) {
                req.flash('error', '注册出现异常，请重试');
                return res.redirect('/reg'); //注册失败返回注册页
            }

            //用户信息存入session
            req.session.user = newUser;
            req.flash('success', '注册成功');
            //注册成功返回主页
            res.redirect('/');
        });
    });
    app.get('/login', checkNologin);
    app.get('/login', function(req, res) {
        res.render('login', {
            title: '登录',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
    app.post('/login', checkNologin);
    app.post('/login', function(req, res) {
        /*//生成密码的md5值
        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.password).digest('hex');*/
        var password = req.body.password;
        //检测用户名是否存在
        User.get(req.body.username, function(err, user) {
            if (!user[0]) {
                req.flash('error', '用户不存在！');
                return res.redirect('/login'); //用户不存在跳转到登录页
            }
            user = user[0];

            //检测密码是否一致
            if (user.password != password) {
                req.flash('error', '密码错误！');
                return res.redirect('/login'); //密码错误跳转到登录页
            }

            //用户名与密码都匹配成功后将用户信息存入session
            req.session.user = user;
            req.flash('success', '登陆成功！');
            res.redirect('/'); //登陆成功后跳转到主页
        });
    });
    app.get('/post', checkLogin);
    app.get('/post', function(req, res) {
        res.render('post', {
            title: '发表',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
    app.post('/post', checkLogin);
    app.post('/post', function(req, res) {
        var post = new Post(req.session.user.username, req.body.title, req.body.post);
        post.save(function(err) {
            if (err) {
                req.flash('error', '发布失败' + err);
                return res.redirect('/');
            }
            req.flash('success', '发布成功!');
            res.redirect('/'); //发表成功跳转到主页
        });
    });
    app.get('/logout', checkLogin);
    app.get('/logout', function(req, res) {
        req.session.user = null;
        req.flash('success', '登出成功!');
        res.redirect('/'); //登出成功后跳转到主页
    });
}

//权限控制函数
function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.flash('error', '你还没有登录！');
        res.redirect('/login');
    }
    next();
}

function checkNologin(req, res, next) {
    if (req.session.user) {
        req.flash('error', '你已经登录！');
        res.redirect('back'); //返回之前的页面
    }
    next();
}

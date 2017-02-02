$(function() {
    var regForm = document.querySelector('#reg_form');
    var regUsername = document.querySelector('#reg_form .reg-username');
    var regPsd = document.querySelector('#reg_form .reg-password');
    var regPsdRe = document.querySelector('#reg_form .reg-password-repeat');
    var regEmail = document.querySelector('#reg_form .reg-email');
    var regBtn = document.querySelector('#reg_form .reg-btn-reg');
    var errDom = document.querySelector('#reg_form .reg-result-error');

    regUsername.onfocus = function() {
        if (errDom.innerText === '请输入用户名') {
            errDom.innerText = '';
        }
    }

    regUsername.onblur = function() {
        var that = this;
        if (that.value === '') {
            errDom.innerText = '请输入用户名';
        } else {
            $.ajax({
                url: '../checkUsername',
                dataType: 'json',
                type: 'post',
                data: {
                    username: that.value
                },
                catch: false,
                timeout: 5000,
                success: function(data) {
                    if (data.result) {
                        errDom.innerText = '该用户名可以使用！';
                        that.style.background = '#7FFF7F';
                        document.querySelector('#reg_form .username-icon-success').classList.remove('icon-fail');
                        document.querySelector('#reg_form .username-icon-success').classList.add('icon-success');
                    } else {
                        errDom.innerText = '该用户名已被注册！';
                        that.style.background = '#FF5B6E';
                        document.querySelector('#reg_form .username-icon-success').classList.remove('icon-success');
                        document.querySelector('#reg_form .username-icon-success').classList.add('icon-fail');
                    }
                },
                error: function(err, data) {
                    alert(err, data);
                }
            });
        }
    }

    regPsd.onfocus = function() {
        if (errDom.innerText === '请输入密码') {
            errDom.innerText = '';
        }
    }

    regPsd.onblur = function() {
        if (this.value === '') {
            errDom.innerText = '请输入密码';
        }
    }

    regPsdRe.onfocus = function() {
        if (errDom.innerText === '请确认密码') {
            errDom.innerText = '';
        }
    }

    regPsdRe.onblur = function() {
        if (this.value === '') {
            errDom.innerText = '请确认密码';
        }
    }

    regEmail.onfocus = function() {
        if (errDom.innerText === '请输入邮箱') {
            errDom.innerText = '';
        }
    }

    regEmail.onblur = function() {
        if (this.value === '') {
            errDom.innerText = '请输入邮箱';
        }
    }

    regBtn.onclick = function() {
        return checkReg(regForm, errDom);
    };

    //检查用户名或密码是否为空
    function checkReg(form, errDom) {
        if (form.username.value === '' || form.password.value === '') {
            errDom.innerText = '请输入账号或密码！';
            return false;
        } else {
            if (regPsd.value === regPsdRe.value) {
                return true;
            } else {
                errDom.innerText = '两次输入的密码不一致！';
            return false;
            }
        }
    }
});

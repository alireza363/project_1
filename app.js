const telFormat = /^[0,9]{2}\d{9}/
const passFormat = /.{8,}/

// start login page
const inMob = document.getElementById('login_mob')
const inPass = document.getElementById('login_pass')
const btnLogin = document.getElementById('btnLogin')
const message = document.querySelector('p.msg')
const mobile = '09155803862' /*چون دیتابیس ندارم شماره موبایل فرضی*/
const password = '12345679' /*چون دیتابیس ندارم پسورد فرضی*/
let telTrue = 0
let passTrue = 0 

inMob.oninput = event => {
    let val = inMob.value
    if(val.match(telFormat)){
        inMob.classList.remove('error')
        inMob.classList.add('success')
        telTrue = 1
        if(passTrue == 1) {
            btnLogin.classList.add('enabled')
            btnLogin.disabled = false
        }
    } else {
        inMob.classList.add('error')
        btnLogin.classList.remove('enabled')
        btnLogin.disabled = true
    }
}

inPass.oninput = e => {
    let val = inPass.value
    if(val.match(passFormat)){
        inPass.classList.remove('error')
        inPass.classList.add('success')
        passTrue = 1
        if(telTrue == 1) {
            btnLogin.classList.add('enabled')
            btnLogin.disabled = false
        }
    } else {
        inPass.classList.add('error')
        btnLogin.classList.remove('enabled')
        btnLogin.disabled = true
    }
}

btnLogin.addEventListener('click', e => {
    let val1 = inMob.value
    let val2 = inPass.value
    if(val1 === mobile && val2 === password) {
        document.getElementById('loginForm').submit();
    } else {
        message.textContent = 'شماره موبایل و یا رمز عبور نادرست است!'
    }
})
// end login page
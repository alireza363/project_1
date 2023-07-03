// آرایه مخاطبین که در سامانه ثبت نام کرده اند
const registeredList = [
    {mobile: '09155803862',username: 'علی'},
    {mobile: '09391570415',username: 'حسین'},
    {mobile: '09123205004',username: 'احمد'},
    {mobile: '09353649470',username: 'رضا'}    
]

// آرایه لیست مخاطبین ذخیره شده
const contactlist = [
    {mobile: '09155803862',username: 'علی'},
    {mobile: '09353649470',username: 'رضا'}   
]

const telFormat = /^[0,9]{2}\d{9}/

// ثابت های نگهدارنده عناصر مورد استفاده
const plusIcon = document.getElementById('plusIcon')
const editIcon = document.getElementById('editIcon')
const closeIcon = document.getElementById('closeIcon')
const popupBox = document.getElementById('popupBox')
const popUpClass = document.querySelector('.popUp')
const btnPopup = document.getElementById('btnPopup')
const mobileInput = document.getElementById('mobileUser')
const nameInput = document.getElementById('nameUser')

// مقداری که میگیرد عملکرد (افزودن/ویرایش) دکمه را تعیین می کند
let btnType

// کلیک روی آیکن پلاس
plusIcon.onclick = e => {
    popupBox.style.display = 'flex'        /* default popupBox -> display none */
    btnType = 'btnPlus'
    btnPopup.textContent = 'افزودن مخاطب'
    btnPopup.nextElementSibling.textContent = ''
}

// کلیک روی آیکن ادیت
editIcon.onclick = e => {
    popupBox.style.display = 'flex'      /* default edituserBox -> display none */
    btnType = 'btnEdit'
    btnPopup.textContent = 'اعمال تغییرات'
    btnPopup.nextElementSibling.textContent = ''
}

// کلیک روی آیکن کلوز پاپ آپ
closeIcon.onclick = e => {
    popupBox.style.display = 'none'
}

// کلیک روی دکمه افزودن/ویرایش مخاطب
btnPopup.addEventListener('click', e => {
    let mobileVal = mobileInput.value
    let val1 = mobileVal.match(telFormat)
    let val2 = nameInput.value
    let findContact = null

    // اگر شماره موبایل معتبر باشد
    if(val1) {
        // جستجوی مخاطب در سامانه
        for (const contact of registeredList) { /* registeredList-example list contacts of samaneh*/
            if(mobileVal.match(contact.mobile)) {
                findContact = contact
                break
            }
        }
        // وقتی مخاطب در سامانه ثبت نام کرده باشد امکان ذخیره وجود خواهد داشت
        if(findContact) {
            mobileInput.classList.remove('error')
            nameInput.classList.remove('error') 
            btnPopup.nextElementSibling.textContent = ''
            // بررسی می کند یک نام برای مخاطب وارد شده باشد
            if(val2) {
                let index = 0  // یک شمارنده برای یافتن ایندکس مخاطب 

                // جستجوی مخاطب در لیست مخاطبین کاربر
                for (const c of contactlist) {
                    if(mobileVal.match(c.mobile)) {
                        if(btnType === 'btnPlus') {
                            btnPopup.nextElementSibling.textContent = 'این مخاطب قبلا ذخیره شده است!'
                            findContact = null
                            break
                        }
                        // ویرایش مخاطب موجود در لیست
                        findContact.username = val2
                        contactlist.splice(index, 1, findContact)
                        findContact = null
                        popupBox.style.display = 'none'
                        console.log(contactlist) // نمایش خروجی ویرایش در کنسول
                        break
                    }
                    index+=1
                }
                // اگر مخاطب قبلا در لیست مخاطبین کاربر نباشد نال نشده و به لیست اضافه میشود
                if(findContact) {
                    findContact.username = val2
                    contactlist.push(findContact)
                    popupBox.style.display = 'none'
                    console.log(contactlist) // نمایش خروجی افزودن مخاطب جدید در کنسول
                }
            } else {
                nameInput.classList.add('error')
                btnPopup.nextElementSibling.textContent = 'یک نام دلخواه برای مخاطب وارد نمایید...'
            }
        } else {
            mobileInput.classList.add('error')
            btnPopup.nextElementSibling.textContent = 'مخاطب ابتدا باید در سامانه ثبت نام نماید!'
        }
    } else {
        mobileUser.classList.add('error')
        btnPopup.nextElementSibling.textContent = 'شماره موبایل معتبر نیست!'
    }
})
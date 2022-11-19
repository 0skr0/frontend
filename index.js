let otc_clock = document.querySelector('#ac')
let otc_day = document.querySelector('#ad')
let clock = document.querySelector('#c')
let day = document.querySelector('#d')
let f_table = document.querySelector('#ft')
const formInput = document.querySelector('#inputbox')
const btn = document.querySelector('.btn-outline-success')
const home = document.querySelector('.navbar-brand')
let endloopId = 0
let SaWaRuDo = 0
window.addEventListener('load', run)
function run() {
    fetch('http://13.230.193.163:3000/times')
    .then(response => response.json())
    .then(data => show(data))
}
function submitsearch() {
    fetch(`http://13.230.193.163:3000/time/${String(formInput.value)}`)
    .then(response => response.json())
    .then(data => {
        if(String(data) === '') {
            alert(`Error: ไม่พบประเทศที่ระบุ '${formInput.value}'`)
        }else {
            clearInterval(endloopId);
            load(data)
        }
        formInput.value = ''
    })
}
formInput.addEventListener('change', () => {
    if(formInput.value === '') {
        endloopId = 0
    }else{
        endloopId = SaWaRuDo
    }
    submitsearch()
})
home.addEventListener('click', () => {
    endloopId = SaWaRuDo
    clearInterval(endloopId);
    otc_clock.innerHTML = ''
    otc_day.innerHTML = ''
    run()
})
home.addEventListener('mouseover', () => {
    home.style.color = 'rgb(1, 196, 196)'
})
home.addEventListener('mouseout', () => {
    home.style.color = 'black'
})
btn.addEventListener('click', () => {
    if(formInput.value === '') {
        endloopId = 0
    }else{
        endloopId = SaWaRuDo
    }
    submitsearch()
})
function show(data) {
    f_table.innerHTML = ''
    let text = document.querySelector('#t');
    text.innerHTML = ''
    let cty = 'Thailand'
    let i = 0
    data.forEach(element => {
        let c1 = document.createElement('td', scope="col")
        let c2 = document.createElement('td', scope="col")
        let c3 = document.createElement('td', scope="col")
        let r1 = document.createElement('tr')
        c1.innerHTML = `Time at`
        c2.innerHTML = `${element.name}`
        c3.innerHTML = `${element.timez} from Thailand`
        r1.appendChild(c1)
        r1.appendChild(c2)
        r1.appendChild(c3)
        text.appendChild(r1)
    });
    setInterval(() => {
        let d = new Date();
        let dt = String(d).split(' ');
        clock.innerHTML = dt[4]
        day.innerHTML = `${dt[3]}-${dt[1]}-${dt[2]} at ${cty}`
    })
}
function load(data) {
    let text = document.querySelector('#t');
    text.innerHTML = ''
    otc_clock.innerHTML = ''
    otc_day.innerHTML = ''
    setTimeout(() => {
        show(data)
        digi_c(data)
    },500)
}
function digi_c(data) {
    let ti = String(data[0].timez).split(' ');
    let th = Number(ti[1])
    let tm = Number(ti[3])
    if(ti[1] === '00') {
        th = 0
    }
    if(ti[3] === '00') {
        tm = 0
    }
    SaWaRuDo = setInterval(() => {
        let dd = String(new Date()).split(' ');
        let dt = String(dd[4]).split(':');
        let ye = new Date().getFullYear();
        let mo = new Date().getMonth()+1;
        let d = Number(dd[2])
        let h = 0
        let m = 0
        if(ti[0] === '-') {
            h = Number(dt[0])-th;
            m = Number(dt[1])-tm;
        }else{
            h = Number(dt[0])+th;
            m = Number(dt[1])+tm;
        }
        if(m > 60) {
            m = m-60
            h = h+1
        }
        if(h > 24) {
            h = h-24
            d = d+1
        }
        if(d > 31) {
            d = d-31
            mo = mo+1
        }
        if(mo > 12) {
            mo = mo-12
            ye = ye+1
        }
        if(mo < 1) {
            mo = 12+mo
            ye = ye-1
        }
        if(d < 1) {
            d = 31+d
            mo = mo-1
        }
        if(h < 0) {
            h = 24+h
            d = d-1
        }
        if(m < 0) {
            m = 60+m
            h = h-1
        }
        let ot_date = new Date(`${ye}-${mo}-${d} ${h}:${m}:${dt[2]}`);
        let spl_od = String(ot_date).split(' ');
        otc_clock.innerHTML = `${spl_od[4]}`
        otc_day.innerHTML = `${spl_od[3]}-${spl_od[1]}-${spl_od[2]} at ${data[0].name}`
    })
}

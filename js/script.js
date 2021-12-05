var id, final, start, cookieSupport;
$(document).ready(function() {
    setInterval(updateTime, 1000);
    cookieSupport = testCookie();
    getAll();
    // saveCookie("dateFinal","2020-4-25",1);
    // saveCookie("dateStart","2019-12-29",1);

    document.getElementById("dateS").value = toString(start, -1);
    document.getElementById("dateF").value = toString(final, -1);
    document.getElementById("id").value = id;
    tabCtrl(event, 'home');
});

function animate() {
    let anm = document.getElementsByClassName("anm");
    for (let i = 0; i < anm.length; i++) {
        if (i % 2 != 0) anm[i].style.animation += ",loadOutR 4s";
        else anm[i].style.animation += ",loadOutL 4s";
        anm[i].style.opacity = "0";
    }
    document.getElementById("bgP").style.animation = "loadIn 4s";
    document.getElementById("bgP").style.opacity = "1";
    document.getElementById("poster").style.animation = "marginIn 4s";
    document.getElementById("poster").style.marginBottom = "90%";
}
// var final=new Date("2020-4-25");
// var start=new Date("2019-12-29");
function tabCtrl(evt, tab) {
    let i, tabcontent, tablink;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablink = document.getElementsByClassName("tablink");
    for (i = 0; i < tablink.length; i++) {
        tablink[i].className = tablink[i].className.replace(" active", "");
    }
    document.getElementById(tab).style.display = "contents";
    evt.currentTarget.className += " active";
}
//Not Complete, will release soon
function changeTheme() {
    let twitterList = document.getElementsByClassName("twitter-timeline");
    let theme;
    if (twitterList[0].getAttribute("data-theme") == "dark") theme = "light";
    else theme = "dark";
    for (let i = 0; i < twitterList.length; i++) {
        twitterList[i].setAttribute("data-theme", theme);
    }
    document.getElementsByTagName("body")[0].setAttribute("class", theme + "-theme");
}
//Timer
function updateTime() {
    getAll();
    let now = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    let result = round2((calDay(start, now) / calDay(final, start)) * 100);
    setTime(calDay(final, start), calDay(final, now));
    //var result=58;
    setPercent(result);
    setClock();
}
//this funtion return 12 if input==12, return 04 if input ==4
function fixGet(input) {
    if (input < 10) return "0" + input;
    else return input;
}
//functions below support updateTime function
function toString(time, value) {
    switch (value) {
        case 0:
            return time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear();
            break;
        case 1:
            return Date.UTC(time.getFullYear(), time.getMonth(), time.getDate());
        default:
            return time.getFullYear() + "-" + fixGet((time.getMonth() + 1)) + "-" + fixGet(time.getDate());
            break;
    }
}

function calDay(time1, time2) {
    return (Math.abs(toString(time1, 1) - toString(time2, 1))) / (1000 * 60 * 60 * 24);
}

function round2(num) {
    return Math.round(num * 10) / 10;
}

function setPercent(result) {
    document.getElementById("percent").innerHTML = result + '%';
    document.getElementById("percentBg").style.width = result + '%';
    //width: 10%;
}

function setTime(sum, left) {
    document.getElementById("day").innerHTML = "Day Left: " + left + " | Day Passed: " + (sum - left);
}

function setClock() {
    let d = new Date();
    document.getElementById("time").innerHTML = d.toLocaleTimeString();
    document.getElementById("date").innerHTML = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
}

//setting (->cookie)
function settingShow() {
    let form = document.getElementById("settingForm");
    if (form.style.display == "none") form.style.display = "block";
    else form.style.display = "none";
}
//set cookie
function setCookie(id, dateS, dateF) {
    saveCookie("id", id, 1);
    saveCookie("dateStart", dateS, 1);
    saveCookie("dateFinal", dateF, 1);
}
//get Variable
function getAll() {
    if (cookieSupport == 1) {
        final = new Date(getCookie("dateFinal"));
        start = new Date(getCookie("dateStart"));
        id = getCookie("id");
    } else if (start == null || final == null) {
        final = new Date("2020-7-11");
        start = new Date("2019-12-29");
        id = "";
    };
}
//get cookie
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
//clear cookie
function clearCookie() {
    saveCookie("id", id, -1);
    saveCookie("dateStart", dateS, -1);
    saveCookie("dateFinal", dateF, -1);
}
//method cookie
function saveCookie(name, data, value) {
    switch (value) {
        case 1:
            document.cookie = name + "=" + data + ";expires=Thu, 18 Dec 9999 12:00:00 UTC";
            break;
        case -1:
            document.cookie = name + "=" + data + ";expires=Thu, 18 Dec 0000 12:00:00 UTC";
            break;
        default:
            break;
    }
}
//test cookie
function testCookie() {
    document.cookie = "test=hasinTest;expires=Thu, 18 Dec 9999 12:00:00 UTC";
    if (getCookie("test") == "hasinTest") { console.log("Your browser support our method of saving cookies.");
        saveCookie("test", "", -1); return 1; } else { console.log("Your browser support our method of saving cookies.\n We will store your data in txt file."); return -1; }
}
//creat txt file if can't creat cookie, not complete
function WriteToFile() {

}
//save setting
function save() {
    setCookie(document.getElementById("id").value, document.getElementById("dateS").value, document.getElementById("dateF").value);
    id = document.getElementById("id").value;
    start = new Date(document.getElementById("dateS").value);
    final = new Date(document.getElementById("dateF").value);
    alert("Save Successful!");
    settingShow();
}
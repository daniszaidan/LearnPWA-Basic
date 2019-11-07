// const loadLoad = () => {
//     fetch('/pages/about.html')
//         .then(response => {
//             return response.text();
//         })
//         .then(data => {
//             return data.text();
//         })
//         .then()

// }

// loadLoad();


loadPageContent = async page => {
    const content = document.querySelector("#body-content");
    const response = await fetch(`/pages/${page}.html`);
    const { status } = response;

    if (status === 200) {
        const data = await response.text();
        content.innerHTML = data;
    } else if (status === 404) {
        content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
    } else {
        content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
    }
}

loadNavigation = async () => {
    const response = await fetch('nav.html');
    if (response.status !== 200) return;

    const data = await response.text();
    document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
        elm.innerHTML = data;
    });

    document.querySelectorAll(".sidenav a, .topnav a").forEach(function (elm) {
        elm.addEventListener("click", function (event) {

            const sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();

            page = event.target.getAttribute("href").substr(1);
            loadPageContent(page);
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {

    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);

    // loadNav();
    loadNavigation();

    // function loadNav() {
    //     var xhttp = new XMLHttpRequest();
    //     xhttp.onreadystatechange = function () {
    //         if (this.readyState == 4) {
    //             if (this.status != 200) return;

    //             document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
    //                 elm.innerHTML = xhttp.responseText;
    //             });

    // document.querySelectorAll(".sidenav a, .topnav a").forEach(function (elm) {
    //     elm.addEventListener("click", function (event) {

    //         var sidenav = document.querySelector(".sidenav");
    //         M.Sidenav.getInstance(sidenav).close();

    //         page = event.target.getAttribute("href").substr(1);
    //         loadPage(page);
    //     });
    // });

    //         }
    //     };
    //     xhttp.open("GET", "nav.html", true);
    //     xhttp.send();
    // }


    var page = window.location.hash.substr(1);
    if (page == "") page = "home";

    // loadPage(page);
    loadPageContent(page);

    // function loadPage(page) {
    //     var xhttp = new XMLHttpRequest();
    //     xhttp.onreadystatechange = function () {
    //         if (this.readyState == 4) {
    //             var content = document.querySelector("#body-content");
    //             if (this.status == 200) {
    //                 content.innerHTML = xhttp.responseText;
    //             } else if (this.status == 404) {
    //                 content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
    //             } else {
    //                 content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
    //             }
    //         }
    //     };
    //     xhttp.open("GET", "pages/" + page + ".html", true);
    //     xhttp.send();
    // }

});
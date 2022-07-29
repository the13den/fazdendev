(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    function initMobileMenu() {
        const header = document.querySelector(".header");
        document.addEventListener("click", openMenu);
        function openMenu(e) {
            if (!e.target.closest(".header")) document.body.classList.remove("lock");
            if (e.target.closest(".icon-menu")) {
                header.classList.toggle("_menu-open");
                document.body.classList.toggle("lock");
                header.classList.remove("_menu-closed");
            }
            if (!header.classList.contains("_menu-open")) header.classList.toggle("_menu-closed");
        }
    }
    initMobileMenu();
    function adaptiveSizePageScale(startWidth = 320) {
        const body = document.documentElement;
        let clientWidth = document.documentElement.clientWidth;
        let bodyComputedWidth;
        let resizeCoef;
        let resizeCoefPercents;
        if (clientWidth <= startWidth) {
            bodyComputedWidth = parseInt(getComputedStyle(body).width);
            resizeCoef = clientWidth / bodyComputedWidth;
            resizeCoefPercents = 100 * resizeCoef;
            body.style.transform = `scale(${resizeCoef})`;
            body.style.transformOrigin = `top left`;
            body.style.width = `${resizeCoefPercents}%`;
            body.style.height = `${resizeCoefPercents}%`;
        } else {
            body.style.transform = ``;
            body.style.transformOrigin = ``;
            body.style.width = ``;
            body.style.height = ``;
        }
        window.addEventListener("resize", scalePage);
        function scalePage(e) {
            clientWidth = document.documentElement.clientWidth;
            if (clientWidth <= startWidth) {
                bodyComputedWidth = parseInt(getComputedStyle(body).width);
                resizeCoef = clientWidth / bodyComputedWidth;
                resizeCoefPercents = 100 * resizeCoef;
                body.style.transformOrigin = `top left`;
                body.style.transform = `scale(${resizeCoef})`;
                body.style.width = `${resizeCoefPercents}%`;
                console.log(`${resizeCoefPercents}%`);
                body.style.height = `${resizeCoefPercents}%`;
            } else {
                body.style.transform = ``;
                body.style.transformOrigin = ``;
                body.style.width = ``;
                body.style.height = ``;
            }
        }
    }
    function firefoxAdaptiveSizePageScale(startWidth = 320) {
        let userAgent = navigator.userAgent;
        if (userAgent.includes("irefox")) adaptiveSizePageScale();
    }
    firefoxAdaptiveSizePageScale();
    document.querySelector(".feedback-form__button");
    const script_form = document.querySelector("#feedback");
    script_form.onsubmit = async e => {
        let formData = new FormData(script_form);
        alert("start");
        e.preventDefault();
        let xhr = new XMLHttpRequest;
        xhr.open("POST", "https://script.google.com/macros/s/AKfycbwz2VYI8q092-TvasLvhEn3cdKaBFpNYFyVwFUXzqea2kvjctVC5cXlda_eIaa9ZOSF/exec");
        xhr.send(formData);
        xhr.onload = function() {
            if (200 != xhr.status) alert(`Ошибка Отравки`); else alert(`Форма отправленна`);
        };
    };
    new SmoothScroll('a[href*="#"]', {
        speed: 300
    });
    window["FLS"] = true;
    isWebp();
})();
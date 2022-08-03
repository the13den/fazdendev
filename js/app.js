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
                header.classList.remove("_menu-loaded");
            }
            if (!header.classList.contains("_menu-open") && !header.classList.contains("_menu-loaded")) header.classList.add("_menu-closed");
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
    new SmoothScroll('a[href*="#"]', {
        speed: 300
    });
    function initForm() {
        let formButton;
        let forms = document.querySelectorAll(".feedback-form");
        let form;
        let localFormSent;
        let sendConfirmation = 0;
        if (sessionStorage.formSent) localFormSent = JSON.parse(sessionStorage.formSent); else localFormSent = 0;
        for (let index = 0; index < forms.length; index++) {
            let form = forms[index];
            checkFormSent(form);
        }
        function validateForm(form) {
            let error = 0;
            let formReq = form.querySelectorAll("._req");
            for (let index = 0; index < formReq.length; index++) {
                const input = formReq[index];
                if (form.contains(input)) {
                    inputRemoveBlankError(input);
                    inputRemoveEmailError(input);
                    if ("" === input.value || " " === input.value) {
                        inputAddBlankError(input);
                        error++;
                    } else if (input.classList.contains("_email")) if (false == validateEmail(input)) {
                        inputAddEmailError(input);
                        error++;
                    }
                }
            }
            return error;
            function inputAddBlankError(input) {
                input.parentElement.classList.add("_blank-error");
                input.classList.add("_blank-error");
            }
            function inputRemoveBlankError(input) {
                input.parentElement.classList.remove("_blank-error");
                input.classList.remove("_blank-error");
            }
            function inputAddEmailError(input) {
                input.parentElement.classList.add("_email-error");
                input.classList.add("_email-error");
            }
            function inputRemoveEmailError(input) {
                input.parentElement.classList.remove("_email-error");
                input.classList.remove("_email-error");
            }
            function validateEmail(email) {
                var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                var address = email.value;
                if (false == reg.test(address)) return false;
            }
        }
        function checkFormSent(form) {
            if (localFormSent.value) addClassFormSent(form); else removeClassFormSent(form);
            function addClassFormSent(form) {
                form.classList.add("_form-sent");
            }
            function removeClassFormSent(form) {
                form.classList.remove("_form-sent");
            }
        }
        function clearFormInputs(form) {
            if (form.querySelectorAll("input").length) {
                const inputs = form.querySelectorAll("input");
                for (let index = 0; index < inputs.length; index++) {
                    const input = inputs[index];
                    if (input) input.value = "";
                }
            }
            if (form.querySelectorAll("textarea").length) {
                const textareas = form.querySelectorAll("textarea");
                for (let index = 0; index < textareas.length; index++) {
                    const textarea = textareas[index];
                    if (textarea) textarea.value = "";
                }
            }
        }
        document.addEventListener("click", (function(e) {
            if (e.target.closest(".feedback-form__button")) {
                e.preventDefault();
                formButton = e.target.closest(".feedback-form__button");
                form = formButton.closest(".feedback-form");
                let error = validateForm(form);
                if (0 === error) {
                    if (localFormSent.value && 1 == !sendConfirmation) sendConfirmation = 0;
                    if (1 == sendConfirmation || !form.classList.contains("_form-sent")) {
                        function sendForm(form, timeoutMs = 6e4, errorVanishDelayMs = 1e4, successVanishDelayMs = 7500) {
                            let abortTimeout;
                            let formData = new FormData(form);
                            let xhr = new XMLHttpRequest;
                            xhr.open("POST", "https://script.google.com/macros/s/AKfycbwz2VYI8q092-TvasLvhEn3cdKaBFpNYFyVwFUXzqea2kvjctVC5cXlda_eIaa9ZOSF/exec");
                            xhr.send(formData);
                            form.classList.add("_form-sending");
                            abortSendFormOnTimeout(form, timeoutMs, errorVanishDelayMs);
                            xhr.onload = function() {
                                if (200 != xhr.status) {
                                    addClassFormSentError(form, errorVanishDelayMs);
                                    form.classList.remove("_form-sending");
                                    clearTimeout(abortTimeout);
                                    form.classList.remove("_confirm-sending");
                                    sendConfirmation = 0;
                                } else {
                                    addClassFormSentSuccess(form, successVanishDelayMs);
                                    form.classList.remove("_form-sending");
                                    clearTimeout(abortTimeout);
                                    sessionStorage.formSent = JSON.stringify({
                                        value: 1
                                    });
                                    localFormSent = JSON.parse(sessionStorage.formSent);
                                    checkFormSent(form);
                                    form.classList.remove("_confirm-sending");
                                    sendConfirmation = 0;
                                    setTimeout(clearFormInputs, successVanishDelayMs, form);
                                }
                            };
                            function addClassFormSentSuccess(form, vanishDelay) {
                                form.classList.add("_form-sent-success");
                                setTimeout((function() {
                                    form.classList.remove("_form-sent-success");
                                }), vanishDelay);
                            }
                            function addClassFormSentError(form, vanishDelay) {
                                form.classList.add("_form-sent-error");
                                setTimeout((function() {
                                    form.classList.remove("_form-sent-error");
                                }), vanishDelay);
                            }
                            function abortSendFormOnTimeout(form, timeoutMs = 6e4, errorVanishDelayMs = 1e4) {
                                clearTimeout(abortTimeout);
                                abortTimeout = setTimeout((function() {
                                    xhr.abort();
                                    addClassFormSentError(form, errorVanishDelayMs);
                                    form.classList.remove("_form-sending");
                                    form.classList.remove("_confirm-sending");
                                    sendConfirmation = 0;
                                }), timeoutMs);
                            }
                        }
                        sendForm(form);
                    } else if (localFormSent.value) {
                        form.classList.add("_confirm-sending");
                        sendConfirmation = 1;
                    }
                } else if (localFormSent.value) {
                    form.classList.remove("_confirm-sending");
                    sendConfirmation = 0;
                }
            }
        }));
    }
    initForm();
    function initDarkTheme() {
        let browserDarkTheme = 0;
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.body.classList.remove("theme_light");
            document.body.classList.add("theme_dark");
            browserDarkTheme = 1;
        } else {
            document.body.classList.remove("theme_dark");
            document.body.classList.add("theme_light");
            browserDarkTheme = 0;
        }
        if ("light" == localStorage.theme) {
            document.body.classList.remove("theme_dark");
            document.body.classList.add("theme_light");
            browserDarkTheme = 0;
        } else if ("dark" == localStorage.theme) {
            document.body.classList.remove("theme_light");
            document.body.classList.add("theme_dark");
            browserDarkTheme = 1;
        }
        document.addEventListener("click", changeThemeOnClick);
        function changeThemeOnClick(e) {
            if (e.target.closest(".theme-button") && 1 == browserDarkTheme) {
                localStorage.clear("theme");
                localStorage.setItem("theme", "light");
                browserDarkTheme = 0;
            } else if (e.target.closest(".theme-button")) {
                localStorage.clear("theme");
                localStorage.setItem("theme", "dark");
                browserDarkTheme = 1;
            }
            if ("light" == localStorage.theme) {
                document.body.classList.remove("theme_dark");
                document.body.classList.add("theme_light");
                browserDarkTheme = 0;
            } else if ("dark" == localStorage.theme) {
                document.body.classList.remove("theme_light");
                document.body.classList.add("theme_dark");
                browserDarkTheme = 1;
            }
        }
    }
    initDarkTheme();
    document.addEventListener("DOMContentLoaded", ready);
    function ready() {
        scrollProjectImagesOnHoverInit();
    }
    function scrollProjectImagesOnHoverInit(pixelsPerSecond = 150, reverseScrollDelay = 500, reverseScrollEnabled = 0) {
        let pictureHoverContainer;
        let pictureHoverImage;
        let pictureHoverHeight;
        let pictureHoverVisibleHeight;
        let transitionHoverSpeed;
        let clickedTwice = 0;
        document.addEventListener("click", scrollProjectImageToBottomOnClick);
        function scrollProjectImageToBottomOnClick(e) {
            if (e.target.closest(".card-project__picture")) {
                reverseScrollOnTheAllCards();
                pictureHoverContainer = e.target.closest(".card-project__picture");
                pictureHoverImage = pictureHoverContainer.querySelector("img");
                pictureHoverHeight = pictureHoverImage.clientHeight;
                pictureHoverVisibleHeight = pictureHoverHeight - pictureHoverContainer.offsetHeight;
                transitionHoverSpeed = pictureHoverVisibleHeight / pixelsPerSecond;
                pictureHoverImage.style.top = `-${pictureHoverVisibleHeight}px`;
                pictureHoverImage.style.transition = `top ${transitionHoverSpeed}s linear`;
                pictureHoverImage.dataset.active = "1";
                if (clickedTwice) {
                    pictureHoverImage.style.top = `0px`;
                    clickedTwice = 0;
                } else clickedTwice = 1;
                console.log(clickedTwice);
            }
        }
        document.addEventListener("mouseover", scrollProjectImageToBottomOnHover);
        function scrollProjectImageToBottomOnHover(e) {
            if (e.target.closest(".card-project__picture")) {
                pictureHoverContainer = e.target.closest(".card-project__picture");
                pictureHoverImage = pictureHoverContainer.querySelector("img");
                pictureHoverHeight = pictureHoverImage.clientHeight;
                pictureHoverVisibleHeight = pictureHoverHeight - pictureHoverContainer.offsetHeight;
                transitionHoverSpeed = pictureHoverVisibleHeight / pixelsPerSecond;
                pictureHoverImage.style.top = `-${pictureHoverVisibleHeight}px`;
                pictureHoverImage.style.transition = `top ${transitionHoverSpeed}s linear`;
                pictureHoverImage.dataset.active = "1";
                clickedTwice = 1;
            } else reverseScrollOnTheAllCards();
        }
        function reverseScrollOnTheAllCards() {
            let pictureContainers = document.querySelectorAll(".card-project__picture");
            for (let index = 0; index < pictureContainers.length; index++) {
                const pictureContainer = pictureContainers[index];
                const pictureImage = pictureContainer.querySelector("img");
                let pictureHeight = pictureImage.clientHeight;
                let pictureVisibleHeight = pictureHeight - pictureContainer.offsetHeight;
                let transitionSpeed = pictureVisibleHeight / pixelsPerSecond;
                pictureImage.dataset.active = "0";
                pictureImage.style.transition = `top ${transitionSpeed}s linear`;
                pictureImage.style.top = `0px`;
            }
        }
        document.addEventListener("pointerdown", scrollProjectImageToBottomOnPointerOut);
        function scrollProjectImageToBottomOnPointerOut(e) {
            if (e.target.closest(".card-project__picture")) {
                pictureHoverContainer = e.target.closest(".card-project__picture");
                pictureHoverImage = pictureHoverContainer.querySelector("img");
                if ("0" == pictureHoverImage.dataset.active) {
                    clickedTwice = 0;
                    reverseScrollOnTheAllCards();
                }
            }
            if (!e.target.closest(".card-project__picture")) {
                clickedTwice = 0;
                reverseScrollOnTheAllCards();
            }
        }
    }
    window["FLS"] = true;
    isWebp();
})();
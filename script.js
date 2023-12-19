// ==UserScript==
// @name         Rooki's Lemmyverse userscript
// @namespace    http://tampermonkey.net/
// @version      2023-12-19
// @description  A simple script that adds a button to copy a user's name into this pattern https://lemmyverse.link/u/username
// @author       Rooki
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @match        https://*/u/*
// @grant        GM_setClipboard
// @grant        GM_document
// @grant        GM_addStyle
// @run-at       document-start

// ==/UserScript==

const is_lemmy_page = () => window.location.pathname.startsWith('/u/') && window.location.pathname.split('/').length === 3 && document.querySelector('a[href="https://join-lemmy.org"') !== null;

(function () {
    'use strict';
    document.addEventListener("DOMContentLoaded", function () {
        console.log(document.querySelector('a[href="https://join-lemmy.org"') !== null);

        console.log(window.location.pathname.startsWith('/u/') && window.location.pathname.split('/').length === 3);
        // Check if  we are on a lemmy page
        if (is_lemmy_page()) {
            // Add a button to copy the user's name into this pattern https://lemmyverse.link/u/username
            const user_name = window.location.pathname.split('/')[2];
            const button = document.createElement('button');

            button.innerText = 'Copy Lemmyverse link';
            button.addEventListener('click', () => {
                navigator.clipboard.writeText(`https://lemmyverse.link/u/${user_name}`).then(function () {
                    console.log('[Lemmyverse] Copying to clipboard was successful!');
                }, function (err) {
                    console.error('[Lemmyverse] Could not copy text: ', err);
                });

            }
            );
            button.className = "btn btn-secondary me-2"
            button.style = "margin-left: auto; margin-top: 10px"

            document.querySelector('a.person-listing').parentElement.parentElement.parentElement.parentElement.appendChild(button);
        }
    });

})();

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

const add_button = () => {

    if (document.querySelector('a.person-listing') === null || document.querySelector('#lemmyverse-copy-button') !== null) {
        return;
    }
    // Add a button to copy the user's name into this pattern https://lemmyverse.link/u/username
    let user_name = window.location.pathname.split('/')[2];
    const button = document.createElement('button');

    if (!user_name.includes('@')) {
        user_name = user_name + '@' + window.location.hostname;
    }

    button.innerText = 'Copy Lemmyverse link';
    button.addEventListener('click', () => {
        navigator.clipboard.writeText(`https://lemmyverse.link/u/${user_name}`).then(function () {
            console.log('[Lemmyverse] Copying to clipboard was successful!');
        }, function (err) {
            console.error('[Lemmyverse] Could not copy text: ', err);
        });

    }
    );
    button.className = "d-flex align-self-start btn btn-secondary me-2"

    button.id = 'lemmyverse-copy-button';

    document.querySelector('a.person-listing').parentElement.parentElement.parentElement.parentElement.appendChild(button);
}

(function () {
    'use strict';
    document.addEventListener('DOMContentLoaded', () => {
        if (is_lemmy_page()) {
            add_button();
        }

        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        if( MutationObserver ){
            // define a new observer
            var mutationObserver = new MutationObserver(() => {
                console.log('[Lemmyverse] Checking...');
                if (is_lemmy_page()) {
                    add_button();
                }
            })
      
            // have the observer observe for changes in children
            mutationObserver.observe( document.body, { childList:true, subtree:true })
            return mutationObserver
          }
        
    });
  

    window.addEventListener("popstate", function () {
        console.log('[Lemmyverse] Ready');
        // Check if  we are on a lemmy page
        if (is_lemmy_page()) {
            add_button()
        }
    });
})();

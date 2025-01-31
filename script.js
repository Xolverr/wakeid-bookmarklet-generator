// This file contains the JavaScript logic for the bookmarklet generator. 

function generateBookmarklet (code){
    var title = 'WakeID';
    var link  = document.getElementById("bookmarklet-a");

    var output = "javascript:" +  encodeURIComponent("(function(){" + cleanCode(code) +  "})();");
    
    link.text = title;
    link.href = output;
    
}

function cleanCode(code){
    return code.trim()
}

document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const generateButton = document.getElementById('generate');

    generateButton.addEventListener('click', () => {
        const username = usernameInput.value;
        const password = passwordInput.value;

        const bookmarkletCode = `
            var items = {
                username: '${username}',
                password: '${password}'
            };

            var enableExtraDelays = false;

            clickButton = () => {
                const button = document.querySelector('button#authn-go-button'); // Replace with the actual ID of the button
                if (button) {
                    button.click();
                }
            }

            function selectOption(dropdown, text) {
                var el = dropdown;
                var desiredValue = text;
                for (var i = 0; i < el.options.length; i++) {
                    if (el.options[i].text === desiredValue) {
                        el.selectedIndex = i;
                        el.dispatchEvent(new Event('change', { bubbles: true })); // Trigger change event
                        break;
                    }
                }
            }

            setTimeout(function() {
                const dropdown = document.querySelector('select.x-select'); // Replace with the actual ID of the dropdown
                const inputBox = document.querySelector('input#identification'); // Replace with the actual ID of the input box

                if (dropdown) {
                    selectOption(dropdown, 'Student');
                }

                if (inputBox) {
                    inputBox.value = items.username || 'defaultUsername'; // Use stored username or default
                    inputBox.dispatchEvent(new Event('input', { bubbles: true })); // Trigger input event
                }

                if (enableExtraDelays) {
                    // Wait for the input fields to be filled before clicking the button
                    setTimeout(function() {
                        clickButton();
                    }, 1000);
                } else {
                    clickButton();
                }

                // Waits for the form to move to the next page to input password
                setTimeout(function() {
                    const passwordBox = document.querySelector('input.ember-text-field'); // Replace with the actual ID of the password box

                    if (passwordBox) {
                        passwordBox.value = items.password || 'defaultPassword'; // Use stored password or default
                        passwordBox.dispatchEvent(new Event('input', { bubbles: true })); // Trigger input event
                    }

                    if (enableExtraDelays) {
                        // Wait for the password to be filled before clicking the button again
                        setTimeout(function() {
                            clickButton();
                        }, 500);
                    } else {
                        clickButton();
                    }

                }, (enableExtraDelays ? 1000 : 100));
            }, 500);`;

        generateBookmarklet(bookmarkletCode);
        
    });
    
});

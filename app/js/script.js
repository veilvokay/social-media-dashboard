const body = document.body
const inputs = document.querySelectorAll('.toggle__wrapper input');
const darkButton = document.getElementById('dark');
const lightButton = document.getElementById('light');

const resetInputs = () => {
    inputs.forEach(input => input.checked = false);
}

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', e => {
        const themeColor = e.target.id;
        body.classList = themeColor;
        localStorage.setItem('colorTheme', themeColor);
    })
}

const getColorTheme = () => {
    return localStorage.getItem('colorTheme');
}

const checkUserTheme = () => {
    if (getColorTheme == null) {
        resetInputs();
        if (window.matchMedia("(prefers-color-scheme: light)").matches) {
            lightButton.checked = true;
        }
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            darkButton.checked = true;
        }
    }
}

const checkThemeChange = () => {
    window
        .matchMedia("(prefers-color-scheme: light)")
        .addEventListener('change', e => {
            checkUserTheme();
        })
}

const setDarkTheme = () => {
    body.classList = 'dark';
}

const setLightTheme = () => {
    body.classList = 'light';
}

const setColorTheme = () => {
    const colorTheme = getColorTheme();
    resetInputs();

    switch (colorTheme) {
        case 'dark':
            setDarkTheme();
            console.log('done');
            darkButton.checked = true;
            break;
        case 'light':
            setLightTheme();
            lightButton.checked = true; 
            break;
        default:
            break;
    }
}


setColorTheme();
checkThemeChange();


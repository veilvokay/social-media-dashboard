window.addEventListener('DOMContentLoaded', (e) => {
    const body = document.body
    const toggleWrapper = document.querySelector('.toggle__wrapper');
    const inputs = document.querySelectorAll('.toggle__wrapper input');
    const toggleDark = document.getElementById('dark');
    const toggleLight = document.getElementById('light');

    toggleWrapper.addEventListener('click', () => {
        const selectedInput = Array.from(inputs).filter(el => el.checked)[0].id;
        body.className = '';
        body.classList.add(selectedInput);
    });
})
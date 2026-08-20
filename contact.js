const loginForm = document.querySelector('#login-form');
const contactForm = document.querySelector('#contact-form');
const loginPanel = document.querySelector('#login-panel');
const contactPanel = document.querySelector('#contact-panel');
const logoutButton = document.querySelector('#logout-button');
const authStatus = document.querySelector('#auth-status');
const loginMessage = document.querySelector('#login-message');
const contactMessage = document.querySelector('#contact-message');

function setAuthenticated(email) {
    loginPanel.hidden = true;
    contactPanel.hidden = false;
    logoutButton.hidden = false;
    authStatus.textContent = `Signed in as ${email}`;
}

function setResponsiveLayout() {
    document.body.classList.toggle('compact-layout', window.matchMedia('(max-width: 600px)').matches);
}

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!loginForm.reportValidity()) return;
    const email = loginForm.email.value.trim();
    localStorage.setItem('contact-user', email);
    loginMessage.textContent = 'You are signed in.';
    setAuthenticated(email);
});

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    contactMessage.textContent = 'Thanks, your message is ready to be sent.';
    contactForm.reset();
});

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('contact-user');
    loginPanel.hidden = false;
    contactPanel.hidden = true;
    logoutButton.hidden = true;
    authStatus.textContent = '';
    loginMessage.textContent = '';
});

window.addEventListener('resize', setResponsiveLayout);
setResponsiveLayout();
const savedUser = localStorage.getItem('contact-user');
if (savedUser) setAuthenticated(savedUser);

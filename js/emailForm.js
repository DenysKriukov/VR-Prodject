const eMailForm = document.querySelector('.footer-form');
const eMail = document.querySelector('.footer-input');

const footerFormSubmit = (e) => {
    e.preventDefault ();

    console.log('email:', eMail.value);
    eMail.value = "";
};
eMailForm.addEventListener("submit", footerFormSubmit); 
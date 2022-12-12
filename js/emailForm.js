const eMailForm = document.querySelector('.footer-form');
const eMail = document.querySelector('.footer-input');

const footerSubmitOf = (e) => {
    e.preventDefault ();

    let i= {
        email: `${eMail.value}`,
    };
    console.log(i);
    eMail.value = '';
};
eMailForm.addEventListener("submit", footerSubmitOf);
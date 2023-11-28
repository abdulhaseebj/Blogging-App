import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { auth } from "./config.js";


const form = document.querySelector('.form');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const modalMessage = document.querySelector('#modal-message');

onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location = 'home.html'
        return
    }
});



// login function

form.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log(email.value);
    // console.log(password.value);
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            window.location = 'home.html'
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            modalMessage.innerHTML = 'invalid-login-credentials'
            my_modal_3.showModal()
        });

})




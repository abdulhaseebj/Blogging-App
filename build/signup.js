import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";


const form = document.querySelector('.form');
const firstName = document.querySelector('.first-name');
const lastName = document.querySelector('.last-name');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const repeatPassword = document.querySelector('.repeat-password');
const modalMessage = document.querySelector('#modal-message');

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (password.value !== repeatPassword.value) {
        console.log('password are not same');
        modalMessage.innerHTML = 'password is not same here'
        my_modal_3.showModal()
        return
    }

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            addDoc(collection(db, "users"), {
                Firstname: firstName.value,
                Lastname: lastName.value,
                email: email.value,
                uid: user.uid,
            })
                .then((res) => {
                    console.log(res);
                    window.location = 'home.html'
                })
                .catch((err) => {
                    console.log(err);
                })

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            modalMessage.innerHTML = errorMessage
            my_modal_3.showModal()
        });
})

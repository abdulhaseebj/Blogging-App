import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db, storage } from "./config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js'


const form = document.querySelector('.form');
const firstName = document.querySelector('.first-name');
const lastName = document.querySelector('.last-name');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const repeatPassword = document.querySelector('.repeat-password');
const modalMessage = document.querySelector('#modal-message');
const uploadPhoto = document.querySelector('.upload-photo');

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const names = `${firstName.value} ${lastName.value}`;
    if (password.value !== repeatPassword.value) {
        console.log('password are not same');
        modalMessage.innerHTML = 'password is not same here'
        my_modal_3.showModal()
        return
    }

    const files = uploadPhoto.files[0]
    const storageRef = ref(storage, email.value);
    uploadBytes(storageRef, files).then(() => {
        getDownloadURL(storageRef).then((url) => {
            createUserWithEmailAndPassword(auth, email.value, password.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                    addDoc(collection(db, "users"), {
                        names: names,
                        email: email.value,
                        uid: user.uid,
                        profileUrl: url
                    }).then((res) => {
                        console.log(res);
                        window.location = 'login.html'
                    }).catch((err) => {
                        console.log(err);
                    })
                })
        })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
                modalMessage.innerHTML = errorMessage
                my_modal_3.showModal()
            });
    })

        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
        

})



import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { auth } from "./config.js";

const logout = document.querySelector('.logout-btn');



onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location = 'index.html'
        return
    }
});


// signout function

logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location = 'index.html'

    }).catch((error) => {
        console.log(error);
    });

})


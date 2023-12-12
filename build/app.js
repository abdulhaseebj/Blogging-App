import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, getDocs, } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";


const userWish = document.querySelector('.wish');
const render = document.querySelector('.render');
const logoutBtn = document.querySelector('.logoutBtn');
const profileBtn = document.querySelector('.profileBtn');
const dashboardBtn = document.querySelector('.dashboardBtn');
// const div = document.querySelector('.main-div');

let Loginuser = false
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user);
        Loginuser = true
        return
    } else {
        logoutBtn.innerHTML = 'Login'
        profileBtn.style.display = 'none'
        dashboardBtn.style.display = 'none'

    }
});

logoutBtn.addEventListener('click', () => {
    if (Loginuser) {

        signOut(auth).then(() => {
            window.location = 'login.html'
        }).catch((error) => {
            console.log(error);
        });
    } else {
        window.location = 'login.html'
    }
})


// navbar wishes function

function userWishes() {
    const currentDate = new Date()
    const currentHour = currentDate.getHours()
    // console.log(currentHour);

    let wishes;

    if (currentHour >= 5 && currentHour < 12) {
        wishes = 'Good Morning Readers !'
    } else if (currentHour >= 12 && currentHour < 17) {
        wishes = 'Good Afternoon Readers !'
    } else if (currentHour >= 17 && currentHour < 20) {
        wishes = 'Good Evening Readers !'
    } else {
        wishes = 'Good Night Readers !'
    }
    userWish.innerHTML = wishes
}

userWishes()

// date function
function formatDate(timestamp) {
    const dateObject = timestamp.toDate();
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return dateObject.toLocaleDateString("en-US", options);
}


// get data form firestore function
let arr = []

const querySnapshot = await getDocs(collection(db, "blog"));
querySnapshot.forEach((doc) => {
    // console.log(doc.data());
    arr.push(doc.data())
});


// render data function
function renderData() {
    arr.map((item) => {
        render.innerHTML += `<div
                class="signup  bg-white px-8  py-8 rounded-2xl shadow-1 w-[300px] sm:w-[500px] md:w-[650] lg:w-[800px] mt-8 mb-8">
                <div class="flex gap-4 items-center" >
                <img class="profileImage rounded-3xl w-[100px]" src="${item.userobj.profileUrl}" alt="">
                <div>
                <h2 class="font-black text-2xl ">${item.Title}</h2>
                <p class=" mt-3">${item.userobj.names} - ${formatDate(
            item.postDate
        )}</p>
                    </div>
                </div>
                <p class="mt-3 pr-7">${item.Text}</p>
                
                
               <div class='mt-10' > <a class='font-black' href="./spacific.html">See all from this user</a></div>
                </div>
                `
    })
}

renderData()









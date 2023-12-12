import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc, getDocs, Timestamp, query, where, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";



const logout = document.querySelector('.logout-btn');
const blogInput = document.querySelector('.blog-input');
const blogTextarea = document.querySelector('.blog-textarea');
const publishBtn = document.querySelector('.publish-btn');
const userRen = document.querySelector('.user-ren');
const profileImage = document.querySelector('.profileImage');
const render = document.querySelector('.render');

let img;
let names;
let userobj;

// user login or signup
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        // console.log(uid);
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // console.log(doc.data());
            userRen.innerHTML = `${doc.data().names} `
            profileImage.src = doc.data().profileUrl
            names = doc.data().names
            img = doc.data().profileUrl
            userobj = doc.data()
        });
        getDataFromFirestore(uid)
    } else {
        window.location = 'index.html'
    }
});

// // signout function

logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location = 'index.html'

    }).catch((error) => {
        console.log(error);
    });

})


const arr = []

function renderPost() {
    render.innerHTML = ''
    arr.map((item) => {
        render.innerHTML += `<div
        class="signup  bg-white px-8  py-8 rounded-2xl shadow-1 w-[300px] sm:w-[500px] md:w-[650] lg:w-[800px] mt-8 mb-8">
        <div class="flex gap-4 items-center" >
        <img class="profileImage rounded-3xl w-[100px]" src="${img}" alt="">
        <div>
        <h2 class="font-black text-2xl ">${item.Title}</h2>
        <p class=" mt-3">${names} - ${formatDate(
            item.postDate
        )}</p>
            </div>
        </div>
        <p class="mt-3 pr-7">${item.Text}</p>
        <div class="flex gap-4 mt-6" >
        <button type="button" id="delete" >Delete</button>
        <button type="button" id="update" >Edit</button>
        </div>
        
        </div>
        `


    })

    const del = document.querySelectorAll('#delete');
    const upd = document.querySelectorAll('#update');

    del.forEach((btn, index) => {
        btn.addEventListener('click', async () => {
            console.log('delete called', arr[index]);
            await deleteDoc(doc(db, "blog", arr[index].docId))
                .then(() => {
                    console.log('post deleted');
                    arr.splice(index, 1);
                    renderPost()
                });
        })
    })
    upd.forEach((btn, index) => {
        btn.addEventListener('click', async () => {
            console.log('update called', arr[index]);
            const updatedTitle = prompt('Enter new Title', arr[index].Title);
            const updatedText = prompt('Enter new Description', arr[index].Text);
            await updateDoc(doc(db, "blog", arr[index].docId), {
                Title: updatedTitle,
                Text: updatedText,
                postDate: Timestamp.fromDate(new Date()),
            });
            arr[index].Title = updatedTitle;
            arr[index].Text = updatedText;
            renderPost()

        })
    })
}




// get data from firestore
async function getDataFromFirestore(uid) {
    const q = query(collection(db, "blog"), where("Uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
        arr.push({ ...doc.data(), docId: doc.id });
    });
    renderPost()

}
console.log(arr);


// data add on firestore
publishBtn.addEventListener('click', async () => {
    try {
        const docRef = await addDoc(collection(db, "blog"), {
            Title: blogInput.value,
            Text: blogTextarea.value,
            Uid: auth.currentUser.uid,
            postDate: Timestamp.fromDate(new Date()),
            userobj
        });
        arr.push({
            uid: auth.currentUser.uid,
            Title: blogInput.value,
            Text: blogTextarea.value,
            postDate: Timestamp.fromDate(new Date()),
            docId: docRef.id,
        });
        renderPost()

    } catch (e) {
        console.error("Error adding document: ", e);
    }
    blogInput.value = ''
    blogTextarea.value = ''
})


function formatDate(timestamp) {
    const dateObject = timestamp.toDate();
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return dateObject.toLocaleDateString("en-US", options);
}

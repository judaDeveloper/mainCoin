 /*==================
 FIREBASE API CONFIG
=====================*/
const firebaseConfig = {
    apiKey: "AIzaSyAHYguXNxgoBQq0rdoFOj9MMppCU9kmE-Y",
    authDomain: "citycoin2025.firebaseapp.com",
    databaseURL: "https://citycoin2025-default-rtdb.firebaseio.com",
    projectId: "citycoin2025",
    storageBucket: "citycoin2025.firebasestorage.app",
    messagingSenderId: "1024446979523",
    appId: "1:1024446979523:web:f2b3b89e039c92aaef7176"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

 /*==================
 START fs_setup_cache
=====================*/
firebase.firestore().settings({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});
firebase.initializeApp({
    apiKey: 'AIzaSyDZOkXdDSaw1xwonO7L8GcdSfQUtbSMM4c',
    authDomain: 'cars-digital-3c158.firebaseapp.com',
    projectId: 'cars-digital-3c158',
} ,"persisted_app");

 /*===================
 initialize_persistence
======================*/
firebase.firestore().enablePersistence()
.catch((err) => {
    if (err.code == 'failed-precondition') { 

    } else if (err.code == 'unimplemented') { 

    }
});


var appdata = { 
    users: [], 
    loans: [],
    payments: [],
};

/* ===========
FETCH USERS
==============*/
const fetchusers = () => {
    let obj = {};
db.collection("cc_userdata").where("cid", "!=", '')
.onSnapshot({ includeMetadataChanges: true }, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
        obj[change.doc.id] = change.doc.data();
        appdata.users = Object.values(obj);
    });

    listclients();
});
};fetchusers();


/* ==========
FETCH LOANS
=============*/

const fetchloans = () => {
    let ob_j = {};
    db.collection("cc_loans").where("lid", "!=", '').onSnapshot({ includeMetadataChanges: true }, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
        ob_j[change.doc.id] = change.doc.data();
        appdata.loans = Object.values(ob_j);
    });
    //currentloans();
    //listloans();
});
};fetchloans();



/* ==========
CONNECTION
=============*/
var connection = '';
window.addEventListener("online", function() {  
    connection = 'connected';  
})  
window.addEventListener("offline", function() { 
    connection = 'disconnected';
	alert('You have lost internect connection!');
}) 


function resized() {
	var wd1 = window.innerWidth; 
	//var wd2 = document.getElementById("Main").clientWidth; 
	var wd2 = document.querySelector(".listings #tbody").clientWidth;
	document.getElementById("btnadd_payment").textContent = wd2+'/'+wd1;
}
resized();



/*================
    Toggle Modals
==================*/
function toggleModals(modal_id, form_id){
    let m   =  document.querySelector('#'+modal_id);
    let md  =  document.querySelector('#Modals');
    let mx  =  document.querySelectorAll('#Modals .mdl');
    let disp = m.style.display;
    let x = document.querySelectorAll('#'+modal_id+' form');

    if (disp == '' || disp == 'none'){
        mx.forEach(item => { 
            if (item.id == m.id) {
                m.style.display = 'grid';
                md.style.display = 'grid';

                if (!form_id == '') { 
                    x.forEach(frm => { 
                        frm.classList.remove('new'); 
                        if (frm.id == form_id){ 
                            frm.classList.add('new'); 
                            frm.reset(); 
                        }
                    });
                } 
            }else { item.style.display = 'none';}
        });
    }else {
        md.style.display = 'none';
        m.style.display = 'none'; 
    }
}


/*===============
Close Forms 
================*/
function openClose(item){
    let x = document.querySelector(item);
    let disp = x.style.display;
    if (disp == '' || disp == 'none'){
        x.style.display = 'grid';
    }else {
        x.style.display = 'none';
    }
}

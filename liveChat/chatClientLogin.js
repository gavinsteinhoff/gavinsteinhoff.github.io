firebase.auth().signOut().then(function () {
    // Sign-out successful.
}).catch(function (error) {
    // An error happened.
});

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        $(location).attr('href', './index.html')
    }
});

function login() {
    firebase.auth().signInWithEmailAndPassword(document.getElementById('email').value, document.getElementById('pass').value)
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            console.log(errorCode);
        });
    document.getElementById("pass").value = "";
}





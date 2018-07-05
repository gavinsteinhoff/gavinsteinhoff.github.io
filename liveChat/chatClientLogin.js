firebase.auth().signOut().then(function () {
    // Sign-out successful.
}).catch(function (error) {
    // An error happened.
});

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        $(location).attr('href', './index.html')
    } else {
    }
});

function login() {
    firebase.auth().signInWithEmailAndPassword(document.getElementById('email').value, document.getElementById('pass').value)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            //if (errorCode === 'auth/wrong-password') {
            //    alert('Wrong password or email');
            //} else {
            //    alert(errorMessage);
            //}
            alert(errorMessage);
            console.log(error);
        });
    document.getElementById("pass").value = "";
}

    function Register() {
        firebase.auth().createUserWithEmailAndPassword(document.getElementById('email').value, document.getElementById('pass').value).catch(function (error) {
            // Handle Errors here.
            alert(error.message);
            // ...
        });
    }




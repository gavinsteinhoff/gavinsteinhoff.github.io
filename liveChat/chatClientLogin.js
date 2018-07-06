var newUser = false;

firebase.auth().signOut().then(function () {
    // Sign-out successful.
}).catch(function (error) {
    // An error happened.
});

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        if(newUser) {
            var user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: document.getElementById('dn').value
            }).then(function() {
                $(location).attr('href', './index.html')
            }).catch(function(error) {
                alert(error.errorMessage);
                console.log(error.errorCode);
            });
        }
        $(location).attr('href', './index.html')
    } else {
    }
});

function login() {
    newUser = false;
    firebase.auth().signInWithEmailAndPassword(document.getElementById('email').value, document.getElementById('pass').value)
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            console.log(errorCode);
        });
    document.getElementById("pass").value = "";
}

    function Register() {
        newUser = true;
        firebase.auth().createUserWithEmailAndPassword(document.getElementById('email').value, document.getElementById('pass').value).catch(function (error) {
            // Handle Errors here.
            alert(error.message);
            // ...
        });
    }




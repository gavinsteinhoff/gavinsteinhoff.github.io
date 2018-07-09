firebase.auth().signOut().then(function () {
    // Sign-out successful.
}).catch(function (error) {
    // An error happened.
});

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var user = firebase.auth().currentUser;
        database.ref('usernames/' + document.getElementById('dn').value.toLowerCase()).set(true);
        user.updateProfile({
            displayName: document.getElementById('dn').value
        }).then(function () {
            $(location).attr('href', './index.html')
        }).catch(function (error) {
            alert(error.errorMessage);
            console.log(error.errorCode);
        });
    } else {
    }
});

var usernames = [];
database.ref('/usernames').on('value', (function (snapshot) {
    names = snapshot.val();
    for (var key in names) {
        usernames.push(key);
        alert(usernames[0]);
    }
}));


function Register() {
    var email = document.getElementById('email').value;
    var psw = document.getElementById('psw').value;
    var psw2 = document.getElementById('psw2').value;
    var username = document.getElementById('dn').value.toLowerCase();

    if (!usernames.includes(username)) {
        if (psw === psw2) {
            if (document.getElementById('dn').value != "") {
                firebase.auth().createUserWithEmailAndPassword(email, psw).catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(errorMessage);
                    console.log(errorCode);
                });
            } else {
                alert('Provide a display name')
            }
        } else {
            alert("Passwords need to match");
        }
    } else {
        alert("Username taken");
    }
}




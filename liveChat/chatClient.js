firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
        $(location).attr('href', './login.html')
    }
});


var chat = {
    id: null,
    ref: 'rooms/',
    name: null,
    getRef: function () {
        return this.ref + this.id;
    }
}

var base = $('#chat');


//Join Chat Room
function joinRoom() {
    chat.id = document.getElementById('inputRoomId').value;
    var user = firebase.auth().currentUser;
    user.providerData.forEach(function (profile) {
        chat.name = profile.displayName;
      });
    startChat();
}

//Display Chat
function startChat() {
    var chain = $('<div></div>');
    base.append(chain);
    database.ref(chat.getRef() + '/msg').on('value', (function (snapshot) {
        var names = snapshot.val();
        chain.empty();
        for (var key in names) {
            var user = names[key]['username'];
            var msg = names[key]['message'];
            chain.append(createMsg(user, msg));
        }
    }));
}

function createMsg(user,msg) {
    var base = $("<p></p>");
    var author = $('<strong>').append(user, "<br />");
    base.append(author, msg);
    $('#test').append(base);
    return base;
}

//New Message
function message() {
    var msg = inputChat.value;
    var newPostKey = database.ref(chat.getRef() + "/msg").push().key;
    database.ref(chat.getRef() + "/msg/" + newPostKey).set({
        username: chat.name,
        message: msg
    });
    inputChat.value = "";
}

$('#inputChat').keypress(function (event) {
    if (event.keyCode == '13') {
        event.preventDefault();
        message();
    }
});

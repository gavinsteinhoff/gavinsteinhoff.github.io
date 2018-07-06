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

base = document.getElementById('chat');


//Join Chat Room
function joinRoom() {
    document.getElementById('roomChoice').style.display = 'none';
    chat.id = document.getElementById('inputRoomId').value;
    var user = firebase.auth().currentUser;
    user.providerData.forEach(function (profile) {
        console.log(profile.displayName);
        chat.name = profile.displayName;
      });
    startChat();
}

//Display Chat
function startChat() {
    chain = document.createElement('div');
    chain.className = "ui comments";
    base.appendChild(chain);
    database.ref(chat.getRef() + '/msg').on('value', (function (snapshot) {
        names = snapshot.val();
        chain.innerHTML = "";
        for (var key in names) {
            var user = names[key]['username'];
            var msg = names[key]['message'];
            chain.appendChild(createMsg(user, msg));
        }
    }));
}

function createMsg(user,msg) {
    var base = document.createElement('div');
    base.className = "comment";
    var content = document.createElement('div');
    content.classList = "content";
    var author = document.createElement('a');
    author.className = "author";
    author.innerHTML = user;
    var text = document.createElement('div');
    text.className = "text";
    text.innerHTML = msg;
    content.appendChild(author);
    content.appendChild(text);
    base.appendChild(content);
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

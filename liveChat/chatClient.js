var chat = {
    id: null,
    ref: 'rooms/',
    name: null,
    getRef: function () {
        return this.ref + this.id;
    }
}


//Create Chat Room GUI
var base = document.getElementById('chatRoom');
var inputRoomId = document.createElement("input");
inputRoomId.type = "text";
inputRoomId.placeholder = "Enter the room id";
base.appendChild(inputRoomId);
var inputName = document.createElement("input");
inputName.type = "text";
inputName.placeholder = "Enter you name";
base.appendChild(inputName);
var btnRoomId = document.createElement('button');
btnRoomId.onclick = joinRoom;
btnRoomId.appendChild(document.createTextNode("Enter Room"));
base.appendChild(btnRoomId);
var chatRoom = document.createElement("div");
base.appendChild(chatRoom);
var inputChat = document.createElement("input");
inputRoomId.type = "text";
inputChat.style.display = "none";
base.appendChild(inputChat);
var btnChat = document.createElement('button');
btnChat.onclick = message;
btnChat.appendChild(document.createTextNode("Chat"));
btnChat.style.display = "none";
base.appendChild(btnChat);

function login() {
    firebase.auth().signInWithEmailAndPassword(document.getElementById('email').value, document.getElementById('pass').value).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

function Register() {
    firebase.auth().createUserWithEmailAndPassword(document.getElementById('email').value, document.getElementById('pass').value).catch(function (error) {
        // Handle Errors here.
        alert(error.code);
        alert(error.message);
        // ...
    });
}

//Join Chat Room
function joinRoom() {
    btnRoomId.style.display = 'none';
    inputRoomId.style.display = 'none';
    inputName.style.display = 'none';
    inputChat.style.display = "block";
    btnChat.style.display = "block";
    chat.id = inputRoomId.value;
    chat.name = inputName.value;
    startChat();
}

//Display Chat
function startChat() {
    database.ref(chat.getRef() + '/msg').on('value', (function (snapshot) {
        names = snapshot.val();
        chatRoom.innerHTML = "";
        for (var key in names) {
            //output.innerHTML += names[key]['Gavin'] + "<br />";
            var user = names[key]['username'];
            var msg = names[key]['message'];
            //chatRoom.innerHTML += user + ": " + msg + "<br />";
            var card = document.createElement('div');
            card.className = "card";
            var cardbody = document.createElement('div');
            cardbody.className = "card-body";
            card.appendChild(cardbody);
            var cardtitle = document.createElement('h5');
            cardtitle.classList = "card-title";
            var cardtitletext = document.createTextNode(user);
            cardtitle.appendChild(cardtitletext);
            cardbody.appendChild(cardtitle);
            var cardText = document.createElement("p");
            cardText.className = "card-text";
            var cartTextText = document.createTextNode(msg);
            cardText.appendChild(cartTextText);
            cardbody.appendChild(cardText);
            chatRoom.appendChild(card);
        }
    }));
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

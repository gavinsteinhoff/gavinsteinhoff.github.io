//start of .js file
var game = {
    id: null,
    ref: 'games/',
    name: null,
    getRef: function () {
        return this.ref + this.id;
    }
}

function addName() {
    database.ref(game.getRef() + "/names/" + game.name).set(true);
}

function displayNames() {
    database.ref(game.getRef() + '/names').on('value', (function (snapshot) {
        names = snapshot.val();
        output = document.getElementById('names');
        output.innerHTML = "";
        for (var key in names) {
            output.innerHTML += key + "<br />";
        }
    }));
}
//end of .js file
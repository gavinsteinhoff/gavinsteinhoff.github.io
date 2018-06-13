document.addEventListener('DOMContentLoaded', function () {
    var floofs = document.getElementsByClassName("floof");

    var paragraphsMIN = 1;
    var paragraphsMAX = 2;

    Array.prototype.forEach.call(floofs, function (floof) {

        if (floof.classList.contains("floof-lg")) {
            paragraphsMIN = 3;
            paragraphsMAX = 5;
        }
        if (floof.classList.contains("floof-md")) {
            paragraphsMIN = 2;
            paragraphsMAX = 3;
        }
        if (floof.classList.contains("floof-sm")) {
            paragraphsMIN = 1;
            paragraphsMAX = 1;
        }
        var paragraphs = getRnd(paragraphsMIN, paragraphsMAX);
        var paragraph = "";

        var link = -1;
        var bold = -1;

        for (var i = 0; i < paragraphs; i++) {
            var sentences = getRnd(4, 8);
            if (floof.classList.contains("floof-x")) {
                link = getRnd(0, sentences);
                bold = getRnd(0, sentences);
            }

            for (var o = 0; o < sentences; o++) {
                var words = getRnd(5, 10);
                
                var sentence = getWord(1).toUpperCase();

                for (var j = 0; j < words; j++) {
                    var char = getRnd(1, 7);
                    sentence += getWord(char) + ' ';
                }

                sentence += getWord(5) + ". ";
                            
                if (o==link) {
                    sentence = sentence.replace (/^/,"<a href='#'>");
                    sentence += "</a>";
                } else if(o==bold) {
                    sentence = sentence.replace (/^/,"<b>");
                    sentence += "</b>";
                }

                paragraph += sentence;
            }  
        }
        paragraph += "<br><br>";
        floof.innerHTML = paragraph;
    }
        
    );
}, false);

function getWord(char) {
    var output = "";
    var chars = "abcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < char; i++) {
        output += chars.charAt(getRnd(0, 26));
    }
    return output;
}

function getRnd(low, high) {
    return Math.floor((Math.random() * high) + low);
}

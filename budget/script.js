var statements = [];
var userData = {
    backgroundColor: "rgba(220,0,0,1)",
    borderColor: "rgba(220,0,0,1)",
    pointBorderColor: "rgba(220,0,0,1)",
    pointBackgroundColor: "#fff",
    pointHoverBackgroundColor: "rgba(75,192,192,1)",
    pointHoverBorderColor: "rgba(220,220,220,1)",
};
var myLineChart;

var fileInput = document.getElementById("csv");
fileInput.addEventListener("change", function () {
    var reader = new FileReader();
    reader.readAsText(fileInput.files[0]);
    reader.onload = function () {
        var data = (Papa.parse(reader.result, {
            skipEmptyLines: true
        }).data);
        importStatement(data);
        fileInput.value = "";
        genNumbers();
        save();
        graphStatements();
    };
});

var importJSON = document.getElementById("importJSON");
importJSON.addEventListener('change', function () {
    var reader = new FileReader();
    reader.readAsText(importJSON.files[0]);
    reader.onload = function () {;
        var statementsJSON = JSON.parse(reader.result);
        $.each(statementsJSON, function (key, value) {
            statements.push(value);
        });
        console.log(statements);
        genNumbers();
        save();
        graphStatements();
    };
});


$(function () {
    load();
    $.each(statements, function (key, statement) {
        genNumbers();
        graphStatements();
    });
});

$("#add").click(function () {
    $("#csv:hidden").trigger("click");
});
$("#clearData").click(function () {
    $('#chart_div').empty();
    $("#tableData").empty();
    $("#table").css("display", "none");
    localStorage.clear();
    statements = new Array;
    $("#average").html("");
    $("#high").html("");
    $("#low").html("");
    $("#earned").html("");
    $("#spent").html("");
});
$("#export").click(function () {
    var object = $.extend({}, statements);
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(object));
    var a = $('<a href="data:' + data + '" download="data.json">download JSON</a>');
    a.css("display", "none");
    a.attr("id", "download");
    $("#menu").append(a);
    $("#download")[0].click();
});
$("#import").click(function () {
    localStorage.clear();
    statements = [];
    $("#average").html("");
    $("#high").html("");
    $("#low").html("");
    $("#importJSON:hidden").trigger('click');
});



function importStatement(data) {
    var open = data[0][4];
    var close = data[data.length - 1][4];
    var interest = data[data.length - 2][3];
    var month = data[data.length - 2][0].substring(0, 2) - 1;
    var year = data[data.length - 2][0].substring(6, 10);
    var date = new Date(year, month, 1);
    data.shift();
    data.pop();
    data.pop();
    var tran = [];
    $.each(data, function (key, value) {
        var balance = parseFloat(value[4].split("$")[1]);
        tran.push(new Transaction(value[0], value[2], value[3], balance));
    });
    var statement = (new Statement(open, close, interest, tran, date));
    if (statements.filter(s=> new Date(s.date).getTime() === new Date(statement.date).getTime()).length > 0) {
        alert("That statement is already in the system");
        return;
    }
    statements.push(statement);
    statements.sort(function (a, b) {
        return a.date - b.date;
    });
}

function save() {
    var statementsString = JSON.stringify(statements);
    localStorage.setItem("data", statementsString);
}

function load() {
    var statementsJSON = JSON.parse(localStorage.getItem('data'));
    if (statementsJSON != null) statements = statementsJSON;
    console.log(statements);
}

function genNumbers() {
    var avg = 0;
    var balances = [];
    var moneyEarned = 0;
    var moneySpent = 0;
    $.each(statements, function (key, statement) {
        $.each(statement.transactions, function (key, value) {
            var amount = value.amount.split("$");
            amount[1] = parseFloat(amount[1]);
            if (amount[0] == "+") moneyEarned += amount[1]; else moneySpent += amount[1];
            avg += value.newBalance;
            if (value.newBalance > 9)balances.push(value.newBalance);
        });
    });
    avg = avg / balances.length;
    $("#average").html("$" + avg.toFixed(2));
    $("#high").html("$" + fixZero(Math.max(...balances)));
    $("#low").html("$" + fixZero(Math.min(...balances)));
    $("#earned").html("$" + moneyEarned.toFixed(2));
    $("#spent").html("$" + moneySpent.toFixed(2));
}




function graphStatements() {
    $("#table").css("display", "table");
    $("#tableData").empty();
    var datapoints = [];
    $.each(statements, function (key, statement) {
        $.each(statement.transactions, function (key, transaction) {
            datapoints.push([new Date(transaction.date), transaction.newBalance, transaction.desc + " " + transaction.amount + "\n New Balance: $" + transaction.newBalance]);
            var tr = $("<tr>").append($("<td>").append(transaction.date));
            tr.append($("<td>").append(transaction.desc));
            tr.append($("<td>").append(transaction.amount));
            tr.append($("<td>").append("$"+transaction.newBalance));
            $("#table").append(tr);
        });
    });

    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawTrendlines);

    function drawTrendlines() {

        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn('date', 'Date');
        dataTable.addColumn('number', 'Balance');
        dataTable.addColumn({ type: 'string', role: 'tooltip' });
        dataTable.addRows(datapoints);

        var options = {
            title: "Transaction History",
            colors: ['#AB0D06', '#007329'],
            theme: 'material',
            tooltip: { isHtml: true },
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(dataTable,options);
    }

};





function graph() {
    var lables = new Array();
    var balances = new Array();
    $.each(statements, function (key, statement) {
        $.each(statement.transactions, function (key, value) {
            lables.push(value.date);
            balances.push(value.newBalance).toString();
        });
    });
    var canvas = document.getElementById('myChart');
    var data = {
        labels: lables,
        datasets: [
            {
                label: "Balance",
                fill: false,
                lineTension: .1,
                backgroundColor: userData.backgroundColor,
                borderColor: userData.borderColor,
                pointBorderColor: userData.pointBorderColor,
                pointBackgroundColor: userData.pointBackgroundColor,
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: userData.pointHoverBackgroundColor,
                pointHoverBorderColor: userData.pointHoverBorderColor,
                pointHoverBorderWidth: 3,
                pointRadius: 5,
                pointHitRadius: 1,
                data: balances,
            }
        ]
    };
    var option = {
        showLines: true,
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    var tran;
                    $.each(statements, function (key, statement) {
                        $.each(statement.transactions, function (key, transaction) {
                            if (transaction.date == tooltipItem.xLabel && transaction.newBalance == tooltipItem.yLabel) {
                                tran = transaction;
                                return false;
                            }
                        });
                        if (tran != null) return false;
                    });
                    var output = tran.amount + " " + tran.desc;
                    return output;
                },
                title: function (tooltipItem, data) {
                    var tran;
                    var tooltipItem = tooltipItem[0];
                    $.each(statements, function (key, statement) {
                        $.each(statement.transactions, function (key, transaction) {
                            if (transaction.date == tooltipItem.xLabel && transaction.newBalance == tooltipItem.yLabel) {
                                tran = transaction;
                                return false;
                            }
                        });
                        if (tran != null) return false;
                    });
                    var output = tooltipItem.xLabel + " $" + tran.newBalance;
                    return output;
                }
            }
        }
    };
    if (myLineChart != null) myLineChart.clear();
    myLineChart = Chart.Line(canvas, {
        data: data,
        options: option
    });


}














function fixZero(value) {
    if (value.toString().split(".")[1].length != 2) return value + "0"; else return value;
}

class Statement {
    constructor(open, close, interest, tran, date) {
        this.openingBalance = open;
        this.closingBalance = close;
        this.interest = interest;
        this.transactions = tran;
        this.date = date
    }
}

class Transaction {
    constructor(date, desc, amount, newBalance) {
        this.date = date;
        this.desc = desc;
        this.amount = amount;
        this.newBalance = newBalance;
    }
}
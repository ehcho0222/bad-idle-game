var player = {
    version: 0.20,
    point: 0,
    pointPerClick: 1,
    pointPerClickCost: 10,
    autoPointLevel: 0,
    autoPointCost: 100,
    lastTick: Date.now()
}

function clickPoint() {
    player.point += player.pointPerClick
    document.getElementById("a00").innerHTML = player.point + " Point"
    if (player.point != 1)
    {
        document.getElementById("a00").innerHTML = document.getElementById("a00").innerHTML + "s"
    }
}

function upgradeClick() {
    if (player.point >= player.pointPerClickCost)
    {
        player.point -= player.pointPerClickCost
        player.pointPerClick += 1
        player.pointPerClickCost = player.pointPerClick * player.pointPerClick * 10
        document.getElementById("a00").innerHTML = player.point + " Point"
        if (player.point != 1)
        {
            document.getElementById("a00").innerHTML = document.getElementById("a00").innerHTML + "s"
        }
        document.getElementById("a01").innerHTML = "Earn " + player.pointPerClick + " Points"
        document.getElementById("a02").innerHTML = "Upgrade Click: Level " + player.pointPerClick + " (Costs " + player.pointPerClickCost + " Points)"
    }
}

function autoPoint(ms) {
    player.point += (player.autoPointLevel * player.autoPointLevel * ms / 1000)
    document.getElementById("a03").innerHTML = (player.autoPointLevel * player.autoPointLevel) + " Points/sec"
    document.getElementById("a00").innerHTML = player.point + " Point"
    if (player.point != 1)
    {
        document.getElementById("a00").innerHTML = document.getElementById("a00").innerHTML + "s"
    }
}

function upgradeAutoPoint() {
    if (player.point >= player.autoPointCost)
    {
        player.point -= player.autoPointCost
        player.autoPointLevel += 1
        player.autoPointCost = player.autoPointLevel * player.autoPointLevel * player.autoPointLevel * 100
        document.getElementById("a00").innerHTML = player.point + " Point"
        if (player.point != 1)
        {
            document.getElementById("a00").innerHTML = document.getElementById("a00").innerHTML + "s"
        }
        document.getElementById("a01").innerHTML = "Earn " + player.pointPerClick + " Points"
        document.getElementById("a02").innerHTML = "Upgrade Auto: Level " + player.autoPointLevel + " (Costs " + player.autoPointCost + " Points)"
    }
}

var savegame = JSON.parse(localStorage.getItem("badIdleSave"))
if (savegame !== null) {
    if (typeof savegame.version !== "undefined") player.version = savegame.version
    if (typeof savegame.point !== "undefined") player.point = savegame.point
    if (typeof savegame.pointPerClick !== "undefined") player.pointPerClick = savegame.pointPerClick
    if (typeof savegame.pointPerClickCost !== "undefined") player.pointPerClickCost = savegame.pointPerClickCost
    if (typeof savegame.autoPointLevel !== "undefined") player.autoPointLevel = savegame.autoPointLevel
    if (typeof savegame.autoPointCost !== "undefined") player.autoPointCost = savegame.autoPointCost
    if (typeof savegame.lastTick !== "undefined") player.lastTick = savegame.lastTick
}

var gameLoop = window.setInterval(function() {
    diff = Date.now() - player.lastTick
    player.lastTick = Date.now()
    autoPoint(diff)
}, 1000)

var saveLoop = window.setInterval(function() {
    localStorage.setItem("badIdleSave", JSON.stringify(player))
    console.log("Game Saved")
}, 10000)
import Chess from 'chess.js'

var pgn = `
1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. Nc3 Nd4 5. Ba4 Bc5 6. Nxe5 O-O 7. Nd3 Bb6 8.
e5 Ne8 9. Nd5 c6 10. Ne3 d5 11. O-O f6 12. c3 Nf5 13. Bc2 Qe7 14. f4 Nxe3 15.
dxe3 Bf5 16. a4 Bc7 17. b3 fxe5 18. Ba3 Bd6 19. Bxd6 Nxd6 20. Nxe5 Bxc2 21. Qxc2
Nf7 22. Ng4 h5 23. Nf2 Qxe3 24. g3 Rae8 25. Qg6 Qf3 26. Rae1 Rxe1 27. Rxe1 Nh6
28. Qd3 Qxd3 29. Nxd3 Nf5 30. a5 Kf7 31. Ne5+ Kg8 32. b4 Re8 33. Kf2 a6 34. Nd7
Rxe1 35. Kxe1 Kf7 36. Ke2 Ke7 37. Nc5 Nd6 38. h3 Kf6 39. g4 hxg4 40. hxg4 g5 41.
Kf3 Kg6 42. f5+ Kf6 43. Ke3 Nc4+ 44. Kd4 Nd6 45. Nd7+ Ke7 46. Nc5 Kf6 47. Kd3
Ke5 48. Ke3 Kf6 49. Kd4 Nb5+ 50. Kd3 Nd6 51. Ke3 Nc4+ 52. Kd4 Nd6 53. Ne6 Ne4
54. Nd8 Nd6 55. Kc5 Ne4+ 56. Kb6 Nxc3 57. Nxb7 Na2 58. Kxa6 Nxb4+ 59. Kb6 d4 60.
Nc5 d3 61. Nxd3 Nxd3 62. a6`

window.chess = new Chess();

var preview = false;
var fen = "";
window.board = Chessboard('board1',  {
    draggable: true,
    dropOffBoard: 'trash',
    sparePieces: true
})
setupControls()

function getNewFen(){
    chess.load_pgn(pgn);
    console.log(chess.history());
    var randI = Math.floor(Math.random()*chess.history().length);
    for(var i=0; i<randI;i++){
        chess.undo()
    }
    return chess.fen()
}

function clearBoard(){
  board.clear()
  preview = false;
}
function resetBoard(){
    clearBoard();
    fen = getNewFen();
    board.position(fen);
}

var clearBoardTimeout;
function resetClick(){
    clearTimeout(clearBoardTimeout);
    preview = true;
    var fen = board.fen()
    console.log(fen);
    resetBoard();
    var delay = 1000*document.getElementById("timeDelay").value
    clearBoardTimeout = setTimeout(clearBoard, delay);
}
function submitBoard(){
    if(!preview){
        console.log(fen)
        console.log(board.fen())
        if(fen.split(' ')[0] === board.fen()){
            alert("Correct")
            clearBoard()
        }
        else {
            alert("Try again")
        }
    }
}
function setupControls(){
    var resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", resetClick);
    var submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", submitBoard)
}

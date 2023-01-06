function rectangularCollision({ rectangule1, rectangule2 }) {
  return (
    (rectangule1.attackBox.position.x + rectangule1.attackBox.width >=
      rectangule2.position.x) &
    (rectangule1.attackBox.position.x <=
      rectangule2.position.x + rectangule2.width) &
    (rectangule1.attackBox.position.y + rectangule1.attackBox.height >=
      rectangule2.position.y) &
    (rectangule1.attackBox.position.y <=
      rectangule2.position.y + rectangule2.height)
  );
}

function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId);
  document.querySelector("#displayResult").style.display = "flex";
  if (player.health === enemy.health) {
    document.querySelector("#displayResult").innerHTML = "TIE";
  } else if (player.health > enemy.health) {
    document.querySelector("#displayResult").innerHTML = "PLAYER 1 WINS!";
  } else if (player.health < enemy.health) {
    document.querySelector("#displayResult").innerHTML = "PLAYER 2 WINS!";
  }
}

let timer = 5;
let timerId;
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }

  if (timer === 0) {
    determineWinner({ player, enemy });
  }
}

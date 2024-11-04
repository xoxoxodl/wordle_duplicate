const 정답 = "APPLE";

let index = 0;
let attempts = 0;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:38%; background-color:white; width:200px; height:100px;";
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    //clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };


  const handleEnterKey = () => {
    let 맞은_갯수 = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.box[data-index='${attempts}${i}']`
      );
      
      
      const 입력한_글자 = block.innerText;
      const keyButton = document.querySelector(`.keybutton[data-key='${입력한_글자}']`);
      const 정답_글자 = 정답[i];
      
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64";
        keyButton.style.background = "#6AAA64";
        block.classList.add("animate__animated", "animate__flipInX");
      } else if (정답.includes(입력한_글자)) {block.style.background = "#C9B458"; keyButton.style.background = "#C9B458";}
      else {block.style.background = "#787C7E"; keyButton.style.background = "#787C7E";}
      block.style.color = "white";
    }

    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.box[data-index='${attempts}${index}']`
    );
    console.log(thisBlock);
    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const keyButtons = document.querySelectorAll('.keybutton');
keyButtons.forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.key; 
    const thisBlock = document.querySelector(`.box[data-index='${attempts}${index}']`);
   
    if (thisBlock) {
      thisBlock.innerText = key;
      index += 1;
    }
  });
});

  document.addEventListener("keydown", handleKeydown);
}

appStart();

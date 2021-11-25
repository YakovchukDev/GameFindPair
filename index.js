let play = document.getElementById('play');
let Cards = document.getElementsByClassName('card');
let WinMessage = document.getElementById('WinMessage');
//дополнительная bool переменная нужна для разрешения переворота карты
for(let i = 0; i < Cards; i++){
    Cards[i][0] = false;
}

let isPlay = false;
let countguessed = 0;
let listCards = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5,];
// переменная, которая хранит две карты котрые сравниваются
let versus = [];
//счёт переменой versus
let count = 0;

//start
ShuffleCards();
OpenAllCard();

play.addEventListener('click', function(){
    //если игра еще не начата то ...
    if(!isPlay){
        isPlay = true;
        play.textContent = "FINISH";
        countguessed = 0;

        WinMessage.style.visibility = "hidden";

        HiddenAllCard();
    }
    //если игра уже начата
    else{
        isPlay = false;
        play.textContent = "START ";
        countguessed = 0;
        OpenAllCard();
    }
})
function OpenAllCard(){
    //показываем карты и разрешаем их переворачивать
    for(let i = 0; i < listCards.length; i++)
    {
        Cards[i].src = `Cards/${listCards[i]}.jpg`;
        Cards[i][0] = true;
    }
}
function HiddenAllCard(){
    //прячем карты и блокируем их переворот
    for(let i = 0; i < listCards.length; i++)
    {
        Cards[i].src = `Cards/Main.jpg`;
        Cards[i][0] = false;
    }
}
function ShuffleCards(){
    //пермешивание карт
    for(let i = 0; i < listCards.length * 3; i++){
        let point1 = Math.floor(Math.random()*listCards.length);
        let point2 = Math.floor(Math.random()*listCards.length);
        let buff = listCards[point1];
        listCards[point1] = listCards[point2];
        listCards[point2] = buff;
    }
}

for(let i = 0; i < listCards.length; i++){
    Cards[i].addEventListener('click', function(){
        if(isPlay && !Cards[i][0] && count < 2){
            //проверка какой стороной сейчас лежит карта и её переворот
            let url;
            if(Cards[i].src.endsWith(`Main.jpg`))
            {
                url = `Cards/${listCards[i]}.jpg`;
                versus[count] = i;
                count++;
            }
            else{
                url = `Cards/Main.jpg`;
                count--;
                versus[count] = '';
            }
            Cards[i].src = url;
        }
        //если нкопилось больше, чем две карты в сравнении(versus)
        if(count >= 2){
            if(listCards[versus[0]] == listCards[versus[1]]){
                //запрещаем переворот карт
                Cards[versus[0]][0] = true;
                Cards[versus[1]][0] = true;
                //очищаем список versus
                for(let j = 0; j < count; j++){
                    versus[j] = 0;
                }
                count = 0;
                countguessed += 2;
            }
            else{
                //если карты оказались разные то через пол секунды они переворачиваются
                setTimeout(function(){
                    Cards[versus[0]].src = `Cards/Main.jpg`;
                    Cards[versus[1]].src = `Cards/Main.jpg`;
                    for(let j = 0; j < count; j++){
                        versus[j] = 0;
                    }
                    count = 0;
                }, 500);
            }
        }
        //если все карты угаданы, игра заканчуется и выводится сообщение, что игрок победил
        if(countguessed == 10){
            isPlay = false;
            play.textContent = "START ";
            WinMessage.style.visibility = "visible";
        }

        //статичтика
        console.log(`isPley: ${isPlay}`);
        console.log(`countguessed: ${countguessed}`);
        console.log(`listCards: ${listCards}`);
        console.log(`versus: ${versus}`);
        console.log(`count: ${count}`);
    })
}
//команда спрятать сообщение
WinMessage.addEventListener('click', function(){
    this.style.visibility = "hidden";
})
const profileMessage = [
    `"나 좋아하지 마."
    "그게 뭔데."
    "나 좋아하지 말라고."
    "그거 어떻게 하는건데."`,

    `난... ㄱㅏ끔... 
    눈물을 흘린 ㄷㅏ ... 
    ㄱㅏ끔은 눈물을 참을 수 없는 내가 별루ㄷㅏ... 
    맘이 ㅇㅏ ㅍㅏ 서... 
    소ㄹ ㅣ치며... 울 수 있 ㄷㅏ는건... 
    좋은ㄱㅓ ㅇㅑ... 
    ㅁㅓ... 꼭 슬 ㅍㅓ ㅇㅑ만 우는 건 ㅇㅏ니잖 ㅇㅏ...^^ 
    난... 눈물ㅇㅣ ...좋다...
    ㅇㅏ니... 
    머 리가 ㅇㅏ닌... 
    맘으로...우는 ㄴㅐㄱㅏ 좋ㄷㅏ...`,

    `"왜 울었는데..."
    "양파 썰다가."
    "왜 울었냐고?"
    "양파 때문이라고 대답했어."
    "...내가 양파냐..."`,

    `"얼마동안이나 나 기다린거야?"
    "1분"
    "거짓말"
    "5분"
    "내가 바보냐? 얼마나 기다린거냐고!"
    "신호등이 182번 바뀔동안"`,

    `"또또, 내기할까?"
    "뭔 내기?"
    "김형광이 온새미로 잊는데 걸리는 시간"
    "좋아! 내가 내기라면 환장하는거 알지?
    난 깔끔하게 6개월 건다. 넌?"
    "난..."
    "넌 뭐 새꺄"
    "깔끔하게 백년 건다"`
];

const images = ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg", "image6.jpg", "image7.jpg", "image8.jpg", "image9.jpg", "image10.jpg"];

const messageArea = document.querySelector(".profile-message span");
const imageArea = document.querySelector(".profile-image");

const todayMessage = profileMessage[Math.floor(Math.random() * profileMessage.length)];
const todayImage = images[Math.floor(Math.random() * images.length)];

const img = document.createElement("img");
img.src = `../images/${todayImage}`;

messageArea.innerText = todayMessage;
imageArea.appendChild(img);

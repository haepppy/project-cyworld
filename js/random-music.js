const musics = [
    {
        song: '그리워하다',
        artist: '비투비(BTOB)'
    },
    {
        song: '12월 32일',
        artist: '별'
    },
    {
        song: 'Y (Plaese Tell Me Why)',
        artist: '프리스타일 (Free Style)'
    },
    {
        song: '애인 있어요',
        artist: '이은미'
    },
    {
        song: '기억을 걷는 시간',
        artist: '넬 (NELL)'
    },
    {
        song: '헤어지지 못하는 여자, 떠나가지 못하는 남자',
        artist: '리쌍 (Leessang)'
    },
    {
        song: '응급실',
        artist: 'izi'
    },
    {
        song: '...사랑했잖아...',
        artist: '린(LYn)'
    },
]

const musicTitleArea = document.querySelector("#musicTitle");
const musicTitle = document.querySelector("#musicTitle span");

let i = 0;

function changeMusic() {
    if (i <= musics.length -1) {
        const song = musics[i].song;
        const artist = musics[i].artist;
        musicTitle.innerText = `${song} - ${artist}`;
        i++;
    } else if (i > musics.length -1) {
        i = 0;
    }

    if(musicTitleArea.offsetWidth < musicTitle.offsetWidth) {
        musicTitle.classList.add("flow-animation");
    } else {
        musicTitle.classList.remove("flow-animation");
    }
};

changeMusic();

setInterval(changeMusic, 24000);



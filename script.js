document.addEventListener('DOMContentLoaded', () => {
    const legImage = document.getElementById('leg-image');
    let isShaking = false;

    legImage.addEventListener('mouseover', () => {
        if (!isShaking) {
            isShaking = true;
            legImage.classList.add('shake');
            // 무한히 텍스트가 떨어지도록
            startFallingText();
        }
    });

    legImage.addEventListener('mouseout', () => {
        if (isShaking) {
            isShaking = false;
            legImage.classList.remove('shake');
        }
    });

    function startFallingText() {
        if (isShaking) {
            createAndFallText();
            // 일정 시간마다 새로운 텍스트 생성
            setTimeout(startFallingText, 1000); // 1초마다 새로운 텍스트 생성
        }
    }

    function createAndFallText() {
        const fortune = document.createElement('div');
        fortune.className = 'fortune';
        fortune.textContent = '복';
        document.body.appendChild(fortune);

        // 랜덤 위치 설정
        const randomX = Math.random() * (window.innerWidth - 100); // 화면 가로 범위 내 랜덤 X 위치
        const randomY = Math.random() * -100; // 화면 위쪽에서 떨어지도록 -100px에서 시작

        // 텍스트의 위치를 랜덤하게 설정
        fortune.style.left = `${randomX}px`;
        fortune.style.top = `${randomY}px`;

        // 애니메이션 설정
        fortune.style.animation = 'fall 4s linear infinite'; // 4초 동안 애니메이션을 반복

        // 애니메이션이 끝난 후 텍스트를 제거
        setTimeout(() => {
            fortune.remove();
        }, 4000); // 애니메이션과 일치하도록 4000ms로 설정
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // 모든 이미지에 공통 클래스를 부여
    const images = document.querySelectorAll('.click-image');

    // 초기 수명 값 가져오기 (없으면 0으로 초기화)
    let lifespan = parseInt(localStorage.getItem('lifespan')) || 0;

    // 이미지 클릭 이벤트
    images.forEach(image => {
        image.addEventListener('click', () => {
            if (image.id === 'image-4') {
                // 4번 이미지를 클릭하면 수명 감소
                lifespan -= 1;
            } else {
                // 나머지 이미지를 클릭하면 수명 증가
                lifespan += 1;
            }

            // 수명 값을 localStorage에 저장
            localStorage.setItem('lifespan', lifespan);

            // 수명 텍스트 박스 생성 및 랜덤 위치 설정
            createLifespanText(`수명: ${lifespan}`);
        });
    });

    function createLifespanText(text) {
        const textBox = document.createElement('div');
        textBox.className = 'lifespan-text';
        textBox.textContent = text;

        // 화면의 크기를 기준으로 랜덤 위치 계산
        const maxX = window.innerWidth - 150; // 텍스트 박스 크기 고려
        const maxY = window.innerHeight - 50;  // 텍스트 박스 크기 고려
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        textBox.style.left = `${randomX}px`;
        textBox.style.top = `${randomY}px`;

        document.body.appendChild(textBox);

        // 텍스트 박스 서서히 나타나게 설정
        requestAnimationFrame(() => {
            textBox.style.opacity = 1;
        });

        // 텍스트 박스 서서히 사라지게 설정 후 제거
        setTimeout(() => {
            textBox.style.opacity = 0;
            setTimeout(() => textBox.remove(), 500);
        }, 1000);
    }
});



document.addEventListener("DOMContentLoaded", function() {
    const pigImage = document.getElementById("pig-image");
    const lotteryNumbersDiv = document.getElementById("lottery-numbers");

    pigImage.addEventListener("click", function() {
        const numbers = generateLotteryNumbers();
        lotteryNumbersDiv.textContent = "" + numbers.join(", ");
    });

    function generateLotteryNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNum = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNum);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }
});



document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('name-canvas');
    const ctx = canvas.getContext('2d');
    const saveButton = document.getElementById('save-button');
    
    // 캔버스에 그림 그리기 기능
    let drawing = false;
    
    canvas.addEventListener('mousedown', () => {
        drawing = true;
    });
    
    canvas.addEventListener('mouseup', () => {
        drawing = false;
        ctx.beginPath();
    });
    
    canvas.addEventListener('mousemove', (event) => {
        if (drawing) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.strokeStyle = 'red';
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
    });

});





document.addEventListener('DOMContentLoaded', () => {
    const spider = document.getElementById('spider');
    const container = document.getElementById('spider-container');

    const messages = [
        '당신은 조만간 중요한 약속을 잊어버릴지도 모릅니다.',
        '오늘 하루 중, 당신에게 불편한 상황이 생길 가능성이 높습니다.',
        '당신의 소중한 물건이 어딘가에서 사라질 수 있습니다.',
        '예상치 못한 불운이 당신을 찾아올지도 모릅니다.',
        '당신의 계획이 예상보다 더 자주 지연될 수 있습니다.',
        '곧 당신이 기다리던 소식이 연기될 가능성이 높습니다.',
        '당신이 중요한 순간에 실수할 가능성이 큽니다.',
        '당신의 하루가 예상보다 더 복잡해질 수 있습니다.',
        '당신의 일상에 작은 재난이 찾아올 수 있습니다.',
        '오늘 당신의 운이 좋지 않을 수도 있습니다.'
    ];

    function getRandomMessage() {
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    }

    function moveSpider() {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        const spiderWidth = spider.clientWidth;
        const spiderHeight = spider.clientHeight;

        const maxX = containerWidth - spiderWidth;
        const maxY = containerHeight - spiderHeight;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        spider.style.left = `${randomX}px`;
        spider.style.top = `${randomY}px`;
    }

    setInterval(moveSpider, 1000);

    spider.addEventListener('click', () => {
        alert(getRandomMessage());
    });

    moveSpider();
});

document.addEventListener('DOMContentLoaded', () => {
    const doorFrame = document.getElementById('door-frame');
    const foot = document.getElementById('foot');
    const body = document.body;

    function checkCollision() {
        const doorFrameRect = doorFrame.getBoundingClientRect();
        const footRect = foot.getBoundingClientRect();

        // 문지방과 발 이미지가 닿았는지 확인
        if (doorFrameRect.top < footRect.bottom && doorFrameRect.bottom > footRect.top) {
            body.classList.add('red-background');
        } else {
            body.classList.remove('red-background');
        }
    }

    // 스크롤 시마다 checkCollision 호출
    window.addEventListener('scroll', checkCollision);

    // 초기 상태에서 확인
    checkCollision();
});


document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('input-field');
    const cameraContainer = document.getElementById('camera-container');
    const camera = document.getElementById('camera');

    // 카메라 스트림을 시작하는 함수
    async function startCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            camera.srcObject = stream;
        } catch (error) {
            console.error('카메라 접근 오류:', error);
        }
    }

    // 입력 필드에서 입력될 때마다 checkInput 함수 호출
    function checkInput() {
        const text = inputField.value;
        const openCount = (text.match(/\(/g) || []).length;  // '('의 개수
        const closeCount = (text.match(/\)/g) || []).length; // ')'의 개수

        // 총 개수 계산
        const totalCount = openCount + closeCount;

        // 특정 문자 수 이상일 때 카메라 나타나게 설정
        if (totalCount >= 10) {
            cameraContainer.style.opacity = 1; // 카메라 서서히 나타남
        } else {
            cameraContainer.style.opacity = 0; // 카메라 서서히 사라짐
        }
    }

    inputField.addEventListener('input', checkInput);

    // 페이지가 로드될 때 카메라 스트림 시작
    startCamera();
});



// 신발을 드래그 가능하도록 설정
const allShoes = document.querySelectorAll('.shoe');
const giftBox = document.getElementById('gift-box');

// 각 신발 쌍을 그룹으로 정의
const shoePairs = [
    { left: document.getElementById('left-shoe'), right: document.getElementById('right-shoe') },
    { left: document.getElementById('man-shoe'), right: document.getElementById('maan-shoe') }
];

// 각 신발 쌍의 드랍 상태 추적
const droppedShoesCount = {};

// 각 신발 쌍별로 드랍 카운트 초기화
shoePairs.forEach((pair, index) => {
    droppedShoesCount[index] = 0;
    
    // 각각의 신발 쌍에 대해 드래그 이벤트 처리
    Object.values(pair).forEach(shoe => {
        shoe.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', shoe.id);
        });
    });
});

// 모든 신발이 드래그 앤 드롭될 수 있도록 드롭 이벤트 처리
giftBox.addEventListener('dragover', (e) => {
    e.preventDefault();
});

giftBox.addEventListener('drop', (e) => {
    e.preventDefault();

    // 드래그한 신발 id 가져오기
    const shoeId = e.dataTransfer.getData('text/plain');
    const shoe = document.getElementById(shoeId);

    // 어떤 신발 쌍에 속하는지 찾기
    let pairIndex = shoePairs.findIndex(pair => Object.values(pair).includes(shoe));

    // 해당 신발 쌍에 드롭 카운트 증가
    droppedShoesCount[pairIndex]++;

    // 신발을 박스 안에 위치시키기
    shoe.style.position = 'absolute';
    shoe.style.left = `${e.clientX - shoe.offsetWidth / 2}px`;
    shoe.style.top = `${e.clientY - shoe.offsetHeight / 2}px`;

    // 해당 신발 쌍의 두 신발이 모두 드롭되었을 때 화면 밖으로 나가는 애니메이션 실행
    if (droppedShoesCount[pairIndex] === 2) {
        moveShoesAlternately(pairIndex);
    }
});

function moveShoesAlternately(pairIndex) {
    let steps = 0;
    const maxSteps = 50; // 각 신발이 25번씩 움직임
    const stepDistance = 50; // 한 발짝의 거리
    const randomYOffset = Math.random() * 200 - 100; // Y축으로 랜덤 이동 (사라지는 위치)

    // 신발 쌍별로 랜덤 방향을 설정 (각 신발 쌍별 랜덤 방향 적용)
    const randomDirections = [
        Math.random() < 0.5 ? -1 : 1, // 왼쪽 또는 오른쪽
        Math.random() < 0.5 ? -1 : 1  // 왼쪽 또는 오른쪽
    ];

    function moveStep() {
        if (steps < maxSteps) {
            const shoeIndex = steps % 2; // 0은 첫 번째 신발, 1은 두 번째 신발
            const shoe = shoeIndex === 0 ? shoePairs[pairIndex].left : shoePairs[pairIndex].right;

            // 신발을 번갈아 한 발짝씩 이동
            const currentX = parseFloat(getComputedStyle(shoe).left) || 0;
            const newX = currentX + stepDistance;
            shoe.style.left = `${newX}px`;

            steps++;

            // 다음 스텝으로 넘어가기 전에 약간의 딜레이 추가
            setTimeout(moveStep, 500);
        } else {
            // 신발들이 화면 밖으로 나가는 애니메이션 (각 신발에 랜덤 방향 적용)
            Object.values(shoePairs[pairIndex]).forEach((shoe, index) => {
                const randomXOffset = Math.random() * 200 - 100; // X축으로 랜덤 이동
                const direction = randomDirections[index]; // 각 신발에 랜덤한 방향 적용

                setTimeout(() => {
                    shoe.style.transform = `translate(${direction * (window.innerWidth + randomXOffset)}px, ${randomYOffset}px)`;
                    shoe.style.transition = 'transform 2s ease-in-out';
                    
                    // 애니메이션이 끝난 후 신발을 화면에서 제거
                    shoe.addEventListener('transitionend', () => {
                        shoe.remove();
                    }, { once: true });
                }, index * 500); // 번갈아 나가도록 딜레이 추가
            });
        }
    }

    // 첫 발걸음 시작
    moveStep();
}

















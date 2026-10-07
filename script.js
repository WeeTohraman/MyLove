/* =================================================
   💖 BIRTHDAY SURPRISE
   ================================================= */


/* =================================================
   ✍️ ข้อความถึงแฟน
   =================================================

   ⭐ แก้ข้อความตรงนี้ได้เลย ⭐

   ไม่ต้องให้แฟนพิมพ์อะไร
   คุณเขียนข้อความไว้ตรงนี้ล่วงหน้า
*/

const birthdayMessage = `ถึงคนที่เค้ารัก ❤️

วันนี้เป็นวันพิเศษของเธอ
และเค้าอยากจะบอกเธอว่า...

เค้าอาจจะไม่ได้พูดเก่ง
หรือแสดงออกเก่งที่สุด

เเต่เค้ารู้สึกดีมาก ๆ เลยนะ
ที่ได้เห็นเธอมีความสุขในทุก ๆ วัน

วันเกิดปีนี้🎂✨
เค้าขอให้เธอมีความสุขมาก ๆ น๊าา❤️✨

✨🎂HBD นะค๊าบบ🎂❤️✨
"สุขสันต์วันเกิดนะค๊าบบ
ขอบคุณที่เข้ามามอบรอยยิ้ม
ความสุขและเรื่องราวดี ๆ ในทุก ๆ วันน๊าา
ขอให้มีรอยยิ้ม มีความสุขและสุขภาพแข็งแรง
เเละมีชิวิตชีวาที่ดี แบบนี้ไปนาน ๆ น๊าา
ขอให้เป็นเดือนเกิดที่ดีเเละปีเกิดที่ดีน๊าา"
🎂🥰❤️✨

ขอให้ทุกสิ่งที่เธอหวัง
ค่อย ๆ กลายเป็นจริง

ขอให้มีแต่เรื่องดี ๆ เข้ามาในชีวิตน๊า
และไม่ว่าจะผ่านไปอีกกี่เดือน กี่ปี

ขอให้เป็นคนที่ดีเเละมีความสุขเเบบที่เป็นอยู่นะ

สุขสันต์วันเกิดปีนี้นะค๊าบบ
วันที่ 08 ตุลาคม 2569🎂❤️✨

รักเธอมากนะ❤️✨
`;


/* =================================================
   ELEMENTS
================================================= */

const cover =
    document.getElementById("cover");

const birthday =
    document.getElementById("birthday");

const letter =
    document.getElementById("letter");

const openBtn =
    document.getElementById("openBtn");

const candles =
    document.querySelectorAll(".candle");

const candleCount =
    document.getElementById("candleCount");

const counterProgress =
    document.getElementById("counterProgress");

const instruction =
    document.getElementById("instruction");

const message =
    document.getElementById("message");

const typingCursor =
    document.getElementById("typingCursor");

const finishBtn =
    document.getElementById("finishBtn");


/* =================================================
   VARIABLES
================================================= */

let extinguishedCount = 0;

let typingIndex = 0;

let typingTimer = null;

let surpriseStarted = false;


/* =================================================
   SCENE SWITCH
================================================= */

function showScene(scene) {

    document
        .querySelectorAll(".scene")
        .forEach(item => {

            item.classList.remove("active");

        });

    scene.classList.add("active");

}


/* =================================================
   OPEN SURPRISE
================================================= */

openBtn.addEventListener("click", () => {

    showScene(birthday);

    createConfetti();

});


/* =================================================
   CANDLE INTERACTION
=================================================

   ผู้ใช้สามารถ:

   1. เอาเมาส์ไปถูไฟ
   2. ลากเมาส์ผ่านไฟ
   3. แตะไฟบนมือถือ

================================================= */


/* Mouse */

document.addEventListener(
    "mousemove",
    handlePointer
);


/* Touch */

document.addEventListener(
    "touchmove",
    event => {

        const touch =
            event.touches[0];

        if (!touch) return;

        handlePointer({
            clientX: touch.clientX,
            clientY: touch.clientY
        });

    },
    {
        passive: true
    }
);


/* Click / Touch */

candles.forEach(candle => {

    candle.addEventListener(
        "click",
        () => {

            extinguishCandle(candle);

        }
    );

});


/* =================================================
   DETECT MOUSE NEAR FLAME
================================================= */

function handlePointer(event) {

    if (!birthday.classList.contains("active")) {
        return;
    }

    candles.forEach(candle => {

        if (
            candle.classList.contains(
                "extinguished"
            )
        ) {
            return;
        }

        const flame =
            candle.querySelector(
                ".flame"
            );

        const rect =
            flame.getBoundingClientRect();

        const mouseX =
            event.clientX;

        const mouseY =
            event.clientY;

        const centerX =
            rect.left +
            rect.width / 2;

        const centerY =
            rect.top +
            rect.height / 2;

        const distance =
            Math.sqrt(
                Math.pow(
                    mouseX - centerX,
                    2
                ) +
                Math.pow(
                    mouseY - centerY,
                    2
                )
            );


        /*
           ระยะที่ถือว่า
           เอามือ/เมาส์ไปถูไฟ
        */

        if (distance < 55) {

            extinguishCandle(
                candle
            );

        }

    });

}


/* =================================================
   EXTINGUISH CANDLE
================================================= */

function extinguishCandle(candle) {

    if (
        candle.classList.contains(
            "extinguished"
        )
    ) {
        return;
    }


    candle.classList.add(
        "extinguished"
    );


    candle.classList.add(
        "smoke"
    );


    extinguishedCount++;


    candleCount.textContent =
        extinguishedCount;


    const progress =
        (extinguishedCount / 5) *
        100;


    counterProgress.style.width =
        progress + "%";


    createMiniSparkle(
        candle
    );


    /*
       ดับครบ 5 เล่ม
    */

    if (
        extinguishedCount >= 5
    ) {

        finishCandleScene();

    }

}


/* =================================================
   AFTER ALL CANDLES ARE OUT
================================================= */

function finishCandleScene() {

    if (surpriseStarted) {
        return;
    }

    surpriseStarted = true;


    instruction.innerHTML = `
        ✨
        <div>
            <strong>อธิษฐานเสร็จแล้วนะ ❤️</strong>
            <br>
            <span>มีอีกอย่างที่เค้าอยากให้เธอเห็น...</span>
        </div>
    `;


    createBigFireworks();


    setTimeout(() => {

        showScene(letter);

        startTyping();

    }, 3500);

}


/* =================================================
   MINI SPARKLE
================================================= */

function createMiniSparkle(
    candle
) {

    const rect =
        candle.getBoundingClientRect();


    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const sparkle =
            document.createElement(
                "div"
            );

        sparkle.textContent =
            "✦";

        sparkle.style.position =
            "fixed";

        sparkle.style.left =
            rect.left +
            rect.width / 2 +
            "px";

        sparkle.style.top =
            rect.top +
            "px";

        sparkle.style.color =
            "#ffd76a";

        sparkle.style.fontSize =
            "15px";

        sparkle.style.zIndex =
            "999";

        sparkle.style.pointerEvents =
            "none";

        document.body.appendChild(
            sparkle
        );


        const angle =
            Math.random() *
            Math.PI *
            2;

        const distance =
            30 +
            Math.random() *
            40;


        sparkle.animate(
            [
                {
                    transform:
                        "translate(0,0) scale(1)",

                    opacity: 1
                },

                {
                    transform:
                        `translate(
                            ${Math.cos(angle) * distance}px,
                            ${Math.sin(angle) * distance}px
                        )
                        scale(0)`,

                    opacity: 0
                }
            ],
            {
                duration: 700,

                easing:
                    "ease-out"
            }
        );


        setTimeout(() => {

            sparkle.remove();

        }, 800);

    }

}


/* =================================================
   CONFETTI
================================================= */

function createConfetti() {

    const container =
        document.getElementById(
            "confetti"
        );


    for (
        let i = 0;
        i < 80;
        i++
    ) {

        const piece =
            document.createElement(
                "div"
            );


        piece.className =
            "confetti";


        piece.style.left =
            Math.random() * 100 +
            "%";


        piece.style.background =
            [
                "#ff4f91",
                "#ffd76a",
                "#8d62ff",
                "#4de1ff",
                "#ffffff"
            ][
                Math.floor(
                    Math.random() * 5
                )
            ];


        piece.style.animationDuration =
            (
                3 +
                Math.random() * 4
            ) +
            "s";


        piece.style.animationDelay =
            Math.random() * 2 +
            "s";


        container.appendChild(
            piece
        );

    }

}


/* =================================================
   BIG FIREWORKS
================================================= */

function createBigFireworks() {

    const container =
        document.getElementById(
            "fireworks"
        );


    for (
        let i = 0;
        i < 18;
        i++
    ) {

        setTimeout(() => {

            const firework =
                document.createElement(
                    "div"
                );


            firework.className =
                "firework";


            firework.style.left =
                (
                    15 +
                    Math.random() * 70
                ) +
                "%";


            firework.style.top =
                (
                    10 +
                    Math.random() * 55
                ) +
                "%";


            container.appendChild(
                firework
            );


            setTimeout(() => {

                firework.remove();

            }, 1300);

        }, i * 180);

    }

}


/* =================================================
   TYPING EFFECT
================================================= */

function startTyping() {

    message.textContent =
        "";

    typingIndex = 0;


    typingCursor.style.display =
        "inline-block";


    /*
       หน่วงนิดหนึ่ง
       ให้กระดาษเปิดก่อน
    */

    setTimeout(() => {

        typeNextCharacter();

    }, 1700);

}


/* =================================================
   TYPE EACH CHARACTER
================================================= */

function typeNextCharacter() {

    if (
        typingIndex >=
        birthdayMessage.length
    ) {

        typingCursor.style.display =
            "none";


        /*
           พิมพ์ข้อความเสร็จแล้ว
           แสดงปุ่ม "อ่านจบแล้ว"
        */

        setTimeout(() => {

            finishBtn.classList.add(
                "show"
            );

        }, 700);


        return;

    }


    const character =
        birthdayMessage[
            typingIndex
        ];


    message.textContent +=
        character;


    typingIndex++;


    /*
       ความเร็วการพิมพ์

       ตัวปกติ = 35ms
       เว้นบรรทัด = ช้าลง
    */

    let speed = 35;


    if (
        character === "\n"
    ) {

        speed = 180;

    }


    typingTimer =
        setTimeout(
            typeNextCharacter,
            speed
        );

}


/* =================================================
   BACKGROUND SPARKLES
================================================= */

const sparkleContainer =
    document.getElementById(
        "sparkles"
    );


for (
    let i = 0;
    i < 40;
    i++
) {

    const sparkle =
        document.createElement(
            "div"
        );


    sparkle.textContent =
        "✦";


    sparkle.style.position =
        "fixed";


    sparkle.style.left =
        Math.random() * 100 +
        "%";


    sparkle.style.top =
        Math.random() * 100 +
        "%";


    sparkle.style.color =
        "rgba(255,215,106,.7)";


    sparkle.style.fontSize =
        (
            6 +
            Math.random() * 12
        ) +
        "px";


    sparkle.style.pointerEvents =
        "none";


    sparkle.style.animation =
        `
        sparkleAnimation
        ${
            2 +
            Math.random() * 4
        }s
        ease-in-out
        infinite
        alternate
        `;


    sparkleContainer.appendChild(
        sparkle
    );

}


/* =================================================
   HEARTS
================================================= */

const heartContainer =
    document.getElementById(
        "hearts"
    );


for (
    let i = 0;
    i < 25;
    i++
) {

    const heart =
        document.createElement(
            "div"
        );


    heart.textContent =
        Math.random() > .5
            ? "♥"
            : "♡";


    heart.style.position =
        "fixed";


    heart.style.left =
        Math.random() * 100 +
        "%";


    heart.style.top =
        Math.random() * 100 +
        "%";


    heart.style.color =
        "rgba(255,100,160,.5)";


    heart.style.fontSize =
        (
            10 +
            Math.random() * 15
        ) +
        "px";


    heart.style.pointerEvents =
        "none";


    heart.style.animation =
        `
        heartBackground
        ${
            3 +
            Math.random() * 5
        }s
        ease-in-out
        infinite
        alternate
        `;


    heartContainer.appendChild(
        heart
    );

}


/* =================================================
   ADD DYNAMIC ANIMATIONS
================================================= */

const dynamicStyle =
    document.createElement(
        "style"
    );


dynamicStyle.textContent = `

@keyframes sparkleAnimation {

    from {
        opacity: .2;
        transform: scale(.7) rotate(0deg);
    }

    to {
        opacity: 1;
        transform: scale(1.4) rotate(25deg);
    }

}


@keyframes heartBackground {

    from {
        transform:
            translateY(0)
            rotate(-5deg);

        opacity: .2;
    }

    to {
        transform:
            translateY(-25px)
            rotate(5deg);

        opacity: .7;
    }

}

`;


document.head.appendChild(
    dynamicStyle
);
/* =====================================
   FINISH BUTTON
   กลับไปหน้าแรก
===================================== */

finishBtn.addEventListener(
    "click",
    () => {

        /*
           ซ่อนปุ่มก่อน
        */

        finishBtn.classList.remove(
            "show"
        );


        /*
           กลับไปหน้าแรก
        */

        showScene(cover);


        /*
           เตรียมข้อความใหม่
           เผื่อเปิดเซอร์ไพรส์อีกครั้ง
        */

        message.textContent = "";

        typingIndex = 0;

        extinguishedCount = 0;

        surpriseStarted = false;


        /*
           รีเซ็ตตัวนับเทียน
        */

        candleCount.textContent = "0";

        counterProgress.style.width =
            "0%";


        /*
           ทำให้เทียนกลับมามีไฟ
        */

        candles.forEach(candle => {

            candle.classList.remove(
                "extinguished",
                "smoke"
            );

        });


        /*
           คืนข้อความคำแนะนำ
        */

        instruction.innerHTML = `
            <div class="hand">
                🖐️
            </div>

            <div>

                <strong>
                    ลากเมาส์ผ่านเปลวเทียน
                </strong>

                <br>

                <span>
                    ถูบริเวณไฟเพื่อดับเทียน
                </span>

            </div>
        `;

    }
);
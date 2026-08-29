/* =========================================
   LOVE CHECK — EASY CUSTOMIZATION
   Kamu cukup edit bagian ini setiap order.
========================================= */

const CONFIG = {
  senderName: "Asa",
  partnerName: "Mas",

  // Ganti dengan pesan customer.
  secretMessage:
    "Makasih ya udah selalu ada buat aku. Kadang kita ngeselin satu sama lain, kadang bikin ketawa sendiri, tapi dari sekian banyak orang, aku tetap seneng bisa ketemu kamu. 🤍",

  // Foto dan musik diletakkan di folder assets.
  photo: "assets/photo.jpg",
  music: "assets/music.mp3",

  // Kamu bisa mengganti kalimat opening.
  openingCopy:
    "15 questions. No cheating. Let's see seberapa kenal lo sama orang ini. 👀"
};


/* =========================================
   QUIZ KENAL ASA 💙
   Nilai 2 = sangat cocok / benar
   Nilai 1 = masih mungkin
   Nilai 0 = meleset
========================================= */

const QUESTIONS = [

  {
    q: "Cobaa tebak minuman favorit Asaa...",
    a: [
      ["Matcha 🍵", 2],
      ["Cokelat 🥤", 0],
      ["Kopi susu ☕", 0],
      ["Thai tea 🧋", 1]
    ]
  },

  {
    q: "Menurut Mas, Asaa lebih sukaa main ke mana??",
    a: [
      ["Pantai 🏖️", 2],
      ["Pegunungan ⛰️", 1],
      ["Mall 🛍️", 0],
      ["Cafe lucu ☕", 1]
    ]
  },

  {
    q: "Kataa pertamaa Asaa pas tiap kali Mas kirim pap ke Asaa biasanya...",
    a: [
      ["Gantengkuu duniakuuu cintaakuuu pujaan hatikuuu 🥹💙", 2],
      ["Hehe lucuu banget sih kamu 😭", 1],
      ["Ihh apaan sih Mas 😭", 1],
      ["Kok kirim foto terusss?", 0]
    ]
  },

  {
    q: "Kaloo Asaa lagi laper, menurut Mas Asaa bakal cari makanan apa??",
    a: [
      ["Ayam / bebek goreng 🍗", 2],
      ["Seblak pedes 🌶️", 1],
      ["Mie ayam 🍜", 1],
      ["Burger 🍔", 0]
    ]
  },

  {
    q: "Menurut Mas, hal kecil yang bisa bikin Asaa happy itu...",
    a: [
      ["Dikasih perhatian kecil-kecilan 🥹", 2],
      ["Dikasih hadiah mahal 🎁", 1],
      ["Diajak jalan-jalan terus 💕", 1],
      ["Ditinggal sendiri biar tenang 😭", 0]
    ]
  },

  {
    q: "Wishlist kitaa jalan-jalan bareng yaitu ke...",
    a: [
      ["Kintamani, Bali 🌄💙", 2],
      ["Jogja 🏞️", 1],
      ["Bandung 🌸", 1],
      ["Lombok 🏝️", 0]
    ]
  },

  {
    q: "Kalimat pertama kali Asaa kalo selesai kuliah yaitu...",
    a: [
      ["Mass asaa capee sekaliii harii iniii, asaa pgn call mau ceritaa 🥹💙", 2],
      ["Mas, asaa udah selesai kuliah nihh 😭", 1],
      ["Mas jemput asaa dongg", 1],
      ["Asaa mau langsung tidurrr 😴", 0]
    ]
  },

  {
    q: "Kata pertama tiap kali Asaa mau main bareng temen-temennya...",
    a: [
      ["Bolehkah Asaa bermain brg tmn' Asaa 🥹", 2],
      ["Mas, Asaa mau pergi dulu yaa", 1],
      ["Asaa pergi sama temen-temen dulu", 1],
      ["Mas, Asaa keluar ya. Udah gitu aja 😭", 0]
    ]
  }

];

let currentQuestion = 0;
let totalScore = 0;
let correctCount = 0;
let musicPlaying = false;

const $ = (id) => document.getElementById(id);

function showScreen(id){
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  $(id).classList.add("active");
  window.scrollTo({top:0, behavior:"instant"});
}

function renderQuestion(){
  const item = QUESTIONS[currentQuestion];

  $("questionTag").textContent =
    `QUESTION ${String(currentQuestion + 1).padStart(2,"0")}`;

  $("questionCounter").textContent =
    `${String(currentQuestion + 1).padStart(2,"0")} / ${QUESTIONS.length}`;

  $("progressFill").style.width =
    `${(currentQuestion / QUESTIONS.length) * 100}%`;

  $("questionText").textContent = item.q;

  const answers = $("answers");
  answers.innerHTML = "";

  item.a.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "answer";

    button.innerHTML = `
      <span class="answer-letter">${String.fromCharCode(65 + index)}</span>
      <span class="answer-text">${choice[0]}</span>
    `;

    button.addEventListener("click", () => chooseAnswer(choice[1]));
    answers.appendChild(button);
  });
}

function chooseAnswer(score){
  totalScore += score;

  if(score === 2){
    correctCount++;
  }

  currentQuestion++;

  if(currentQuestion < QUESTIONS.length){
    renderQuestion();
  }else{
    $("progressFill").style.width = "100%";
    showCalculating();
  }
}

function showCalculating(){
  showScreen("calculating");

  const texts = [
    "Ngitung seberapa kenal mas sama asa...",
    "Mengingat kembali semua cerita random...",
    "Checking your relationship memory...",
    "Okay... we got the result. 👀"
  ];

  let i = 0;
  $("loadingText").textContent = texts[0];

  const interval = setInterval(() => {
    i++;
    if(i < texts.length){
      $("loadingText").textContent = texts[i];
    }
  }, 650);

  setTimeout(() => {
    clearInterval(interval);
    showResult();
  }, 2750);
}

function showResult(){
  const maxScore = QUESTIONS.length * 2;
  const percent = Math.round((totalScore / maxScore) * 100);

  let title, copy, color;

  if(percent >= 85){
    title = "The “I Actually Listen” Partner 💚";
    copy = `Okay ${CONFIG.partnerName}... mas ternyata merhatiin juga. 😭💗 Banyak jawaban mas nunjukin kalau mas cukup paham kebiasaan, mood, dan cara asa pengen diperlakukan.`;
    color = "var(--green)";
  }else if(percent >= 65){
    title = "Pretty Good, But... 👀";
    copy = `Not bad, ${CONFIG.partnerName}. mas cukup kenal, tapi ada beberapa jawaban yang bikin asa mungkin bilang, “HAH? KOK SALAH?” 😭`;
    color = "var(--yellow)";
  }else{
    title = "How Are You Dating Me? 😭";
    copy = `${CONFIG.partnerName}... kita perlu ngobrol. 💀 mas mungkin perlu lebih banyak dengerin cerita random, nginget detail kecil, dan berhenti jawab “terserah” juga.`;
    color = "var(--red)";
  }

  $("resultGreeting").textContent =
    `Okay ${CONFIG.partnerName}, let's see seberapa kenal mas... 👀`;

  $("score").textContent = `${percent}%`;
  $("resultFraction").textContent =
    `${correctCount} / ${QUESTIONS.length} answers matched`;

  $("resultTitle").textContent = title;
  $("resultCopy").textContent = copy;

  $("scoreCircle").style.background =
    `conic-gradient(${color} 0 ${percent}%, rgba(255,255,255,.08) ${percent}% 100%)`;

  const memory = Math.min(99, Math.max(35, percent + 3));
  const understanding = Math.min(99, Math.max(35, percent - 2));
  const attention = Math.min(99, Math.max(35, percent + 5));

  $("memoryStat").textContent = `${memory}%`;
  $("understandingStat").textContent = `${understanding}%`;
  $("attentionStat").textContent = `${attention}%`;

  showScreen("result");

  if(percent >= 85){
    confetti();
  }
}

function openMessage(){
  $("senderLabel").textContent = CONFIG.senderName.toUpperCase();
  $("senderSignature").textContent = CONFIG.senderName;
  $("partnerMessageName").textContent = CONFIG.partnerName;
  $("secretMessage").textContent = CONFIG.secretMessage;

  const img = $("couplePhoto");
  img.src = CONFIG.photo;
  img.onerror = () => {
    img.src = "assets/photo-placeholder.svg";
  };

  showScreen("message");
}

function startMusic() {
  const audio = document.getElementById("bgMusic");

  if (!audio) {
    console.error("Audio bgMusic tidak ditemukan!");
    return;
  }

  audio.volume = 0.45;
  audio.muted = false;

  audio.play()
    .then(() => {
      musicPlaying = true;

      const musicBtn = document.getElementById("musicBtn");
      const musicStatus = document.getElementById("musicStatus");

      if (musicBtn) musicBtn.textContent = "🔊";
      if (musicStatus) musicStatus.textContent = "Music on";

      console.log("MUSIK BERHASIL DIPUTAR");
    })
    .catch((error) => {
      musicPlaying = false;

      console.error("MUSIK GAGAL DIPUTAR:", error);

      const musicStatus = document.getElementById("musicStatus");
      if (musicStatus) {
        musicStatus.textContent = "Tap 🎵";
      }
    });
}


function toggleMusic() {
  const audio = document.getElementById("bgMusic");

  if (!audio) return;

  if (musicPlaying) {
    audio.pause();
    musicPlaying = false;

    $("musicBtn").textContent = "🎵";
    $("musicStatus").textContent = "Music off";

  } else {
    audio.play()
      .then(() => {
        musicPlaying = true;

        $("musicBtn").textContent = "🔊";
        $("musicStatus").textContent = "Music on";
      })
      .catch((error) => {
        console.error("Gagal play musik:", error);
        toast("Tap tombol musik sekali lagi 🎵");
      });
  }
}

async function shareResult(){
  const score = $("score").textContent;
  const title = $("resultTitle").textContent;

  const text =
`🚦 LOVE CHECK RESULT 💗

${CONFIG.partnerName} baru aja selesai Love Check!

💗 Score: ${score}
🏆 ${title}

Berani cek kamu juga? 👀`;

  const url = window.location.href;
  const whatsapp =
    "https://wa.me/?text=" +
    encodeURIComponent(text + "\n" + url);

  if(navigator.share){
    try{
      await navigator.share({
        title:"LOVE CHECK 💗",
        text,
        url
      });
      return;
    }catch(e){}
  }

  window.open(whatsapp, "_blank", "noopener");
}

function resetQuiz(){
  currentQuestion = 0;
  totalScore = 0;
  correctCount = 0;
  renderQuestion();
  showScreen("quiz");
}

function toast(message){
  const t = $("toast");
  t.textContent = message;
  t.classList.add("show");

  setTimeout(() => {
    t.classList.remove("show");
  }, 2400);
}

function confetti(){
  const pieces = ["#ff7eaa","#65e7a6","#ffd76b","#ffffff"];

  for(let i = 0; i < 65; i++){
    const c = document.createElement("i");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = pieces[Math.floor(Math.random() * pieces.length)];
    c.style.animationDelay = Math.random() * .7 + "s";
    document.body.appendChild(c);

    setTimeout(() => c.remove(), 3200);
  }
}

/* Setup */
$("senderOpening").textContent = CONFIG.senderName;
$("opening-copy") && ($("opening-copy").textContent = CONFIG.openingCopy);
$("couplePhoto").src = CONFIG.photo;

$("openBtn").addEventListener("click", () => {
  startMusic();
  renderQuestion();
  showScreen("quiz");
});

$("musicBtn").addEventListener("click", toggleMusic);
$("messageBtn").addEventListener("click", openMessage);
$("shareBtn").addEventListener("click", shareResult);
$("restartBtn").addEventListener("click", resetQuiz);

/* Prevent accidental form-like zooming / selection on answer buttons */
document.addEventListener("gesturestart", e => e.preventDefault());

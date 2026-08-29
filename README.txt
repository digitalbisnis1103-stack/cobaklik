# LOVE CHECK — Couple Digital Gift 💗

Template static website untuk dijual sebagai digital couple gift.

## Cara custom setiap order

Buka `script.js`, lalu cari:

```js
const CONFIG = {
  senderName: "Alya",
  partnerName: "Raka",
  secretMessage: "...",
  photo: "assets/photo.jpg",
  music: "assets/music.mp3"
};
```

Ganti:
- `senderName` = nama pembeli/pengirim
- `partnerName` = nama pasangan yang menerima
- `secretMessage` = pesan rahasia
- `photo` = nama file foto di folder `assets`
- `music` = nama file musik di folder `assets`

## Ganti pertanyaan

Semua pertanyaan ada di array `QUESTIONS` di `script.js`.

Setiap pertanyaan punya 4 jawaban:

```js
a: [
  ["Jawaban pertama", 2],
  ["Jawaban kedua", 1],
  ["Jawaban ketiga", 1],
  ["Jawaban keempat", 0]
]
```

Nilai:
- `2` = cocok/benar
- `1` = sebagian
- `0` = meleset

## File media

Masukkan:
- `assets/music.mp3`
- `assets/photo.jpg`

Untuk musik, gunakan audio yang kamu punya hak untuk digunakan/didistribusikan.

## Publish Netlify

1. Buka folder ini di VS Code.
2. Pastikan `index.html`, `style.css`, `script.js`, dan folder `assets` ada dalam satu project.
3. Test dengan Live Server.
4. Upload/deploy folder project ke Netlify.
5. Setelah deploy, kirim link hasilnya ke customer.

## Flow jualan

Customer bayar → kamu copy template → custom data → masukkan foto + musik → deploy ke Netlify → kirim link → customer mengirim link ke pasangan.

Tidak memakai database/backend.

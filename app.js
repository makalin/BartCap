const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');
const input = document.getElementById('memeText');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const background = new Image();
background.src = 'background1.jpg';

background.onload = () => {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
};

generateBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  const text = input.value || "Excel is not a database";
  const fontSize = 22;
  const lineHeight = 32;
  ctx.font = `${fontSize}px "Comic Sans MS", sans-serif`;
  ctx.fillStyle = 'white';
  ctx.textAlign = 'top';

  const boardX = 20;
  const boardY = 30;
  const boardHeight = 520;
  const maxTextWidth = 380; // Prevent overlap with Bart
  const rows = Math.floor(boardHeight / lineHeight);

for (let i = 0; i < rows; i++) {
  const x = boardX;
  const y = boardY + i * lineHeight;

  // Perspective curve: top ~ -0.5°, bottom ~ -6.5°
  const angleDeg = 2 - Math.pow(i / rows, 1.5) * 6;
  const angleRad = angleDeg * Math.PI / 180;

  let lineText = text;
    while (ctx.measureText(lineText).width > maxTextWidth && lineText.length > 0) {
      lineText = lineText.slice(0, -1);
    }

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angleRad);
  ctx.fillText(lineText, 0, 0);
  ctx.restore();
}
});

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'bartcap_meme.png';
  link.href = canvas.toDataURL();
  link.click();
});

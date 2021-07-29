function throwError(ctx, x, y, options) {
  let { title, width, height, message, buttons } = options;
  let grad = ctx.createLinearGradient(x, y, x, y + 40);
  grad.addColorStop(0, "#2481f8");
  grad.addColorStop("0.3", "#055bec");
  ctx.fillStyle = grad;
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = "#ece9d8";
  ctx.fillRect(x + 5, y + 30, width - 10, height - 35);
  ctx.font = "13px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "left";
  ctx.fillText(message, x + 60, y + 57)
  ctx.font = "12px Arial";
  ctx.fillStyle = "#173d71";
  ctx.fillText(title, x + 9, y + 22);
  ctx.fillStyle = "#eff2f4";
  ctx.fillText(title, x + 7, y + 20);
  ctx.font = "11px Arial";
  let grd = ctx.createLinearGradient(x + width - 25, y + 4.5, 21 + x + width - 25, 21 + y + 4.5);
  grd.addColorStop(0, "white");
  grd.addColorStop("0.4", "red");
  grd.addColorStop("0.6", "red");
  grd.addColorStop(1, "black");
  ctx.fillStyle = grd;
  ctx.fillRect(x + width - 25, y + 4.5, 20, 20);
  ctx.strokeStyle = "black";
  ctx.strokeRect(x + width - 25, y + 4.5, 20, 20);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 0.5
  ctx.strokeRect(x + width - 26, y + 3.5, 22, 22);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + width - 22, y + 7.5);
  ctx.lineTo(x + width - 8, y + 21.5);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x + width - 8, y + 7.5);
  ctx.lineTo(x + width - 22, y + 21.5);
  ctx.stroke();
  let grd2 = ctx.createLinearGradient(x + 23, y + 37, x + 48, y + 66);
  grd2.addColorStop(0, "white");
  grd2.addColorStop("0.3", "red");
  grd2.addColorStop(1, "red");
  ctx.fillStyle = grd2;
  ctx.beginPath();
  ctx.arc(x + 33.5, y + 51.5, 15, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "red";
  ctx.lineWidth = 1
  ctx.beginPath();
  ctx.arc(x + 33.5, y + 51.5, 15, 0, Math.PI * 2);
  ctx.stroke();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.moveTo(x + 26, y + 44);
  ctx.lineTo(x + 41, y + 59);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x + 26, y + 59);
  ctx.lineTo(x + 41, y + 44);
  ctx.stroke();
  ctx.strokeStyle = "#788da1";
  ctx.textAlign = "center";
  ctx.lineWidth = 1;
  if (!buttons) return;
  let max = buttons.reduce((a, b) => a.length > b.length ? a : b).length;
  for (let i = 0; i < buttons.length; i++) {
    ctx.fillStyle = "#f4f5f0";
    ctx.fillRect(x + width / (buttons.length + 1) * (i + 1) - max * 4, y + height - 40, max * 8, 20);
    ctx.strokeRect(x + width / (buttons.length + 1) * (i + 1) - max * 4, y + height - 40, max * 8, 20);
    ctx.fillStyle = "#323232";
    ctx.fillText(buttons[i], x + width / (buttons.length + 1) * (i + 1), y + height - 27);
  }
}
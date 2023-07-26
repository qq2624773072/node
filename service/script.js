const temp = Math.round(Math.random() * 30) + 0; //生成0-30度之间的随机数
function updateTime() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let ampm = hours < 12 ? "上午" : "下午";
  hours = hours % 12;
  hours = hours ? hours : 12; // 如果小时数为0，则设置为12
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  let time = hours + ":" + minutes + ":" + seconds + " " + ampm;
  document.getElementById("time").innerText = time;
}
setInterval(updateTime, 1000); // 每秒更新一次时间
document.getElementById('temp').innerHTML = temp + '°C';
// 获取当前日期
var date = new Date();

// 格式化日期为 yyyy-mm-dd
var formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, "0") + "-" + date.getDate().toString().padStart(2, "0");

// 将格式化后的日期显示在页面上
document.getElementById("date").innerText = formattedDate;
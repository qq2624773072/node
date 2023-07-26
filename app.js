const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mqtt=require('./service/mqtt');

// 设置静态文件路径
//app.use(express.static(['html','css','service']));
app.use(express.static('html'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/service', express.static(__dirname + '/service'));

app.post('/click1', (req, res) => {
  // 处理点击事件的逻辑
  console.log('点击事件已触发');
  mqtt.data_out(1);
  console.log("这是1");
  // 发送响应给客户端
  res.sendStatus(200);
});

app.post('/click2', (req, res) => {
  // 处理点击事件的逻辑
  console.log('点击事件已触发');
  mqtt.data_out(2);
  console.log("这是2");
  // 发送响应给客户端
  res.sendStatus(200);
});

app.post('/click3', (req, res) => {
  // 处理点击事件的逻辑
  console.log('点击事件已触发');
  mqtt.data_out(3);
  console.log("这是3");
  // 发送响应给客户端
  res.sendStatus(200);
});

app.post('/click4', (req, res) => {
  // 处理点击事件的逻辑
  console.log('点击事件已触发');
  mqtt.data_out(4);
  console.log("这是4");
  // 发送响应给客户端
  res.sendStatus(200);
});

// 当客户端连接时
io.on('connection', (socket) => {
  console.log('有新的客户端连接');
  // 模拟数据更新，每隔1秒钟向客户端发送随机数
  setInterval(() => {
    socket.emit('updateData', mqtt);
    console.log("id:" + mqtt.josn_in.id + "\n温度:" + mqtt.josn_in.temperature + "\n湿度:" + mqtt.josn_in.humidity + "\n亮度:" + mqtt.josn_in.brightness
             + "\n超声波:" + mqtt.josn_in.ultrasonic + "\n压力:" + mqtt.josn_in.pressure + "\n服务:" + mqtt.josn_in.xhh);
  }, 2500);
});

// 启动服务器
const PORT = 3000;
http.listen(PORT, () => {
  console.log(`服务器已启动，请访问 http://localhost:${PORT}`);
});

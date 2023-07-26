const socket = io();
// 当接收到数据更新事件时，更新页面中的数字
socket.on('updateData', (mqtt) => {
    document.getElementById('id').innerHTML = mqtt.josn_in.id;
    document.getElementById('temperature').innerHTML = mqtt.josn_in.temperature;
    document.getElementById('humidity').innerHTML = mqtt.josn_in.humidity;
    document.getElementById('ultrasonic').innerHTML = mqtt.josn_in.ultrasonic;
    document.getElementById('xhh').innerHTML = mqtt.josn_in.xhh;
});

document.getElementById('button1').addEventListener('click', function () {
    // 发送 POST 请求到服务器的 /click1 路由
    fetch('/click1', { method: 'POST' })
        .then(response => {
            if (response.ok) {
                console.log('点击事件已处理');
            } else {
                console.error('请求发生错误');
            }
        })
        .catch(error => {
            console.error('请求发生错误', error);
        });
});

document.getElementById('button2').addEventListener('click', function () {
    // 发送 POST 请求到服务器的 /click2 路由
    fetch('/click2', { method: 'POST' })
        .then(response => {
            if (response.ok) {
                console.log('点击事件已处理');
            } else {
                console.error('请求发生错误');
            }
        })
        .catch(error => {
            console.error('请求发生错误', error);
        });
});

document.getElementById('button3').addEventListener('click', function () {
    // 发送 POST 请求到服务器的 /click3 路由
    fetch('/click3', { method: 'POST' })
        .then(response => {
            if (response.ok) {
                console.log('点击事件已处理');
            } else {
                console.error('请求发生错误');
            }
        })
        .catch(error => {
            console.error('请求发生错误', error);
        });
});

document.getElementById('button4').addEventListener('click', function () {
    // 发送 POST 请求到服务器的 /click4 路由
    fetch('/click4', { method: 'POST' })
        .then(response => {
            if (response.ok) {
                console.log('点击事件已处理');
            } else {
                console.error('请求发生错误');
            }
        })
        .catch(error => {
            console.error('请求发生错误', error);
        });
});

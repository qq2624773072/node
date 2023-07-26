const mqtt = require('mqtt');
const url = 'mqtt://xhh.msns.cn:1883'
const options = {
    username: "xhh",
    password: "xhh262477"
}
 // JSON的数据结构
 const josn_out = {
    control: {
        id: 1,
        button1: 0,
        button2: 0,
        button3: 0,
        button4: 0
    },
    xhh: "小灰灰服务1.0"
};

const josn_in = {
    id: 0,
    temperature: 0,
    humidity: 0,
    brightness: 0,
    ultrasonic: 0,
    pressure: 0,
    xhh: ""
};

// 連接 MQTT server
const client = mqtt.connect(url, options)

client.on('connect', () => {
    console.log('已连接到 MQTT 代理服务器');
});

client.on("error", function (error) {
    console.log("Can't connect" + error);
    process.exit(1)
})
// 訂閱訊息
const topic_list = ["/topic/qos1"]
client.subscribe(topic_list, { qos: 0 })
client.on('message', function (topic, message) {
    const josn_date = JSON.parse(message.toString());
    if (josn_date) {
        josn_in.id = josn_date.touch_reception.id;
        josn_in.temperature = josn_date.touch_reception.temperature;
        josn_in.humidity = josn_date.touch_reception.humidity;
        josn_in.brightness = josn_date.touch_reception.brightness;
        josn_in.ultrasonic = josn_date.touch_reception.ultrasonic;
        josn_in.pressure = josn_date.touch_reception.pressure;
        josn_in.xhh = josn_date.xhh;
        // console.log("id:" + josn_in.id + "\n温度:" + josn_in.temperature + "\n湿度:" + josn_in.humidity + "\n亮度:" + josn_in.brightness
        //      + "\n超声波:" + josn_in.ultrasonic + "\n压力:" + josn_in.pressure + "\n服务:" + josn_in.xhh);
    } else {
        console.log("数据接收失败！\n");
    }
})

// 發佈訊息
const publish_topic = "/topic/qos0"
function data_out(x) {
    josn_out.control.id++;
    switch (x) {
        case 1:
            if(josn_out.control.button1){
                josn_out.control.button1=0;
            }else{
                josn_out.control.button1=1;
            }
            break;
        case 2:
            if(josn_out.control.button2){
                josn_out.control.button2=0;
            }else{
                josn_out.control.button2=1;
            }
            break;
        case 3:
            if(josn_out.control.button3){
                josn_out.control.button3=0;
            }else{
                josn_out.control.button3=1;
            }
            break;
        case 4:
            if(josn_out.control.button4){
                josn_out.control.button4=0;
            }else{
                josn_out.control.button4=1;
            }
            break;
    }
    const json_String = JSON.stringify(josn_out);
    client.publish(publish_topic, json_String);
    console.log("发送");
}

data_out();
//返回接收到的数据
module.exports = { josn_in, data_out };

console.log('waiting message from my ThingSpeak channel...')
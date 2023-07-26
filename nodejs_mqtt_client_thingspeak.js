const mqtt = require('mqtt');
let url = 'mqtt://xhh.msns.cn'
let options = {
    clientId: "xhh",
    username: "xhh",
    password: "xhh262477",
    clean: true
}


// 連接 MQTT server
let client = mqtt.connect(url, options)
client.on("error", function (error) {
    console.log("Can't connect" + error);
    process.exit(1)
})
// 訂閱訊息
let topic_list = ["/topic/qos1"]
client.subscribe(topic_list, { qos: 0 })
client.on('message', function (topic, message) {
    //console.log(topic, ": "+ message.toString()); 
    const josn_date = JSON.parse(message.toString());
    if (josn_date) {
        const id = josn_date.touch_reception.id;
        const temperature = josn_date.touch_reception.temperature;
        const humidity = josn_date.touch_reception.humidity;
        const brightness = josn_date.touch_reception.brightness;
        const ultrasonic = josn_date.touch_reception.ultrasonic;
        const pressure = josn_date.touch_reception.pressure;
        const xhh = josn_date.xhh;
        console.log("id:" + id + "\n温度:" + temperature + "\n湿度:" + humidity + "\n亮度:" + brightness
             + "\n超声波:" + ultrasonic + "\n压力:" + pressure + "\n服务:" + xhh);
    } else {
        console.log("数据接收失败！\n");
    }

})
// 發佈訊息
let publish_topic = "/topic/qos0"
let i = 0
setInterval(function () {
    if (i == 0) i = 1
    else i = 0
    //client.publish(publish_topic, i.toString())
    //console.log("Published Topic: " + publish_topic + ", message: " + i.toString())
    // JSON数据
    const josn_date = {
        control: {
            id:1,
            button1: 0,
            button2: 1,
            button3: 0,
            button4: 1
        },
        xhh: "小灰灰服务1.0"
    };
    const json_String = JSON.stringify(josn_date);
    client.publish(publish_topic,json_String);
}, 3000)
console.log('waiting message from my ThingSpeak channel...')
const WebSocket = require("ws");
// const MongoClient = require("mongodb").MongoClient;
let active_db = false;
// let list = 0.1;
// for(i=0;i<121;i++){
//     list *= 2;
// }
//
// list/=9460800000000000000;
// console.log(list);

// dropAll();
function dropAll() {
    const mongoClient = new MongoClient("mongodb://rs01/rc1b-5xqb6qd8tfctnsi3.mdb.yandexcloud.net:27018/", { useNewUrlParser: true, useUnifiedTopology: true });
    mongoClient.connect(function (err, client) {
        const db = client.db("chatdb");
        db.dropDatabase();
    });
}
// beginEngine();
// const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology:true });
// mongoClient.connect(function(err, client){
//     const db = client.db("chatdb");
//     const users = db.collection("clients");
//     let cli_ents={};//==testing===
//     cli_ents["login"]={id:"I", password:"paroli", isAdmin:true, clients:["il","ar","ri"], rooms:[0,1]};//Разрешена реализация с 27.12.2019
//     cli_ents["fil"]={login:"fil", password:"1", isAdmin:true, users:["ili","art","rin"], rooms:[2]};
//     cli_ents["ili"]={login:"ili", password:"11", isAdmin:false, rooms:[2]};
//     cli_ents["art"]={login:"art", password:"111", isAdmin:false, rooms:[2]};
//     cli_ents["rin"]={login:"rin", password:"4", isAdmin:false, rooms:[2]};
//     users.insertOne(cli_ents, function(err, result){        
//         if(err){ 
//             return console.log(err);
//         }
//         console.log(result.ops);
//         client.close();
//         Start();
//     });
// });
function beginEngine() {
    const mongoClient = new MongoClient("mongodb://rs01/rc1b-5xqb6qd8tfctnsi3.mdb.yandexcloud.net:27018/", { useNewUrlParser: true, useUnifiedTopology: true });
    mongoClient.connect(function (err, client) {
        const db = client.db("chatdb");
        const users = db.collection("count");
        let id = 0;
        users.insertOne({ count: id }, function (err, result) {
            if (err) {
                return console.log(err);
            }
            ch_1 = true;
            console.log("1");
            if (ch_1 && ch_2 && ch_3) {
                client.close();
                Start();
            }
        });
        const rooms = db.collection("rooms");
        let room = {};
        rooms.insertOne(room, function (err, result) {
            if (err) {
                return console.log(err);
            }
            ch_2 = true;
            console.log("2");
            if (ch_1 && ch_2 && ch_3) {
                client.close();
                Start();
            }
        });
        const mes = db.collection("message");
        let message = {};
        mes.insertOne(message, function (err, result) {
            if (err) {
                return console.log(err);
            }
            console.log("3");
            ch_3 = true;
            if (ch_1 && ch_2 && ch_3) {
                client.close();
                Start();
            }
        });
    });
}
// Start();//Вот тут заходим)))<<<<<<<<<<<<<--------------------------------------------------------------
function Start() {
    const mongoClient = new MongoClient("mongodb://rs01/rc1b-5xqb6qd8tfctnsi3.mdb.yandexcloud.net:27018/", { useNewUrlParser: true, useUnifiedTopology: true });
    mongoClient.connect(function (err, client) {
        const db = client.db("chatdb");
        const users = db.collection("clients");
        users.findOne(function (err, result) {
            // console.log(result);
            if (result != null) {
                clients = result;
            }
            console.log(clients);
            client.close();
            // Start_1();
        });
        // db.dropDatabase();
    });
}
function Start_1() {
    const mongoClient = new MongoClient("mongodb://rs01/rc1b-5xqb6qd8tfctnsi3.mdb.yandexcloud.net:27018/", { useNewUrlParser: true, useUnifiedTopology: true });
    mongoClient.connect(function (err, client) {
        const db = client.db("chatdb");
        const users = db.collection("rooms");
        users.findOne(function (err, result) {
            if (result != null) {
                rooms = result.rooms;
            }
            console.log(rooms);
            client.close();
            Start_2();
        });
    });
}
function Start_2() {
    const mongoClient = new MongoClient("mongodb://rs01/rc1b-5xqb6qd8tfctnsi3.mdb.yandexcloud.net:27018/", { useNewUrlParser: true, useUnifiedTopology: true });
    mongoClient.connect(function (err, client) {
        const db = client.db("chatdb");
        const users = db.collection("message");
        users.findOne(function (err, result) {
            if (result != null) {
                missedMessage = result;
            }
            console.log(missedMessage);
            client.close();
            Start_3();
        });
    });
}
function Start_3() {
    const mongoClient = new MongoClient("mongodb://rs01/rc1b-5xqb6qd8tfctnsi3.mdb.yandexcloud.net:27018/", { useNewUrlParser: true, useUnifiedTopology: true });
    mongoClient.connect(function (err, client) {
        const db = client.db("chatdb");
        const users = db.collection("count");
        users.findOne(function (err, result) {
            if (result == null) {
                id = 0;
            } else {
                id = result.count;
            }
            console.log(id);
            client.close();
            engineStart();
        });
    });
}


// // let clients={};//==testing===
// clients["fil"]={login:"fil", password:"1", isAdmin:true, users:["alina","sebastian","valera","milena"], rooms:[2]};
// clients["alina"]={login:"alina", password:"11", isAdmin:false, rooms:[2]};
// clients["sebastian"]={login:"sebastian", password:"111", isAdmin:false, rooms:[2]};
// clients["milena"]={login:"milena", password:"123", isAdmin:false, rooms:[2]};
// clients["valera"]={login:"valera", password:"4", isAdmin:false, rooms:[2]};
// // let rooms={};
// rooms[0]={room_name:"Room1", room_admin:"I", room_clients:["il","ar","ri","I"]/*, room_messages:"Здесь должны быть сообщения комнаты Ir1"*/};
// rooms[1]={room_name:"Room2", room_admin:"I", room_clients:["il","ar","ri","I"]/*, room_messages:"Здесь должны быть сообщения комнаты Ir2"*/};
// rooms[2]={room_name:"TestRoom", room_admin:"fil", room_clients:["fil","ili","art","rin"]};
// id=3;



// let clients={};//==testing===
// clients["login"]={id:"I", password:"paroli", isAdmin:true, clients:["il","ar","ri"], models:[0,1]};//Разрешена реализация с 27.12.2019
// clients["fil"]={login:"fil", password:"1", isAdmin:true, users:["ili","art","rin"], rooms:[2]};
// clients["ili"]={login:"ili", password:"11", isAdmin:false, rooms:[2]};
// clients["art"]={login:"art", password:"111", isAdmin:false, rooms:[2]};
// clients["rin"]={login:"rin", password:"4", isAdmin:false, rooms:[2]};
// clients["login"]={login:"ar", password:"paroli", isAdmin:false, clients:[], rooms:{rooms_count:0,rooms_name:[0, 1]}};
// clients["login"]={login:"ri", password:"paroli", isAdmin:false, clients:[], rooms:{rooms_count:0,rooms_name:[0, 1]}};



let clients = {};
let id;
let missedMessage = {};
let models = [];
let rooms = [];
let ch_1;
let ch_2;
let ch_3;
let ch_cli = false;
let ch_roo = false;
let ch_cou = false;
let ch_mes = false;
ch_1 = ch_2 = ch_3 = false;

clients["fil"] = { login: "fil", name: "Филипп", password: "1", counter_id_cards: 200, counter_id_group: 100, isAdmin: true, users: ["alina", "sebastian", "valera", "milena"], models: [0] };
clients["alina"] = { login: "alina", name: "Алина", password: "11", counter_id_cards: 200, counter_id_group: 100, isAdmin: false, models: [0] };
clients["sebastian"] = { login: "sebastian", name: "Сергей", password: "111", counter_id_cards: 200, counter_id_group: 100, isAdmin: false, models: [0] };
clients["milena"] = { login: "milena", name: "Милена", password: "123", counter_id_cards: 200, counter_id_group: 100, isAdmin: false, models: [0] };
clients["valera"] = { login: "valera", name: "Валерий", password: "4", counter_id_cards: 200, counter_id_group: 100, isAdmin: false, models: [0] };

models[0] = {
    data: [
        {
            values: [
                [
                    {
                        id_group: "0qwuet",
                        group_name: "Производство",
                        show_text: true,
                        group_cards: [
                            {
                                id_group: "1qwuet",
                                group_name: "Мясное хозяйство",
                                show_text: true,
                                group_cards: [

                                    { id_card: "3fdg", in_group: "1qwuet", name: 'Себастьян', text: ' gr_20', date: Date.now(), show_text: true },
                                    {
                                        id_group: "2qwuet",
                                        group_name: "Шашлычное хозяйство",
                                        show_text: true,
                                        group_cards: [
                                            { id_card: "0fdg", in_group: "2qwuet", name: 'Себастьян', text: ' gr_20', date: Date.now(), show_text: true },
                                            { id_card: "1fdg", in_group: "2qwuet", name: 'Себастьян', text: ' gr_21', date: Date.now(), show_text: true },
                                            { id_card: "2fdg", in_group: "2qwuet", name: 'Себастьян', text: ' gr_22', date: Date.now(), show_text: true },
                                        ]
                                    },
                                    { id_card: "4fdg", in_group: "1qwuet", name: 'Себастьян', text: ' gr_21', date: Date.now(), show_text: true },
                                    { id_card: "5fdg", in_group: "1qwuet", name: 'Себастьян', text: ' gr_22', date: Date.now(), show_text: true },
                                ]
                            },


                            { id_card: "6fdg", in_group: "0qwuet", name: 'Себастьян', text: 'Lorem ipsum dolor sit amet consectetur.', date: Date.now(), show_text: true },
                            { id_card: "7fdg", in_group: "0qwuet", name: 'Алина', text: 'Lorem ipsum dolor sit amet consectetur.', date: Date.parse('12-12-2021'), show_text: true },
                            { id_card: "8fdg", in_group: "0qwuet", name: 'Милена', text: 'Lorem ipsum dolor sit.', date: Date.parse('11-04-2021'), show_text: true },
                            { id_card: "9fdg", in_group: "0qwuet", name: 'Ирина', text: 'Lorem ipsum.', date: Date.parse('06-17-2021'), show_text: true },
                        ]
                    }
                ],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
            ],
            date: 1201844496000,
        },
    ],
    users: ["fil", "alina", "sebastian", "valera", "milena"]
};

rooms[0] = { room_name: "Room1", room_admin: "I", room_clients: ["il", "ar", "ri", "I"]/*, room_messages:"Здесь должны быть сообщения комнаты Ir1"*/ };//С 18.12.2019 message не надо!!!
rooms[1] = { room_name: "Room2", room_admin: "I", room_clients: ["il", "ar", "ri", "I"]/*, room_messages:"Здесь должны быть сообщения комнаты Ir2"*/ };
rooms[2] = { room_name: "TestRoom", room_admin: "fil", room_clients: ["fil", "ili", "art", "rin"] };

let messages = [
    { name: 'Филипп', text: 'Тест 1', time: 1201844496000 },
    { name: 'Себас', text: 'Приветик1', time: 1571863496000 },
    { name: 'Себас', text: 'Приветик2', time: 1201844496000 },
    { name: 'Себас', text: 'Приветик3', time: 1571843496000 },
    { name: 'Филипп', text: 'Тест 2', time: 1201842496000 },
    { name: 'Себас', text: 'Приветик6', time: 1571844596000 }
];

let people = {};

const server = new WebSocket.Server({ port: 3030 });
engineStart();
function engineStart() {
    console.log("Стартуем");
    server.on('connection', (ws, ident) => {
        console.log("Есть контакт👌!!!");
        let idclient = ident.url.replace('/id', '');
        if (clients[idclient] != undefined) {
            people[idclient] = ws;
        }
        for (index in people) {
            checkOnline(index);
        };
        ws.on('message', message => {
            message = JSON.parse(message);
            if (message['type'] == 'message') {
                console.log(message['room_clients']);
                message['room_clients'].forEach(clientId => {
                    if (checkStatus(clientId)) {
                        if (clientId != message['room_messages'].name) {
                            people[clientId].send(JSON.stringify({
                                type: 'message', name: 'server',
                                room_id: message['room_id'],
                                room_name: message['room_name'],
                                room_admin: message['room_admin'],
                                room_clients: message['room_clients'],
                                room_messages: message['room_messages']
                            }));
                        }
                    } else {
                        console.log(clientId + " не онлайн!!!!!!!!!!!!!!!!!!!!!!!");
                        console.log(message['room_id']);
                        console.log(missedMessage[clientId]);
                        if (missedMessage[clientId] == undefined) {
                            missedMessage[clientId] = [];
                        }
                        missedMessage[clientId].push({
                            room_id: message['room_id'],
                            room_name: message['room_name'],
                            room_admin: message['room_admin'],
                            room_clients: message['room_clients'],
                            room_messages: message['room_messages']
                        });
                        console.log(missedMessage[clientId]);
                        insertAll('4');
                    }
                });
            }


            if (message['type'] == 'regCheck') {//надо сменить подключение ===testing===//с 17.01.2020 не надо
                console.log(message);
                if (clients[message['login']] != undefined && clients[message['login']] != null) {
                    if (message['password'] == clients[message['login']].password) {
                        console.log("SEND");
                        ws.send(JSON.stringify({ type: 'regCheck', client: clients[message['login']] }));
                        for (let i = 0; i < clients[message['login']].models.length; i++) {
                            console.log("SEND_Models");
                            if (models[clients[message['login']].models[i]] != undefined && models[clients[message['login']].models[i]] != null) {
                                ws.send(JSON.stringify({ type: 'regCheckAddModels', models: models[clients[message['login']].models[i]] }));
                            }
                        }
                        console.log("SEND_OK");
                        ws.send(JSON.stringify({ type: "youCan" }));

                        // if(missedMessage[idclient]!=null||missedMessage[idclient]!=undefined){
                        //     console.log("Не пуст!!!!!!!!!!");
                        //     missedMessage[idclient].forEach(misMes=>{
                        //         people[idclient].send(JSON.stringify({                              
                        //         type:'message', name:'server',
                        //         room_id: misMes['room_id'],
                        //         room_name: misMes['room_name'],
                        //         room_admin: misMes['room_admin'],
                        //         room_clients: misMes['room_clients'], 
                        //         room_messages: misMes['room_messages']
                        //         }));                        
                        //     });
                        //     console.log("Восстановлен"+idclient);
                        //     delete missedMessage[idclient];
                        //     insertAll('4');  
                        // };  

                    } else {
                        ws.send(JSON.stringify({ type: 'wrPassword' }));
                    }
                } else {
                    ws.send(JSON.stringify({ type: 'wrLogin' }));
                }

            }


            if (message['type'] == 'regCheckAdm') {
                console.log(message);
                if (clients[message['login']] == undefined || clients[message['login']] == null) {
                    console.log("SENDregCheckAdm");
                    clients[message['login']] = { login: message['login'], password: message['password'], isAdmin: true, users: [], rooms: [] };
                    insertAll('1');
                    ws.send(JSON.stringify({ type: 'regCheckAdm' }));
                } else {
                    ws.send(JSON.stringify({ type: 'wrLogin' }));
                }
            }
            if (message['type'] == 'renameRoom') {
                rooms[message['room_id']].room_name = message['room_name'];
                rooms[message['room_id']].room_clients.forEach(clientId => {
                    if (checkStatus(clientId)) {
                        if (clientId != rooms[message['room_id']].room_admin) {
                            people[clientId].send(JSON.stringify({ type: 'renameRoom', name: 'server', room_id: message['room_id'], room_name: message['room_name'] }));
                        }
                    }
                });
                insertAll('2');
            }
            if (message['type'] == 'changeClients') {
                if (!message['room_stat']) {
                    rooms[message['room_id']].room_clients = [...message['room_clients']];
                }
                rooms[message['room_id']].room_clients.forEach(clientId => {
                    if (checkStatus(clientId)) {
                        if (clients[clientId].rooms.indexOf(message['room_id']) == -1) {
                            clients[clientId].rooms.push(message['room_id']);
                        }
                        if (clientId != rooms[message['room_id']].room_admin) {
                            people[clientId].send(JSON.stringify({ type: 'changeClients', name: 'server', room_id: message['room_id'], room_clients: message['room_clients'] }));
                        }
                    }
                });
                if (message['room_stat']) {
                    rooms[message['room_id']].room_clients = [...message['room_clients']];
                }
                insertAll('1');

            }
            if (message['type'] == 'addRoom') {
                console.log(clients[message['admin']]);
                rooms[id] = { room_name: message['name'], room_admin: message['admin'], room_clients: message['clients'] };
                console.log(rooms[id]);
                console.log(id);
                console.log("==Полет=нормальный==");
                rooms[id].room_clients.forEach(clientId => {
                    if (clients[clientId].rooms == undefined && clients[clientId].rooms == null) {
                        clients[clientId].rooms = [];
                    }
                    clients[clientId].rooms.push(id);//test
                });
                console.log(rooms);
                ws.send(JSON.stringify({ type: 'createRoom', name: 'server', room_name: message['name'], room_id: id, room_admin: message['admin'], room_clients: message['clients'], room_messages: [] }));
                id++;
                insertAll('6');
            }
            if (message['type'] == 'addCard') {

                console.log("==Понеслась😁==");
                // model_id: 0, fragment_id: fragment_id, block_id: block_id, group_id: group_id, cards: list_cards

                let cards_block = models[message['model_id']].data[message['fragment_id']].values[message['block_id']];
                let users = models[message['model_id']].users;

                users.forEach(clientId => {
                    if (checkStatus(clientId) && (clientId != message['name'])) {
                        people[clientId].send(JSON.stringify({
                            type: 'addCard', name: 'server',
                            model_id: message['model_id'],
                            fragment_id: message['fragment_id'],
                            block_id: message['block_id'],
                            group_id: message['group_id'],
                            cards: message['cards']
                        }));
                    }
                });
                pushCard(message['group_id'], message['cards'], cards_block);
                people["fil"].send(JSON.stringify({
                    type: 'test', name: 'server',
                    data: cards_block
                }));
                // for (let item of cards_block) {
                //     console.log("бам");
                //     console.log(item);
                //     if ((item.id_group != null) && (item.id_group != undefined)) {
                //         console.log("Залетел_1");
                //         if (item.id_group == message['group_id']) {
                //             console.log("Нашёл_1");
                //             item.group_cards.push(message['cards']);
                //         } else {
                //             console.log("Ушёл_1");
                //             pushCard(message['group_id'], message['cards'], item.group_cards);
                //         }
                //     }
                // }
                // console.log(models[message['model_id']].data[message['fragment_id']].values[message['block_id']]);

                // people["fil"].send(JSON.stringify({
                //     type: 'addCard', name: 'server',
                //     fragment_id: message['fragment_id'],
                //     block_id: message['block_id'],
                //     group_id: null,
                //     item: message['item']
                //     // room_id:message['room_id'],
                //     // room_name:message['room_name'],
                //     // room_admin:message['room_admin'],
                //     // room_clients:message['room_clients'], 
                //     // room_messages:message['room_messages']
                // }));




                // rooms[id].room_clients.forEach(clientId => {
                //     if (clients[clientId].rooms == undefined && clients[clientId].rooms == null) {
                //         clients[clientId].rooms = [];
                //     }
                //     clients[clientId].rooms.push(id);//test
                // });
                // console.log(rooms);
                // ws.send(JSON.stringify({ type: 'createRoom', name: 'server', room_name: message['name'], room_id: id, room_admin: message['admin'], room_clients: message['clients'], room_messages: [] }));
                // id++;
                // insertAll('6');
            }
            if (message['type'] == 'addGroup') {


                console.log("==Понеслась😁==");
                // model_id: 0, fragment_id: fragment_id, block_id: block_id, group_id: group_id, cards: list_cards

                let cards_block = models[message['model_id']].data[message['fragment_id']].values[message['block_id']];
                let users = models[message['model_id']].users;

                users.forEach(clientId => {
                    if (checkStatus(clientId) && (clientId != message['name'])) {
                        people[clientId].send(JSON.stringify({
                            type: 'addGroup', name: 'server',
                            model_id: message['model_id'],
                            fragment_id: message['fragment_id'],
                            block_id: message['block_id'],
                            group_id: message['group_id'],
                            cards: message['cards']
                        }));
                    }
                });

                // add_group(id_group, group, cards_block)
                for (let item of cards_block) {
                    console.log("бам");
                    console.log(item);
                    if ((item.id_group != null) && (item.id_group != undefined)) {
                        console.log("Залетел_1");
                        if (item.id_group == message['group_id']) {
                            console.log("Нашёл_1");
                            item.group_cards.push(message['cards']);
                        } else {
                            console.log("Ушёл_1");
                            pushCard(message['group_id'], message['cards'], item.group_cards);
                        }
                    }
                }
                console.log(models[message['model_id']].data[message['fragment_id']].values[message['block_id']]);

                // people["fil"].send(JSON.stringify({
                //     type: 'addCard', name: 'server',
                //     fragment_id: message['fragment_id'],
                //     block_id: message['block_id'],
                //     group_id: null,
                //     item: message['item']
                //     // room_id:message['room_id'],
                //     // room_name:message['room_name'],
                //     // room_admin:message['room_admin'],
                //     // room_clients:message['room_clients'], 
                //     // room_messages:message['room_messages']
                // }));




                // rooms[id].room_clients.forEach(clientId => {
                //     if (clients[clientId].rooms == undefined && clients[clientId].rooms == null) {
                //         clients[clientId].rooms = [];
                //     }
                //     clients[clientId].rooms.push(id);//test
                // });
                // console.log(rooms);
                // ws.send(JSON.stringify({ type: 'createRoom', name: 'server', room_name: message['name'], room_id: id, room_admin: message['admin'], room_clients: message['clients'], room_messages: [] }));
                // id++;
                // insertAll('6');
            }
            if (message['type'] == 'remMyRoom') {
                if (clients[message['client_name']] != undefined || clients[message['client_name']] != null) {
                    if (clients[message['client_name']].rooms.indexOf(message['room_id']) != -1) {
                        clients[message['client_name']].rooms.splice(clients[message['client_name']].rooms.indexOf(message['room_id']), 1);
                        insertAll('1');
                    }
                }
            }



            if (message['type'] == 'addUser') {
                if (clients[message['login']] != undefined) {
                    people[idclient].send(JSON.stringify({ type: "addUser", stat: false }));
                } else {
                    people[idclient].send(JSON.stringify({ type: "addUser", login: message['login'], stat: true }));
                    clients[message['login']] = { login: message['login'], password: message['password'], isAdmin: false, rooms: [] };
                    clients[message['admin']].users.push(message['login']);
                    insertAll('1');
                }
            }
            if (message['type'] == 'remRoom') {
                console.log("RoomDel #" + message['room_id']);
                if (rooms[message['room_id']].room_clients != null) {
                    console.log(rooms[message['room_id']].room_clients);
                    rooms[message['room_id']].room_clients.forEach(clientId => {
                        if (checkStatus(clientId)) {
                            if (clientId != rooms[message['room_id']].room_admin) {
                                people[clientId].send(JSON.stringify({ type: 'remRoom', name: 'server', room_id: message['room_id'] }));
                            }
                        }
                        console.log(clientId);
                        if (clients[clientId].rooms.indexOf(message['room_id']) != -1) {
                            clients[clientId].rooms.splice(clients[clientId].rooms.indexOf(message['room_id']), 1); //test
                        }
                        if (missedMessage[clientId] != null || missedMessage[clientId] != undefined) {
                            console.log("Не пуст!!!!!!!!!!");
                            for (let i = 0; i < missedMessage[clientId].length; i++) {
                                console.log(missedMessage[clientId][i].room_id);
                                if (missedMessage[clientId][i].room_id == message['room_id']) {
                                    delete missedMessage[clientId][i];
                                }
                            }
                            console.log(missedMessage[clientId]);

                        };
                    });
                    rooms[message['room_id']] = null;
                    insertAll('5');
                }
            }
        });

        for (let id in people) {
            people[id].on('close', () => {
                delete people[idclient];
                console.log(idclient + " is offline");
            });
        };

    });

    // const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology:true });
    // mongoClient.connect(function(err, client){
    //     const db = client.db("chatdb");
    //     const users = db.collection("test");
    //     let user = {name: "Tom", age: 23};
    //     users.insertOne(user, function(err, result){

    //         if(err){ 
    //             return console.log(err);
    //         }
    //         console.log(result.ops);
    //         client.close();
    //     });
    // });
}
function insertAll(id) {
    if (active_db) {
        // private.close();
        return;
    }
    active_db = true;
    const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true });
    mongoClient.connect(function (err, client) {
        const db = client.db("chatdb");
        db.dropDatabase();
        private = client;

        const users = db.collection("clients");
        // users.remove();
        users.insertOne(clients, function (err, result) {
            if (err) {
                return console.log(err);
            }
            console.log("INCLI");
            ch_cli = true;
            if (ch_cli && ch_roo && ch_mes && ch_cou) {
                client.close();
                ch_cli = false;
                ch_roo = false;
                ch_cou = false;
                ch_mes = false;
                active_db = false;
            }

        });
        const roo = db.collection("rooms");
        // roo.remove();
        roo.insertOne({ "rooms": rooms }, function (err, result) {
            if (err) {
                return console.log(err);
            }
            console.log("INROO");
            ch_roo = true;
            if (ch_cli && ch_roo && ch_mes && ch_cou) {
                client.close();
                ch_cli = false;
                ch_roo = false;
                ch_cou = false;
                ch_mes = false;
                active_db = false;
            }
        });
        const cou = db.collection("count");
        // cou.remove();
        cou.insertOne({ count: id }, function (err, result) {
            if (err) {
                return console.log(err);
            }
            console.log("INCOU");
            ch_cou = true;
            if (ch_cli && ch_roo && ch_mes && ch_cou) {
                client.close();
                ch_cli = false;
                ch_roo = false;
                ch_cou = false;
                ch_mes = false;
                active_db = false;
            }
        });
        const mes = db.collection("message");
        // mes.remove();
        mes.insertOne(missedMessage, function (err, result) {
            if (err) {
                return console.log(err);
            }
            console.log("INMES");
            ch_mes = true;
            if (ch_cli && ch_roo && ch_mes && ch_cou) {
                client.close();
                ch_cli = false;
                ch_roo = false;
                ch_cou = false;
                ch_mes = false;
                active_db = false;
            }
        });

    });


}
function checkOnline(id) {
    if (people[id] != undefined) {
        console.log(id + " is online");
    } else {
        console.log(id + " is offline");
    }
}
function checkStatus(id) {
    if (people[id] != undefined) {
        return true;
    } else {
        return false;
    }
}
function add_group(id_group, group, cards_block) {
    if ((group_id != undefined) && (group != undefined) && (cards_block != undefined)) {
        if (id_group == null){
            cards_block.push(group);
            // for (let item of cards_block) {
            //     if ((item.id_group != undefined) && (item.id_group == id_group)) {
            //         item.group_cards.push(group);
            //     } else {
            //         add_group(id_group, group, item.group_cards);
            //     }
            // }
        }else{
            for (let item of cards_block) {
                if ((item.id_group != undefined) && (item.id_group == id_group)) {
                    item.group_cards.push(group);
                } else {
                    add_group(id_group, group, item.group_cards);
                }
            }
            // ////////////////////////////////
        }           
    }
}
function pushCard(group_id, cards, cards_block) {
    // models[model_id].data[fragment_id].values[block_id];
    // Через 3 часа она заработала... УРА! УРА! 
    if ((group_id != undefined) && (cards != undefined) && (cards_block != undefined)) {
        console.log("================================================================");
        console.log(group_id);
        console.log(cards);
        console.log(cards_block);
        console.log("================================================================");
        for (let item of cards_block) {
            console.log("Это мне массив пришёл. Здрасьте)");
            if ((item.id_group != null) && (item.id_group != undefined)) {
                console.log("Группа вообще есть");
                if (item.id_group == group_id) {
                    console.log("Нашёл совпадение по id группы");
                    let find = false;
                    for (let i = 0; i < item.group_cards.length; i++) {
                        if ((item.group_cards[i].id_card != undefined) && (item.group_cards[i].id_card == cards.id_card)) {
                            console.log("Заменил карточку)))");
                            item.group_cards[i] = cards;
                            find = true;
                            break;
                        }
                    }
                    if (!find) {
                        console.log("Вставил карточку)))");
                        item.group_cards.push(cards);
                    }
                    break;
                } else {
                    console.log("Пошёл искать другие группы, может повезет😅");
                    pushCard(group_id, cards, item.group_cards);
                }
            }
        }
    } else {
        console.log("Мне прислали какую-то дичь при добавлении карточки!!!");
    }
}

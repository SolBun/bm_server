const WebSocket = require("ws"); 

let clients={};//==testing===
clients["fil"]={login:"fil", password:"1", isAdmin:true, users:["alina","sebastian","valera","milena"], rooms:[2]};
clients["alina"]={login:"alina", password:"11", isAdmin:false, rooms:[2]};
clients["sebastian"]={login:"sebastian", password:"111", isAdmin:false, rooms:[2]};
clients["milena"]={login:"milena", password:"123", isAdmin:false, rooms:[2]};
clients["valera"]={login:"valera", password:"4", isAdmin:false, rooms:[2]};
let rooms={};
rooms[0]={room_name:"Room1", room_admin:"I", room_clients:["il","ar","ri","I"]/*, room_messages:"Здесь должны быть сообщения комнаты Ir1"*/};
rooms[1]={room_name:"Room2", room_admin:"I", room_clients:["il","ar","ri","I"]/*, room_messages:"Здесь должны быть сообщения комнаты Ir2"*/};
rooms[2]={room_name:"TestRoom", room_admin:"fil", room_clients:["fil","ili","art","rin"]};
let id=3;
let people={};
let missedMessage={};
let missedInfo={};
const server = new WebSocket.Server({port: 3000});
console.log("Стартуем");
server.on('connection',(ws, ident)=>{
    console.log("Есть контакт👌!!!");    
    let idclient = ident.url.replace('/id', '');
    if(clients[idclient]!=undefined){
        people[idclient]=ws;
    }            
    for(index in people){
        checkOnline(index);
    };    
    ws.on('message', message=>{
        message=JSON.parse(message);
        if(message['type']=='message'){
            console.log(message['room_clients']);
            message['room_clients'].forEach(clientId=>{
                if(checkStatus(clientId)){
                    if(clientId != message['room_messages'].name){
                        people[clientId].send(JSON.stringify({type:'message', name:'server',
                            room_id:message['room_id'],
                            room_name:message['room_name'],
                            room_admin:message['room_admin'],
                            room_clients:message['room_clients'], 
                            room_messages:message['room_messages']
                        }));
                    }
                }else{
                    console.log(clientId+" не онлайн!!!!!!!!!!!!!!!!!!!!!!!");
                    console.log(message['room_id']);
                    console.log(missedMessage[clientId]);
                    if(missedMessage[clientId]==undefined){
                        missedMessage[clientId]=[];
                    }
                    missedMessage[clientId].push({
                        room_id:message['room_id'],
                        room_name:message['room_name'],
                        room_admin:message['room_admin'],
                        room_clients:message['room_clients'], 
                        room_messages:message['room_messages']
                    });     
                    console.log(missedMessage[clientId]);            
                }
            });
        }
        if(message['type']=='regCheck'){
            console.log(message);
            if(clients[message['login']]!=undefined && clients[message['login']]!=null){
                if(message['password']==clients[message['login']].password){
                    console.log("SEND");
                    ws.send(JSON.stringify({type:'regCheck', client:clients[message['login']]}));
                    for( let i=0; i<clients[message['login']].rooms.length; i++){
                        console.log("SEND_ROOM");
                       ws.send(JSON.stringify({type:'regCheckAddRooms',room_id:clients[message['login']].rooms[i], rooms:rooms[clients[message['login']].rooms[i]]})); 
                    }
                    console.log("SEND_OK");
                    ws.send(JSON.stringify({type:"youCan"}));
                    if(missedMessage[idclient]!=null){
                        console.log("Не пуст!!!!!!!!!!");
                        missedMessage[idclient].forEach(misMes=>{
                            people[idclient].send(JSON.stringify({                              
                            type:'message', name:'server',
                            room_id: misMes['room_id'],
                            room_name: misMes['room_name'],
                            room_admin: misMes['room_admin'],
                            room_clients: misMes['room_clients'], 
                            room_messages: misMes['room_messages']
                            }));                        
                        });
                        console.log("Восстановлен"+idclient);
                        delete missedMessage[idclient];
                    };
                    if(missedInfo[idclient]!=null){
                        console.log("Не пуст!!!!!!!!!!");
                        missedInfo[idclient].forEach(misMes=>{
                            people[idclient].send(misMes);
                        });
                        delete missedInfo[idclient];
                    };            
                }else{
                    ws.send(JSON.stringify({type:'wrPassword'}));
                }
            }else{
                ws.send(JSON.stringify({type:'wrLogin'}));
            }
            
        }
        if(message['type']=='renameRoom'){
            rooms[message['room_id']].room_name=message['room_name'];
            rooms[message['room_id']].room_clients.forEach(clientId=>{
                if(checkStatus(clientId)){
                    if(clientId != rooms[message['room_id']].room_admin){
                        people[clientId].send(JSON.stringify({type:'renameRoom', name:'server', room_id: message['room_id'], room_name:message['room_name']}));                        
                    }
                }//test
            });            
        }
        if(message['type']=='changeClients'){
            rooms[message['room_id']].room_clients.forEach(clientId=>{
                if(checkStatus(clientId)){
                    if(clientId != rooms[message['room_id']].room_admin){
                        people[clientId].send(JSON.stringify({type:'changeClients', name:'server', room_id: message['room_id'], room_clients:message['room_clients']}));                        
                    }
                }//test
            });            
            rooms[message['room_id']].room_clients =[... message['room_clients']];          
        }
        if(message['type']=='addRoom'){
            console.log(clients[message['admin']]);
            rooms[id]={room_name:message['name'], room_admin:message['admin'], room_clients:message['clients']};
            console.log(rooms[id]);            
            console.log(id);
            console.log("==Полет=нормальный==");
            rooms[id].room_clients.forEach(clientId=>{
                if(clients[clientId].rooms==undefined&&clients[clientId].rooms==null){
                    clients[clientId].rooms=[];
                }
                clients[clientId].rooms.push(id);//test
            });
            ws.send(JSON.stringify({type:'createRoom', name:'server', room_name: message['name'], room_id: id, room_admin: message['admin'], room_clients: message['clients'], room_messages:[]}));
            id++;
        }
        if(message['type']=='remMyRoom'){
           if(clients[message['client_name']]!=undefined){
               if(clients[message['client_name']].rooms.indexOf(message['room_id'])!=-1){
                clients[message['client_name']].rooms.splice(clients[message['client_name']].rooms.indexOf(message['room_id']),1);
               }
           }
        }

        if(message['type']=='remRoom'){
            // clients[message['admin']].rooms.splice(clients[message['admin']].rooms.indexOf(message['room_id']), 1);
            console.log("RoomDel #"+message['room_id']);
            console.log(rooms[message['room_id']].room_clients);
            rooms[message['room_id']].room_clients.forEach(clientId=>{
                if(checkStatus(clientId)){
                    if(clientId != rooms[message['room_id']].room_admin){
                        people[clientId].send(JSON.stringify({type:'remRoom', name:'server', room_id: message['room_id']}));                        
                    }
                }else{
                    console.log(clientId+" не онлайн!!!!!!!!!!!!!!!!!!!!!!!");                    
                    if(missedInfo[clientId]==undefined){
                        missedInfo[clientId]=[];
                    }
                    missedInfo[clientId].push(JSON.stringify({type:'remRoom', name:'server', room_id: message['room_id']})); 
                    console.log(missedInfo[clientId]);                   
                }
                if(clients[clientId].rooms.indexOf(message['room_id'])!=-1){
                    clients[clientId].rooms.splice(clients[clientId].rooms.indexOf(message['room_id']),1); //test
                }
            });
            rooms[message['room_id']]=null;            
        }
    });
    for(let id in people){
        people[id].on('close', ()=>{
        delete people[idclient];
        console.log(idclient+" is offline");
        });
    };

});
function checkOnline(id){
    if(people[id]!=undefined){
        console.log(id+" is online");
    }else{
        console.log(id+" is offline");
    }
}
function checkStatus(id){
    if(people[id] !=undefined){
        return true;
    }else{
        return false;
    }
}

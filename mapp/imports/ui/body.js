import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import './task.js';
import './body.html'; 

Template.body.helpers({
  tasks() {
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
});

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });

    // Clear form
    target.text.value = '';
  },
});

// Connecting to ROS
  // -----------------

  var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
  });

  ros.on('connection', function() {
    console.log('Connected to websocket server.');
  });

  ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
  });

  ros.on('close', function() {
    console.log('Connection to websocket server closed.');
  });

  // Subscribing to a Topic
  // ----------------------

    var listener = new ROSLIB.Topic({
      ros : ros,
      name : '/chatter',
      messageType : 'std_msgs/String'
    });

    var coordsStr = "";
    var temp = "";
      listener.subscribe(function(message) {
        //document.querySelector('.results').innerHTML = 'Сообщение из топика ' + listener.name + '<br>Текущие координы: ' + message.data;
        //console.log('Received message on ' + listener.name + ': ' + message.data);
        var strX = message.data.substring(4,8);
        var strY = message.data.substring(14,18);
        var x = parseFloat(strX);
        var y = parseFloat(strY); 
        var text = String(y) + ", " + String(x);
        console.log(text);

        //Tasks.findOne({}, { sort: { _id: -1 }, limit: 1 }).remove();
        Tasks.remove({_id: temp});
        var lastTaskId = Tasks.insert({
      		text,
      		createdAt: new Date(), // current time
    	 });
        temp = lastTaskId;
        //console.log(temp);
      });
      //listener.unsubscribe();

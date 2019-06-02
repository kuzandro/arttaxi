import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

Meteor.startup(() => {
  if (Meteor.isServer) {
    Tasks.remove({});
  }
});
//MODEL:
//How data should look and behave.
//extend correctly sets up the prototype chain, so subclasses created with extend can be further extended and subclassed as far as you like.
List = Backbone.Model.extend({
  defaults: {
    list: ''
  },
  //is a method. After creating new object, initialize takes place.this.on refers to model.
 /* initialize: function() {
    this.on("change", function() {

    });

  },*/
  //tells backbone that mongo(database) is calling the id something else.
  idAttribute: '_id',
});

//Model ends


//COLLECTION:
//collection can fetch things at once and run them automatically from the server. The Collection will take every object literal and try to run them through the constructor

ListCollection = Backbone.Collection.extend({

  //In reference to Model
  model: List,

  //The url links to the server. Backbone assumes you are going to get an array of objects back.
  url: 'http://tiny-pizza-server.herokuapp.com/collections/TK-List',


});

//Collection ends

//VIEW:
//Forces settings into model.Takes the same data in model and makes changes.
ListView = Backbone.View.extend({


  template: _.template($('.list-chore').text()),
  editTemplate: _.template($('.list-edit-chore').text()),

  //click buttons according to what you wish to change or update.
  events: {
    "click .edit-list": "editList",
    "click .remove-list": "deleteList",
    "click .store-list": "saveList",
  },

  //Methods//
  //Refreshes when there is a change in the model. Renders if there is a change to the container.
  initialize: function() {
    //append everything within the view?
    this.listenTo(this.model, 'change', this.render),
    $('.container').append(this.el)
    //this renders immediately w/o listing to when called.
    this.render();
  },


  render: function() {
    //Rendering Template
    var renderTemp = this.template(this.model.attributes)
    this.$el.html(renderTemp);

  },

 

  //Edit list/why attribute:because all the important instances are being passed with the attribute.
  editList: function() {
    var renderTemp = this.editTemplate(this.model.attributes)
    this.$el.html(renderTemp);
  },

  //Delete list
  deleteList: function() {
    this.model.destroy();
    this.remove();
  },

  saveList: function(){
//find:class
    var fieldvalue = this.$el.find('.field input').val();
  console.log(fieldvalue);
  
  //setting the new propety value of model locally
  this.model.set('list', fieldvalue);
  //saves the model
  this.model.save()
},

});

$(function(){
  $('.add-list').click(function(){
    var inputVal= $('.add-list-input').val()
    var newList=toDoList.add({list:inputVal})
 
    newList.save()
  })
})

AppView = Backbone.View.extend({
 
  initialize: function(){
    this.listenTo(toDoList, 'add', function(list){
      new ListView({model: list})
    })
  }
 
});
 
// create instances
 
var toDoList = new ListCollection();

var app = new AppView();

toDoList.fetch();


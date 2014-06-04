//MODEL:
//How data should look and behave.
//extend correctly sets up the prototype chain, so subclasses created with extend can be further extended and subclassed as far as you like.
List = Backbone.Model.extend({

//is a method. After creating new object, initialize takes place.this.on refers to model.
  initialize: function(){
    this.on("change", function(){
  
  });

},
//tells backbone that mongo(database) is calling the id something else.
  idAttribute: '_id',
});

//Model ends


//COLLECTION:
//collection can fetch things at once and run them automatically from the server.

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
  "click .submit-list" : "addList",
  "click .edit-list" : "editList",
  "click .remove-list" : "deleteList",
  "click .store-list" : "saveList",
},
  
//Methods//
//Refreshes when there is a change in the model. Renders if there is a change to the container.
  initialize: function(){
//append everything within the view?
  this.listenTo(this.model, 'change', this.render),
  $('container').append(this.el)
  //this renders immediately w/o listing to when called.
  this.render();
},


render: function(){
  //Rendering Template
  var renderTemp = this.template(this.model.attributes)
  this.$el.html(renderTemp);
 
 },

 //Add list
 addList: function(){
  this.model.add();
  this.submit();

},

//Edit list
 editList: function(){
  var renderTemp = this.editTemplate(this.model.attributes)
  this.$el.html(renderTemp);
 },

 //Delete list
 deleteList: function(){
  this.model.destroy();
  this.remove();
},

});

var toDoList = new ListCollection();

toDoList.fetch().done(function(){
  toDoList.each(function(list){
    new ListView({model: list});
  })
});


(function(){
  this.odcMenu = function(){ //constructor
    //global elements reference
    this.menu = null;
    this.selector = 'odc-menu';

    var defaults = {
      type: 'horizontal',
      position: 'top',
      menuAlign: 'left',
      menuColor:'#fff',
      textColor: '#666',
      className: '',
      sticky: false
    }

    if (arguments[0] && typeof arguments[0] === "object") { //extend defaults
      this.options = extendDefaults(defaults, arguments[0]);
    }
  }
  //PUBLIC METHODS
  odcMenu.prototype.open = function(){
    buildMenu.call(this);
  }

  odcMenu.prototype.init = function(){
    var init;

    init = document.getElementsByClassName(this.selector);
    if(init.length > 0){
      buildMenu.call(this);
      initializeEvents.call(this);
    }else{
      console.log('Please define \"'+this.selector+'\" to a list to make it a menu');
    }
  }
  //PRIVATE METHODS

  // Utility method to extend defaults with user options
  function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }

  function buildMenu(){
    var menuWrapper, fragment, prefix;
    fragment = document.createDocumentFragment();

    menuWrapper = document.createElement("div");
    menuWrapper.className = "odc-menu-wrapper";

    //console.log(this.options);
    if(this.options.type == "horizontal"){
      prefix = "odc-horiz-";
    }else if(this.options.type == "vertical"){
      prefix = "odc-vert-";
    }

    //structure the menu
    var ul = document.getElementsByClassName(this.selector);

    if(ul.length > 0){
      var items = ul.item(0).getElementsByTagName("li");
      for (var i = 0; i < items.length; ++i) {
        var li = items[i];
        if(li.childNodes.length > 1){
          li.className= prefix+"menuItem hasChild";
        }else if(li.parentNode.className == "odc-menu"){
          li.className += prefix+"menuItem";
        }else{
          li.parentNode.className = prefix+"menuItem_sub";
        }
      }
      ul.item(0).className += " "+prefix+"menu";
    }
  }

  function initializeEvents() {
    var _this = this;

    if (this.options.type == "vertical") {
    //  this.closeButton.addEventListener('click', this.close.bind(this));
      var hasChild = document.getElementsByClassName('hasChild');
      //console.log(hasChild.item(0).className);
      if(hasChild.length > 0){
        for(var i=0; i< hasChild.length; i++){
          hasChild.item(i).addEventListener('click',function(){
            this.classList.toggle('active');
          });
        }

      }
    }
  }

  function buildHorizontalMenu(){
    var menuWrapper, prefix;
    prefix = "odc-horiz-";
    var ul = document.getElementsByClassName(this.selector);

    if(ul.length > 0){
      var items = ul.item(0).getElementsByTagName("li");
      for (var i = 0; i < items.length; ++i) {
        var li = items[i];
        if(li.childNodes.length > 1){
          li.className= "odc-horiz-menuItem hasChild";
        }else if(li.parentNode.className == "odc-menu"){
          li.className += "odc-horiz-menuItem";
        }else{
          li.parentNode.className = "odc-horiz-menuItem_sub";
        }
     }
     ul.item(0).className += " odc-horiz-menu";
    }

    //menuWrapper = document.createElement("div");
    //menuWrapper.className = "odc-menu_horizontal-wrapper";
    //menuWrapper.append(list);
    //console.log(menuWrapper);
    //document.body.replaceChild(list.item(0),menuWrapper);

    //list.parentNode.replaceChild(menuWrapper, list);
    //console.log(list);
  }


}());

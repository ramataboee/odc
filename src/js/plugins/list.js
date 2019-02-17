(function(){
  this.odcList = function(){
    this.list = null;
    this.selector = 'odc-list';

    var defaults = {
      id : 'list',
      className: '',
      source: '',
      listItems: '',
      sort: 'true',
      search: 'false',
      export: 'csv',
      pagination: '',
      reorder: 'true',
      grid: '1'
    }

    if (arguments[0] && typeof arguments[0] === "object") { //extend defaults
      this.options = extendDefaults(defaults, arguments[0]);
    }

    init.call(this);
  }
  //PUBLIC
  function buildHTMLList(){
      var ul = document.getElementById(this.options.id);//odc-list//odc-list_item
      var grid = this.options.grid;
      var layout = null;

      if(grid == 1){
        layout = 'linear';
      }else if(grid > 1){
        layout = 'grid odc-grid-'+grid;
      }

      ul.className = 'odc-list '+ this.options.className+' '+layout;
      if(ul.getElementsByTagName('li').length > 0){
        var items = ul.getElementsByTagName("li");
        for (var i = 0; i < items.length; ++i) {
          var li = items[i];
          if(li.parentElement.className.includes("odc-list")){
            li.className = "odc-list_item";
            //console.log(li);
          }
        }
      }
      //option

      if(this.options.search == 'true'){
        var searchInput = document.createElement("div");
        searchInput.className = "odc-text-input";
        searchInput.innerHTML = '<input class="effect-20" type="text" placeholder="" id="odc-'+this.options.id+'">'
          +'<label for="odc-'+this.options.id+'">Search List</label>'
          +'<span class="focus-border">'
            +'<i></i>'
          +'</span>';
        var ulid = this.options.id;
        searchInput.addEventListener('keyup', function(e){
          console.log('key up');
          var inputid = 'odc-'+ulid;
          searchList(inputid,ulid);
        });
        ul.prepend(searchInput);
      }
  }

  //PRIVATE

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

  function init(){
    //console.log('initalizing list...');
    var source = this.options.source;
    switch(source){
      case 'html' :
        buildHTMLList.call(this);
        break;
      case 'json':
        break;
      case 'js' :
        break;
      default:
        buildHTMLList.call(this);
    }
  }

// search filter list
function searchList(inputId,listId) {
  var input, filter, list, li, element;
  input = document.getElementById(inputId);
  filter = input.value.toUpperCase();
  list = document.getElementById(listId);
  li = list.getElementsByTagName("li");
  for (var i = 0; i < li.length; i++) {
    element = li[i];
    if (element) {
      if (element.innerHTML.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }
}

}());

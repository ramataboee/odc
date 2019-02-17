(function(){
  this.odcTooltip = function(){
    this.tooltip = null;

    var defaults = {
      className: '',
      content: '',
      animation: '',
      closeButton: false,
      onEvent:'',
      position:''
    }

    if (arguments[0] && typeof arguments[0] === "object") { // extend defaults with the passed in arugments if provided
      this.options = extendDefaults(defaults, arguments[0]);
    }
  }

  //PUBLIC METHODS

  //PRIVATE METHODS
  function init(){
    var selector = 'odc-tooltip';
  }
}());

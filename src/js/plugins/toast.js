(function(){
  this.odcToast = function(){
    this.closeButton = null;
    this.toast = null;

    var defaults = {
      title: "",
      content: "",
      className: '',
      toastType: ' default ',
      icon: true,
      closeButton: false,
      position:' top-right ',
      width: 250,
      delay: true,
      waitTime: 4500,
      animate: 'fadeInRight'
    }

    if (arguments[0] && typeof arguments[0] === "object") { // extend defaults with the passed in arugments if provided
      this.options = extendDefaults(defaults, arguments[0]);
    }
  }

  /*
  * PUBLIC METHODS
  */

  /*
  * public open method
  */
  odcToast.prototype.open = function(){
    buildToast.call(this); // Build out our Toast

    destroyToast.call(this);

    /*
    * After adding elements to the DOM, use getComputedStyle
    * to force the browser to recalc and recognize the elements
    * that we just added. This is so that CSS animation has a start point
    */
    window.getComputedStyle(this.toast).height;

    /*
    * Add our open class and check if the modal is taller than the window
    * If so, our anchored class is also applied
    */
    this.toast.className = this.toast.className +
    (this.toast.offsetHeight > window.innerHeight ?
      " odc-toast-open odc-toast-anchored" : " odc-toast-open");
    }

    /*
    * public close method
    */
    odcToast.prototype.close = function(){
      var _this = this;
      _this.toast.parentNode.removeChild(_this.toast);
    }

    // PRIVATE METHODS

    function extendDefaults(source, properties) {// Utility method to extend defaults with user options
      var property;
      for(property in properties){
        if(properties.hasOwnProperty(property)){
          source[property] = properties[property];
        }
      }
      return source;
    }

    function buildToast(){
      var icon, content, contentHolder, fragment, toastWrapper, contentWrapper;

      /*
      * If content is an HTML string, append the HTML string.
      * If content is a domNode, append its content.
      */

      if(typeof this.options.content === "string"){
        content = this.options.content;
      }else{
        content = this.options.content.innerHTML;
      }

      // Create a DocumentFragment to build with
      fragment = document.createDocumentFragment();

      // Create toast element
      this.toast = document.createElement("div");
      this.toast.className = "odc-toast " + this.options.toastType +" "+ this.options.className+" "+ this.options.animate;
      this.toast.style.width = this.options.width + "px";
      this.toast.style.maxWidth = this.options.width + "px";

      //Create Icon
      if(this.options.icon === true){
        this.icon = document.createElement("div");
        this.icon.className = "odc-toast-icon";
        this.toast.appendChild(this.icon);
      }

      // If closeButton option is true, add a close button
      if(this.options.closeButton === true){
        this.closeButton = document.createElement("button");
        this.closeButton.className = "odc-toast-close odc-toast-close-button";
        this.closeButton.innerHTML = "×";
        this.toast.appendChild(this.closeButton);
      }

      // content holder
      contentWrapper = document.createElement("div");
      contentWrapper.className = "odc-toast-content_wrapper";

      // create title
      if(this.options.title.length > 0){
        var title = document.createElement("div");
        title.className = "odc-toast_title";
        title.innerHTML = this.options.title;
        contentWrapper.append(title);
      }

      // Create content area and append to toast
      contentHolder = document.createElement("div");
      contentHolder.className = "odc-toast-content";
      contentHolder.innerHTML = content;
      contentWrapper.append(contentHolder);

      this.toast.appendChild(contentWrapper);

      //create Toast wrapper
      var wrapperPosition = this.options.position;
      toastWrapper = document.getElementsByClassName('odc-toast-wrapper '+wrapperPosition);

      if(toastWrapper.length > 0){
        toastWrapper.item(0).append(this.toast);
      }else{
        toastWrapper = document.createElement("div");
        toastWrapper.className = "odc-toast-wrapper " + wrapperPosition;
        toastWrapper.prepend(this.toast);
        fragment.appendChild(toastWrapper);
        document.body.appendChild(fragment);
      }
    }

    function destroyToast(){
      if(this.options.delay){
        setTimeout(
          this.close.bind(this)
          , this.options.waitTime);
        }
      }
    }());

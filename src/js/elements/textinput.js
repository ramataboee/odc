$(document).ready(function(){
  $('.odc-text-input input').each(function(){
     var input = $(this);
     var inputValClass = 'has-content';
     inputFocusOnValue(input,inputValClass);
     $(input).change(function(){
       inputFocusOnValue(input,inputValClass);
     });
  });
});
// for dynamic content
$(document).on({
  load: function(){
    $('.odc-text-input input').each(function(){
       var input = $(this);
       var inputValClass = 'has-content';
       inputFocusOnValue(input,inputValClass);
    });
  },
  change: function(){
    $('.odc-text-input input').each(function(){
       var input = $(this);
       var inputValClass = 'has-content';
        inputFocusOnValue(input,inputValClass);
    });
  }
},'.odc-text-input input');

$(document).on('change', '.odc-text-input input', function() {
  $('.odc-text-input input').each(function(){
     var input = $(this);
     var inputValClass = 'has-content';
     inputFocusOnValue(input,inputValClass);
     $(input).change(function(){
       inputFocusOnValue(input,inputValClass);
     });
  });
});

function inputFocusOnValue(element, contentClass){
  if(inputHasValue(element)){
    $(element).addClass(contentClass);
  }else{
    if($(element).hasClass(contentClass)){
      $(element).removeClass(contentClass);
    }
  }
}

function inputHasValue(elem) {
    return $(elem).filter(function() { return $(this).val(); }).length > 0;
}

$(document).on('change', '.odc-text-input input', function() {});

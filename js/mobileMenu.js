"use strict";

(function($) {

  $.fn.mobileMenu = function(structure, options) {
    var o = options || {};
    var self = this;
    var subOpen = 1;
    var closeAdded = 0;
    var settings = $.extend({
      animation: {
        speed: 200,
        easing: 'easeOutSine'
      },
      closeAll: true,
      mainOpenFrom: 'left',
      shadow: true,
      opener: '.mobileMenuOpener',
      closeStatic: true
    }, o );
    var subOpenFrom = options.subOpenFrom || options.mainOpenFrom || 'left';
    // init menu creation
    createmenuPage(structure.section);
    initOpenButton();
    self.css('height', getDeviceSize().height);

    function createmenuPage(section, back) {
      var items = section.items;
      var sub = back !== undefined ? true : false;
      var page = addPage(sub); // add a new page
      var backButton = createBackButton(back, page);

      // Add title to pages
      var sectionTitle = addTitle(section.title);
      page.append(sectionTitle);

      // Add back button if it is submenu
      if(sub) page.append(backButton);

      // Add Close button
      var closeBtn = closeButton(page);
      if (settings.closeStatic){
        closeBtn.addClass('static');
        page.addClass('closeStatic');
        if(closeAdded === 1) $('#mobileMenuWrapper').append(closeBtn);
      }else{
        page.prepend(closeBtn);
      }

      // Add animation to submenu
      animatePage(sub, page);

      $.each(items, function(key, value) {

        var item = templates().item;
        if ('section' in value) {
          item.addClass('more');
        } else {
          if (value.url) addUrlToItem(item, value.url); // <--- check if has URL
        }
        item.append(value.name);
        page.append(item);

        item.on('click', function(e) {
          if ('section' in value) {
            subOpen++;
            var back = section.title;
            createmenuPage(value.section, back);
          }
        });
      });

      if (!sub) {
        var direction = getDirection(settings.mainOpenFrom, false);
        self.css(direction);
      }

    }
    function createOpenButton(){
      var openBtn = templates().open;

      for (var i = 0; i < 3; i++) {
        var line = templates().line;
        openBtn.append(line);
      }
      $('#mobileMenuWrapper').append(openBtn);

      return openBtn;
    }

    function initOpenButton(){

      if(settings.opener === '.mobileMenuOpener') createOpenButton();

      var a = settings.animation;
      var direction = getDirection(settings.mainOpenFrom, true);
      $(settings.opener).on('click', function(e){
        self.css('display', 'inline-block');
        $(this).animate({ opacity: 0 }, a.speed, function(){
          $(this).css('display', 'none');
        });
        $('.close').css('display', 'block');
        $('.close').animate({ opacity: 1 }, a.speed );
        self.animate(direction , a.speed, a.easing );
      })
    }

    function addTitle(sectionName) {
      var tit = templates().title;
      tit.append(sectionName);
      return tit;
    }

    function addUrlToItem(item, url) {
      item.on('click', function(){
        window.location.href = url;
      })
    }

    function addPage(sub) {
      var page = templates().page;
      page.css( 'height', getDeviceSize().height );
      if(sub) page.css( getDirection(subOpenFrom) );
      // if(sub) page.css('left', getDeviceSize().width );

      self.append(page); // add page to DOM

      return page;
    }

    function animatePage(sub, page) {
      if(!sub) return;
      var a = settings.animation;
      var direction = getDirection(subOpenFrom, true);
      page.animate(direction, a.speed, a.easing);
    }

    function createBackButton(name, page) {
      var btn = templates().btn;

      btn.append('<span>' + name + '</span>');
      btn.on('click', function(e){
        closePage(page);
      });

      return btn;
    }

    function closePage(page){
      var a = settings.animation;
      var direction = getDirection(subOpenFrom);
      page.animate(direction, a.speed, a.easing, function() {
        page.remove();
      });
    }

    function closeButton(page) {
      var btn = templates().close;
      var a = settings.animation;
      var direction = getDirection(settings.mainOpenFrom);

      btn.on('click', function(e){

        btn.animate({ opacity: 0 }, a.speed*0.2, function(){
          btn.css('display', 'none');
        });
        self.animate(direction, a.speed, a.easing, function(){
          self.css('display', 'none');
          $(settings.opener).css('display', 'block');
          $(settings.opener).animate({ opacity: 1 }, a.speed );

          /* close all submenus when close */
          if (settings.closeAll) {
            for (var i = 1; i < subOpen; i++) {
              var findPages = $('.page').not($('.page').eq(0));
              closePage(findPages);
            }
          }
        });
      });
      closeAdded++;
      return btn;
    }

    function getDirection(set, opening){
      var direction = {};
      switch (set) {
        case 'top':
          direction = { top: opening ? 0 : getDeviceSize().height * -1 };
          break;
        case 'right':
          direction = { left: opening ? 0 : getDeviceSize().width * 2 }
          break;
        case 'left':
          direction = { left: opening ? 0 : getDeviceSize().width * -1 }
      }
      return direction;
    }

    function getDeviceSize() {
      return {
        height: $(document).height(),
        width: $(document).width()
      }
    }

    function templates() {
      var pageClass = settings.shadow ? 'page shadow' : 'page';
      return {
        page: $('<div class="'+ pageClass +'"></div>'),
        item: $('<div class="item"></div>'),
        btn: $('<div class="button back"></div>'),
        close: $('<div class="button close"></div>'),
        open: $('<div class="mobileMenuOpener"></div>'),
        line: $('<div class="line"></div>'),
        title: $('<div class="title"></div>')
      }
    }

  };

}(jQuery));

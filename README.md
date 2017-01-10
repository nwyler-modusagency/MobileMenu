# MobileMenu (MM)
**jQuery plugin to make a mobile menu as easy as drinking a glass of water.**

## Usage
  
###CSS: 
```
<link rel="stylesheet" href="css/styles.css">
```

###JS:

include:
```javascript
<script src="js/jquery.min.js"></script>
<script src="js/jquery.easing.1.3.js"></script>
<script src="js/mobileMenu.min.js"></script>
```
usage:
```javascript
$(fuction){
	$('#mobileMenu').mobileMenu( structure, options );
});
```
>
> Open **index.html** to run a working Demo.
>

----------
## Structure:
    {
		section:(*) {
			title: 'Compass',
			items: [
				{
					name: 'home',
					section:(*) {...}
				}
			]
		}
    }



 - Section: Object
	 - Title: String
	 - Items: Array
		- Item: Object
		  - name: String
		  - section ⇒ [ Is the same structure as its parent ]


----------

## Options:

    {
	    animation: {
		    speed: 200,
		    easing: 'easeOutSine'
	    },
	    closeAll: true,
	    openFrom: 'left',
	    shadow: true,
	    opener: '.mobileMenuOpener',
	    closeStatic: false
	}

 - Animation: Object
	 - speed: Number
	 - easing: String ( jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/ )
 - closeAll: Bool => [ close all the submenus when close ]
 - openFrom: String('left( * )', 'right') => ( * )default
 - shadow: Bool => [ Add shadow to section page ]
 - opener: String( jQuery.class or jQuery.id ) e.g. => $('#menu')
 - closeStatic: Bool [ it defines if the menu would have one static close or one for each section ]

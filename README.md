#App Template

Webapp template, using

- Grunt
- Compass/Sass

##Installation

1. Clone this repo
2. Run `npm install` in the root folder

##Usage

Currently there are two grunt tasks:

1. `grunt` - opens the site in a browser and auto-refreshes when a change is made to a CSS, JS, HTML or image file.
Also compiles SASS files - config set in /app/config.rb and Gruntfile. Stop the server with Ctrl+C
1. `grunt build` - concatenates and builds all js files in app/js but not in the vendor folder.
Also minifies all CSS (but doesn't concat all).

# Notes on CSS Modules

I was just experimenting with css modules. They work perfectly in Chrome. Just **@import** the modules into a single stylesheet and load the stylesheet the usual way.

Now let's try integrating Sass. I want each [whatever].module.css file to be compiled from a corresponging scss file. I installed node-sass and sass and used "node-sass -w sass -o styles/" which watches every file in the sass directory and generates a new corresponding css file in the styles directory, whenever a change is made in the sass directory. This worked.

I also installed eslint and prettier, both of which are working.

# Notes on Revisiting Build Tools

## Code Linting and Formatting

I reviewed both ESLint and Prettier. They're both complex topics, but I wanted to enough to be able to install and use these tools in editors that don't already include them or include something equivalent. 

## File Structure


## 

## CSS Modules

I was just experimenting with css modules. They work perfectly in Chrome. Just **@import** the modules into a single stylesheet and load the stylesheet the usual way.

Now let's try integrating Sass. I want each [whatever].module.css file to be compiled from a corresponding scss file. I installed node-sass and sass and used "node-sass -w sass -o styles/" which watches every file in the sass directory and generates a new corresponding css file in the styles directory, whenever a change is made in the sass directory. This worked.

I also installed eslint and prettier, both of which are working.

## Webpack

### Dynamic Code Splitting

You can use the **dependOn** approach, or the multiple entry approach (not recommended), but you can also dynamically load libraries as they are need. That's what we're doing here with Lodash. We load it only when we actually need it. This means that Lodash is separated out into its own chunk.

src/index.js

```js
async function getComponent() {
    // Create the div
    const element = document.createElement('div');
    // Wait for Lodash to be imported
    const { default: _ } = await import('lodash');
    // Once Lodash loads, assign the inner HTML
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    // Return the div with content
    return element;
}

// With the component, append it to the body
getComponent().then((component) => {
    document.body.appendChild(component);
});

```

In addition you can preload and prefetch modules. For example, on your homepage, you might want to prefetch a login modal that the use will need upon clicking "login".

```js
import(/* webpackPrefetch: true */ './path/to/LoginModal.js');
```

This results in a <link rel="prefetch" href="login-modal-chunk.js"> in the head of your page. There's lots of additional reading on this topic in the Webpack tutorial docs.

### Caching

There are some default recommendations for caching in production, but a real enterprise app would require fine tuning dozens of caching options.
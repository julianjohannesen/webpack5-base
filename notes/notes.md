# Notes on Revisiting Build Tools, React, and Gatsby

I'm approaching my review of front-end dev topics chronologically. For example, linting and formatting are covered first, because they're some of the first building blocks in a development environment.

## Settling on a Package Manager

When it comes to package managers in the Node ecosystem, Yarn seems to have continued to gain in popularity over the last few years. I noticed this when revisiting CRA. I could swear that CRA used to assume use of NPM, but it now assumes use of Yarn. That makes sense given that Yarn is developed by Facebook. (NPM is developed by GitHub, which is owned by Microsoft.)

When Yarn debuted in 2016, it was said to be:

- faster than NPM due to package caching and parallel install of packages
- more stable than NPM due to tighter binding of a project to the exact package versions specified in yarn.lock 
- more secure, because it does not allow packages to run code while being installed

However, Yarn and NPM are now comparable in speed, despite NPM continuing to install packages sequentially. And NPM has caught up in other ways as well. For example, since v5, package-lock.json has accomplished much the same thing that yarn.lock does. And since v6, NPM has run 'npm audit' during install to find vulnerabilities. Furthermore, both Yarn and NPM now feature workspaces and a way to run scripts remotely ('npx whatever' and 'yarn dlx whatever').

However, Yarn still has some unique features. Yarn uses an alternative installation strategy called Plug 'n Play (PnP) to:

- Start up faster
- Create more optimized dependency tree
- Install faster

It does this by creating a file at .yarn/.pnp.cjs that takes over the job of package resolution from Node

One thing to note is that Yarn does not include a built-in audit fix tool the way NPM does. There's no 'yarn audit fix'. There are packages that will handle that functionality, but you need to choose and install one. 

On the plus side, Yarn's 'why' command will tell you why a package is needed: it may be a dependency, a native module, or a project dependency.




## Code Linting and Formatting

I reviewed both ESLint and Prettier. They're both complex topics, involving configuration files and ignore files, but I wanted to learn enough about them to be able to install and use these tools alongside editors that don't already include them or include something equivalent. I haven't yet looked at Prettier's competitor Beautify or at StyleLint for correcting error in and formatting styles.

A couple of useful commands to repair errors in syntax and formatting:
```js
eslint --fix ./
prettier --write ./
```

## File Structure and Bundling

Any project is going to involve both a source folder and a production (or "public", or "build", or "dist") folder. Being able to use bundlers like Webpack, Parcel, and Rollup with various transformers like Babel, outside of any particular framework (CRA, Next, Gatsby, etc.) to transform and bundle your source into a production build is very useful.

There are details that I remain unclear on regarding best practices in placement of assets like images and fonts, and placement of styles relative to a bundler's entry point.

## JS in CSS, CSS Modules, and Sass

## Using CSS Modules in Webpack

I haven't been able to successfully combine using CSS modules in Webpack with the Sass -> PostCSS -> CSS Loader -> Style Loader pipeline. CSS modules work well in modern browsers. Just **@import** the modules into a single stylesheet and load the stylesheet the usual way. However, there's something about the config that I'm just missing when it comes to using modules in Webpack.

Ideally, I want each [whatever].module.css file to be compiled from a corresponding scss file. Outside of Webpack, I successfully installed node-sass and sass and used "node-sass -w sass -o styles/" to watch every file in the sass directory and generate a new corresponding css file in the styles directory, whenever a change is made in the sass directory, but I couldn't accomplish the same thing from within Webpack.

Note that node-sass is now deprecated. Sass now uses Dart and the Sass package includes a JS runtime.

## Webpack

I'm not clear on all of the differences between Webpack 4 and 5, but overall, it looks like the intent is to streamline some aspects of configuration. For example, you no longer have to install loaders to handle images and fonts. The loaders still appear in webpack.config.js, but they're now a part of Webpack.

### Webpack Config

Webpack recommends creating a common config and then a development and production config, into which you import the common config in order to merge it with dev or prod. However, that's not the approach that many users seem to take. It appears to be more common to use a single config file in which you detect the Node environment being used, and then conditionally load various loaders and plugins, etc.

### Dynamic Code Splitting

When dynamically splitting code, you can use the **dependOn** approach, or the multiple entry approach (not recommended), but you can also use Async/Await to dynamically load libraries as they are need. That's what we're doing here with Lodash. We load it only when we actually need it. This means that Lodash is separated out into its own chunk.

src/index.js

```js
async function getComponent() {
    // Create the div
    const element = document.createElement('div');
    // Wait for Lodash to be imported
    const { default: _ } = await import('lodash');
    // Once Lodash loads, assign the inner HTML
    element.innerHTML = _.join(['Hello', 'world!'], ' ');
    // Return the div with content
    return element;
}

// Append the component to the body
getComponent().then((component) => {
    document.body.appendChild(component);
});

```

In addition you can **preload** and **prefetch** modules. For example, on your homepage, you might want to prefetch a login modal that the use will need upon clicking "login".

```js
import(/* webpackPrefetch: true */ './path/to/LoginModal.js');
```

This results in a <link rel="prefetch" href="login-modal-chunk.js"> in the head of your page. There's lots of additional reading on this topic in the Webpack tutorial docs.

### Caching

There are some default recommendations for caching in production, but a real enterprise app would require fine tuning dozens of caching options.

## React
Don't forget that the children array is contained in the props object, so you need to deconstruct that props object when passing it as an argument to, e.g., a Layout component.
# Webpack 5 Base

## What is this?

A base configuration for Webpack 5.

## Plugins and loaders installed and configured

Plugins:
- html-webpack-plugin
- mini-css-extract-plugin
- webpack-bundle-analyzer

Loaders:
- babel-loader
    - @babel/plugin-transform-runtime
    - @babel/preset-env
    - @babel/runtime
- style-loader
- css-loader
- postcss-loader
    - autoprefixer
    - postcss-preset-env
- sass-loader

Others:
- webpack-dev-server
- webpack-merge

Note: Webpack 5 processes images and fonts without the need to install loaders. 
Note: Webpack 5 has Hot Module Replacement enabled by default and without the need to install a plugin.

## File Structure

## Optimizations
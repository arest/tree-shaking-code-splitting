# Webpack - Tree shaking and Code Splitting with React Router

This project demonstrates how to do 
- Tree shaking (removal of unused exports) with webpack 2 and Babel 6
- Code splitting loading async components through react router

Installation:

```
cd tree-shaking-code-splitting/
npm install
```

There are two ways in which you can build and run the web app:

* Build once:
    * `npm run build`
    * Open `index.html`
* Build for production (uglify):
    * `npm run deploy`
    * Open `index.html
* Watch files continuously, rebuild incrementally, whenever one of them changes:
    * `npm start`
    * Open `http://localhost:3000`


CREDITS
- https://github.com/rauschma/tree-shaking-demo
- https://github.com/echenley/react-router-huge-apps-refactor

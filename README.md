# pwa-experiments

This repository is about experimenting with best practices to build a [Progressive Web App](https://developers.google.com/web/progressive-web-apps/) (PWA).
The base app is build with [VueJS](https://vuejs.org) and [material-components-vue](https://github.com/matsp/material-components-vue).
This gives me a reactive and reponsive web app. Step by step I will try to accomblish a highscore within
[Lighthouse](https://developers.google.com/web/tools/lighthouse/) - an automated audit tool.
> It has audits for performance, accessibility, progressive web apps, and more.

My build process already implements some points of the [PRPL](https://developers.google.com/web/fundamentals/performance/prpl-pattern/)-Pattern.
For example code-splitting, async lazy-load chunks, minimizing... This results in quite good performance, but I'am just displaying one view.
So to have the right process for bigger apps I've to optimize the missed points of the audit.
If that is done I build on top of my small naive app and have a look at a more realworld app.

## Steps

The main goal should be optimising for a correct PWA, but performance goes hand-in-hand with it.
First I tested at my local computer but I switched to Github-Pages because of automatic compression and HTTPS connection.

### #1: Cache assets & network requests --> ServiceWorker

After installing [sw-precache-webpack-plugin](https://github.com/goldhand/sw-precache-webpack-plugin) and a basic configuration
Lighthouse give me the following:

- 55% (PWA)
- 92% (Performance)
- 100% (Accessibility)

### #2: Create a manifest.json --> PWA manifest

Creating a `manifest.json` results in a big impact for PWA score - there is just one point I won't fix to get 
the 100% (redirecting always to https is a serving configuration). The scores after step #2 are the following:

- 100% (PWA)
- 92% (Performance)
- 100% (Accessibility)

### #3: ...

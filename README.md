# Debate Bingo!
Bingo game for presidential & vice presidential debates

## Contributing
Feel free to fork, claim an issue (or create one), and submit pull requests :)

### Technology
Debate bingo is a simple mobile web app built with Node.js on the server and React on the client.

### Tools
#### Prerequisites
* [Node.js](https://nodejs.org)
* [Git](https://git-scm.com)

Fork the repo and work on your own copy.

To install the dependencies, run

    npm install


#### Run locally
To build and watch, run

    npm run dev

This will build the app using WebPack and run a local server at `http://localhost:3000` with a watch, so edits to JS and Sass files will trigger a rebuild.

#### Deploy

You need to be on a clone, not a fork, of the repo.

1. Run `npm run webpack-prod` to generate the app using WebPack
2. If there are any changes in the `/dist` dir (check with `git status`), commit and push them.
3. Run `npm run deploy` to push current contents of the `dist` dir to the `gh-pages` branch.

This will push the dist/ subtree to the gh-pages branch, which is linked to our
github pages instance, https://devprogress.us/debate-bingo/

It might take 15m or more for that page to update after you've pushed.

## Troubleshooting
Most problems can be solved by running ``npm install``. Make sure you're in the
base debate-bingo directory, not the src direcfory.

Check your node version with ``node -v``. If it's a 0.10 version, update using
instructions at https://nodejs.org/en/download/package-manager/

### People
* Jonathan Keslin (@JonathanKeslin) is the lead developer
* Michelle Keslin is the lead product manager
* Lizzy Ha is the main designer

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
* [Heroku CLI](https://cli.heroku.com/)

To install the dependencies, run

    npm install


#### Commands
To build and watch, run

    npm run dev

This will build the app using WebPack and run a local server at `http://localhost:3000` with a watch, so edits to JS and Sass files will trigger a rebuild.

To deploy:

1. Run `npm run webpack-prod` to generate the app using WebPack
2. If there are any changes in the `/dist` dir (check with `git status`), commit and push them.
3. Run `npm run deploy` to push current contents of the `dist` dir to the `gh-pages` branch.

### People
* Jonathan Keslin (@JonathanKeslin) is the lead developer
* Michelle Keslin is the lead product manager
* Lizzy Ha is the main designer

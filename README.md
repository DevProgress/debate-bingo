# Debate Bingo!
Bingo game for presidential & vice presidential debates

## Contributing
This project launched for the first 2016 Presidential debate. Lots of other organizations launched similar sites, so the team decided to put their efforts on other projects. If you revive the project, you might want to check out the closed issues with the WONTFIX tag; these were the next items on our list.

We leave you with this poem:

Here's the depot for some debate bingo <br />
It wasn't a popular thing-o <br />
But if you revive it <br />
And make it alive, it <br />
Will make the old team want to sing-o.

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

The development build will output into in the `dev` directory, which is explicitly git-ignored, so you can play with it as much as you want and not accidentally push the changes into production.

#### Deploy

The `docs` directory is [automatically deployed](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch) to Github Pages. To push the new build to production:

1. Run `npm run deploy` to generate the app using WebPack
2. Commit and push changes to `/docs` dir.

It might take 15m or more for that page to update after you've pushed.

## Troubleshooting
Most problems can be solved by running ``npm install``. Make sure you're in the
base debate-bingo directory, not the src directory.

Check your node version with ``node -v``. If it's a 0.10 version, update using
instructions at https://nodejs.org/en/download/package-manager/

### People
* Jonathan Keslin (@JonathanKeslin) is the lead developer
* Michelle Keslin is the lead product manager
* Lizzy Ha is the main designer

# generator-anex
> [Yeoman](http://yeoman.io) generator


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-anex from npm, run:

```bash
$ npm install -g generator-anex
```

Finally, initiate the generator:

```bash
$ yo anex
```

### About generator-anex

After you done above command, you can get a full constructed webapp project.

The client side is using angular.js.

The server side is using express.js.

And also, because we are using the connect-mongo as the session store, make sure open your mongo db before run the webapp.

### Command

grunt: run jshint, test, and build a pre-release app, under dist folder.

grunt test: test server and client side code, generate code coverage base on HTML.

grunt build: build a release version.

grunt serve: run app.

grunt serve:dist: run pre-release app.

## License

MIT

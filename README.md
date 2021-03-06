# NOTE: this is an abandoned experiment but the code remains here for reference/completeness
Not production ready or finished

# EventBriter: Events, Brighter

aka EventBrite without a service fee and with more HackGT love :heart:

## Developing EventBriter

This is a [Meteor](http://meteor.com) project. Meteor is a full-stack
web and mobile app solution based on [node.js](http://nodejs.org). It
is quite easy to get started (especially after doing the introduction
tutorial on the official Meteor site).

### Getting Started

 1. Install Meteor
 2. Clone from this git repo `git clone git@github.com:HackGT/EventBriter.git`
 3. ~~Set up the auth0 credentials in `.env` (see `.env_example` for format)~~
    Set the the auth0 credentials in `settings.json` (see `settings.json.example`)
 4. `cd eventbriter`
 5. `meteor --settings settings.json` to start meteor
 6. Navigate your browser to `http://localhost:3000`

The first run will be a bit slow to start because it is installing
all the packages and dependencies.

*Use and love the [official Meteor documentation](http://docs.meteor.com/#/full/quickstart)*

### Project Structure

As of the current writing (commit after 8717aff25), the project
looks like this:

```
├── client
│   └── eventbriter.js
├── eventbriter.css
├── eventbriter.html
├── events
│   ├── client
│   │   ├── event.html
│   │   ├── event.js
│   │   ├── event_listing.html
│   │   └── event_listing.js
│   ├── lib
│   │   ├── collections
│   │   │   └── events.js
│   │   ├── permissions.js
│   │   └── routes.js
│   └── server
│       └── publications.js
├── lib
│   ├── routes.js
│   └── user_info.js
├── payment
│   └── client
│       ├── payment.html
│       └── payment.js
└── server
    └── publications.js
```

See: http://docs.meteor.com/#/full/structuringyourapp for
more details. In particular we are using method 1 outlined in the
documentation (root level directories are feature/concept driven,
not client/server). Eventually the code should be refactored
into packages to further increase modularity.

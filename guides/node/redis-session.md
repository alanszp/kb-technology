# Store Sessions in Redis

## Managing the session without extra modules

Module: https://www.npmjs.org/package/redis-sessions

## Using Passport

Module: https://github.com/visionmedia/connect-redis

Example: https://github.com/andybiar/express-passport-redis-template

```
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

app.use(session({ store: new RedisStore(options), secret: 'keyboard cat' }))
```

Access to property 'user' in session

```
req.session.passport.user
```

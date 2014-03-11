- [Install NVM](https://github.com/creationix/nvm) ( Simple bash script to manage multiple active node.js versions )
- [Install Karma](http://karma-runner.github.io/0.8/intro/installation.html) ( Test runner for javascript )

## Readings & Videos

[Capitulos 1 a 9 de Javascript the definitive guide](https://calibre.zauberlabs.com/calibre/browse/search?query=javascript+definitive+guide)

[JSTherightway](http://jstherightway.org/#patterns) ( Module, Singleton, Observer, MV* )

[Function expressions vs. functions declaration](http://kangax.github.io/nfe/)

[Bowling Kata with Mocha](http://vimeo.com/53048454)

[Promises won't hurt](http://nodeschool.io/#promiseitwonthurt)

[You're missing the point on promises](https://gist.github.com/domenic/3889970)

[Promises Antipatterns](http://taoofcode.net/promise-anti-patterns/?utm_source=javascriptweekly&utm_medium=email)




## Excercises

- All excercises must be resolved following the TDD approach using mocha and karma.

### Kata Bowling
 
The game consists of 10 frames as shown above.  In each frame the player has
two opportunities to knock down 10 pins.  The score for the frame is the total
number of pins knocked down, plus bonuses for strikes and spares.

A spare is when the player knocks down all 10 pins in two tries.  The bonus for
that frame is the number of pins knocked down by the next roll.  So in frame 3
above, the score is 10 (the total number knocked down) plus a bonus of 5 (the
number of pins knocked down on the next roll.)

A strike is when the player knocks down all 10 pins on his first try.  The bonus
for that frame is the value of the next two balls rolled.

In the tenth frame a player who rolls a spare or strike is allowed to roll the extra
balls to complete the frame.  However no more than three balls can be rolled in
tenth frame.

### Kata design patterns

We're going to implement 3 simple patterns in Javascript

- Singleton pattern ( we must achieve   Singleton.getInstance() === Singleton.getInstace() )
- Observer pattern ( we must be able to notify another objects without coupling, and support mutiple events )
- Mixin pattern ( we must implement our observer pattern as a mixin ) 
- Module pattern ( separate our code in modules )

Basic NODE API structure

config         // configuration de la aplicacion ( usamos config module por eso en el root)

server
  routes       // binding de rutas con controllers
  controllers  
  models
  services
  helpers
  workers      // sirve separar los workers?

test
  routes
  controllers
  models
  services
  helpers
  workers
  
package.json  
gulpfile.js
.jshintrc


Tareas
 - test
 - deploy
   - bump
   - tag

Otros
 - travis ( si se puede )
 - linter

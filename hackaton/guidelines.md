```
Basic NODE API structure

config         // configuration de la aplicacion ( usamos config module por eso en el root)

server
  routes       // binding de rutas con controllers
  controllers  
  models
  services
  helpers
  workers      // sirve separar los workers?
  .jshintrc

test
  routes
  controllers
  models
  services
  helpers
  workers
  .jshintrc
  
package.json  
gulpfile.js



Tareas obligatorias
 - test
 - deploy
   - linter
   - bump
   - tag


Otros
 - travis ( solo se aceptan no tenerlo en ciertas situaciones excepcionales )
 ```

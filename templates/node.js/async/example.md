# Async Example
### Perform an operation AFTER ALL preconditions are successfully done, in secuential order
#### Callback way
```javascript
  var processor;
  processor.preconditionOperation(function(err, one) {
    if (error) throw error;
    processor.preconditionOperation2(function(err, two) {
      if (error) throw error;
      processor.preconditionOperation3(function(err, three) {
      if (error) throw error;
        console.log(one, two, three);
      });
    });
  });
```
#### AsyncJs equivalent
```javascript
  async.series([
    processor.preconditionOperation,
    processor.preconditionOperation2,
    processor.preconditionOperation3],function(error, result){
      if (error) throw error;
      console.log(result);
    });
```
> This is super powerfull for deep nesting code

### Perform an operation AFTER ALL preconditions are successfully done in parallel
#### Callback way
(?)
####AsyncJS way
```javascript
async.parallel([
  processor.preconditionOperation,
  processor.preconditionOperation2,
  processor.preconditionOperation3],function(error, result){
    if (error) throw error;
    console.log(result);
  });
```

### Perform an operation that requires a custom argument

```javascript
  processor.preconditionOperation("a", function(err) {
    if (err) return operationOnceAllFinished(err);
    processor.preconditionOperation2("b", function(err) {
      if (err) return operationOnceAllFinished(err);
      processor.preconditionOperation3("c", function(err) {
      if (err) return operationOnceAllFinished(err);
        operationOnceAllFinished(null);
      });
    });
  });
```

```javascript
  async.series([
    async.apply(processor.preconditionOperation, "a"),
    async.apply(processor.preconditionOperation2, "b"),
    async.apply(processor.preconditionOperation3, "c")], operationOnceAllFinished);
```

```javascript
  async.parallel([
    async.apply(processor.preconditionOperation, "a"),
    async.apply(processor.preconditionOperation2, "b"),
    async.apply(processor.preconditionOperation3, "c")], operationOnceAllFinished);
```

### Run code having at max n concurrent tasks and queueing the rest
>   This is good for keeping under control the resources which cant be overflowed (Such as cpus, connnections, etc)

```javascript
  var q = async.queue(function(task, releaser) {
    processor.process(task.name);
    releaser();
  }, 2);

  q.push({name : "DO SOMETHING"});

  q.push({name : "DO SOMETHING AND THEN PERFORM CALLBACK"}, function(err){
    console.log("DONE");
  });
```

### I want to keep checking for something async to be true. see doWhilst and whilst

```javascript
  //This will keep checking the condition (2nd function) and until it returns false,
  //it will keep executing the body (first function).
  //On error or finished loop, it will call the callback (3rd function)
  var done = false;
  async.doWhilst(_.bind(function (callback) {
    process.isReady(function (err, result) {
      if (err) return callback(err);
      done = result;
      if (done)  {
        console.log("PERFORM OPERATION")
      }
      setTimeout(callback, millisToWait);
    });
  }, this),function(){ return !done; }, function(err){
    console.log("Out of do while");
  });

```
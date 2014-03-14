

var processor;

/****************************************************************************************
  I want to perform an operation AFTER ALL preconditions are successfully done, executing one at the time
****************************************************************************************/

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

/**
  Async js equivalent
  This is super powerfull for deep nesting code
**/

async.series([
  processor.preconditionOperation,
  processor.preconditionOperation2,
  processor.preconditionOperation3],function(error, result){
    if (error) throw error;
    console.log(result);
  });

/****************************************************************************************
  I want to perform an operation AFTER ALL preconditions are successfully done in parallel
****************************************************************************************/
async.parallel([
  processor.preconditionOperation,
  processor.preconditionOperation2,
  processor.preconditionOperation3],function(error, result){
    if (error) throw error;
    console.log(result);
  });


/****************************************************************************************
  I want to do the same, creating a function which requires a custom argument
****************************************************************************************/

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

async.series([
  async.apply(processor.preconditionOperation, "a"),
  async.apply(processor.preconditionOperation2, "b"),
  async.apply(processor.preconditionOperation3, "c")], operationOnceAllFinished);

async.parallel([
  async.apply(processor.preconditionOperation, "a"),
  async.apply(processor.preconditionOperation2, "b"),
  async.apply(processor.preconditionOperation3, "c")], operationOnceAllFinished);


/****************************************************************************************
  I want to run some code at max having n parallelism and queueing pending to process.
  This is good for keeping under control the resources which cant be overflowed (Such as cpus, connnections, etc)
****************************************************************************************/

var q = async.queue(function(task, releaser) {
  processor.process(task.name);
  releaser();
}, 2);

q.push({name : "DO SOMETHING"});

q.push({name : "DO SOMETHING AND THEN PERFORM CALLBACK"}, function(err){
  console.log("DONE");
});

/****************************************************************************************
  I want to keep checking for something async to be true. see doWhilst and whilst
****************************************************************************************/

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

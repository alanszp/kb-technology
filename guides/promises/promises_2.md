# Promises 2
We will try to evince some other advantages of using promises:

	4. Promises **chains**.

## Example
Application login.
Encrypt user's password before saving it.
## Base Code
```javascript
	var login = function(req, res) {
    User.findOne({ email: req.body.email }, function(user){
			if(checkUserExists()) {
				/* checkPassword has to do some cpu heavy tasks comparing the password 
with the encrypted version, so it is async */
				checkPassword(function success() {
					return addUserToSession()
				}, function fail() {
					return respondWithAuthError()
				})
			} else {
				return respondWithAuthError()
			}
		}, function fail() {
			return respondWithServerError()
		})
  }
```
## (4) Cleaning the code with promises chains 
```javascript
	var login = function(req, res) {
    User.findOne({ email: req.body.email })
			.fail(respondWithServerError)
      .then(checkUserExists)
      .then(checkPassword)
      .then(addUserToSession)
      .then(respondWithUser)
      .fail(respondWithAuthError)
      .done()
  }
```
## Nodemailer

[nodemailer](https://github.com/andris9/Nodemailer)

``` npm install nodemailer ```

### Overview

Nodemailer is a very easy to use module for mail sending on nodejs.

Features summary:
* Unicode to use any characters
* HTML content as well as plain text alternative
* Attachments (including attachment streaming for sending larger files)
* Embedded images in HTML
* SSL/STARTTLS for secure e-mail delivery
* Different transport methods - SMTP, sendmail, Amazon SES or directly to recipients MX server or even a custom method
* SMTP Connection pool and connection reuse for rapid delivery
* Preconfigured services for using SMTP with Gmail, Hotmail etc.
* Use objects as header values for SendGrid SMTP API
* XOAUTH2 authentication and token generation support - useful with Gmail
* DKIM signing

Further detailed information can be found [here](http://www.nodemailer.com/docs/index)

### Might be useful for

* Any case that involves mail sending

### Full example

```javascript
//first we require nodemailer
var nodemailer = require('nodemailer');
    
//second we create reusable transport method (opens pool of SMTP connections)
//as described above, the transport allow the use of multiple methods, as is SMTP, SES for amazon, sendmail or custom
//it also allows the type Pickup which stores the mail in the machine (great for debug)
var smtpTransport = nodemailer.createTransport("SMTP",{
    //nodemailer offers several preconfigured smtp services, you can see the complete list here http://www.nodemailer.com/docs/smtp
    service: "Gmail",
    auth: {
        user: "gmail.user@gmail.com",
        pass: "userpass"
    },
    maxConnections: 5, //max active connections, defaults to 5
    maxMessages: 20, //limit the amount of messages per connection, no limit by default
    debug: true, //output client and server messages to console
    ignoreTLS: false, //defaults to false
    name: "super-server" //the name of the client server, default to machine name
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: "Fred Foo ✔ <foo@blurdybloop.com>", // sender address
    to: "bar@blurdybloop.com, baz@blurdybloop.com", // list of receivers
    subject: "Hello ✔", // Subject line
    //you may choose text or html
    text: "Hello world ✔", // plaintext body
    html: "<b>Hello world ✔</b>" // html body
}

// send mail with defined transport object
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
});
```

### Retries

Nodemailer doesn't manage retries by it's own, as you can see above it runs a callback with the specific error.

In order to retry, we need to add some basic retry logic. If possible, it should run on a different process in an asynchronous matter. Using redis/rabbitmq/etc to queue the emails.
This way we can stop the email sending process whenever we want and avoid mail processing on our nodejs server.

### Gotchas
* When using AWS preconfigured service, the smtp host is [hardcoded to us-east](https://github.com/andris9/Nodemailer/blob/master/lib/wellknown.js#L46). Would be better to change it when other region is being use.
* At the moment, there is an [important issue](https://github.com/andris9/Nodemailer/issues/265) while re-using the transport object.
* The Gmail transport currently fails after being idle for some time (1h according to the user's reports).

#Node Security

## Cross-site scripting - XSS

XSS is a type of computer security vulnerability typically found in Web applications.
XSS enables attackers to inject client-side script into Web pages viewed by other users.
A cross-site scripting vulnerability may be used by attackers to bypass access controls

#### Server-side versus DOM-based vulnerabilities
Historically XSS was first found in applications that performed all data processing on the server side. User input would be sent to the server, and then sent back to the user as a web page. The need for an improved user experience resulted in popularity of applications that had a majority of the presentation logic (maybe written in JavaScript) working on the client-side that pulled data, on-demand, from the server using AJAX.

An example of DOM-based XSS is the bug found in 2011 in a number of JQuery plugins. Prevention of DOM-based XSS includes very similar measures to traditional XSS, just implemented in JavaScript code and sent in web pages — input validation and escaping. 

An XSS attack can be persistent or non-persistent. You can see some quick examples [here](http://en.wikipedia.org/wiki/Cross-site_scripting#Exploit_examples)

[Here](http://xsser.sf.net/) is a tool to detect XSS vulnerabilities

**IMPORTANT**: Some JavaScript frameworks have built-in countermeasures against this and other types of attack — for example **Angular.js**.

##Cross-site request forgery
Cross-site request forgery is a type of malicious exploit of a website whereby unauthorized commands are transmitted from a user that the website trusts. Unlike cross-site scripting (XSS), which exploits the trust a user has for a particular site, CSRF exploits the trust that a site has in a user's browser.

[Here](http://en.wikipedia.org/wiki/Cross-site_request_forgery#Example_and_characteristics) we can see quick example to view this exploit in action.

If you are developing Single Page Applications, [this](http://www.mircozeiss.com/using-csrf-with-express-and-angular/) guide could be useful to handle this security concern.

#### How can we protect our node server?

For web applications that are not SPA, there is an specific module available in **npm**, developed by the paypal team as part of the open source framework **kraken.js**, called **lusca**. This module enable by default various security configurations, including **csrf** and **xss**, within others. 

This module is used as a middlewere for express applications. It's quite easy, you can read more [here](https://github.com/krakenjs/lusca)


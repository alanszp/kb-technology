#Node Security

## Cross-site scripting - XSS

XSS is a type of computer security vulnerability typically found in Web applications.
XSS enables attackers to inject client-side script into Web pages viewed by other users.
A cross-site scripting vulnerability may be used by attackers to bypass access controls

#### Server-side versus DOM-based vulnerabilities
Historically XSS was first found in applications that performed all data processing on the server side. User input would be sent to the server, and then sent back to the user as a web page. The need for an improved user experience resulted in popularity of applications that had a majority of the presentation logic (maybe written in JavaScript) working on the client-side that pulled data, on-demand, from the server using AJAX.

An example of DOM-based XSS is the bug found in 2011 in a number of JQuery plugins. Prevention of DOM-based XSS includes very similar measures to traditional XSS, just implemented in JavaScript code and sent in web pages — input validation and escaping. Some JavaScript frameworks have built-in countermeasures against this and other types of attack — for example **Angular.js**.

**Note:** [XSSer: automatic "framework" to detect, exploit and report XSS vulnerabilities](http://xsser.sf.net/)

##Cross-site request forgery
Cross-site request forgery is a type of malicious exploit of a website whereby unauthorized commands are transmitted from a user that the website trusts. Unlike cross-site scripting (XSS), which exploits the trust a user has for a particular site, CSRF exploits the trust that a site has in a user's browser.

#### Severity
The most dangerous CSRF vulnerability ranks as the 909th most dangerous software bug ever found. Other severity metrics have been issued for CSRF vulnerabilities that result in remote code execution with root privileges as well as a vulnerability that can compromise a root certificate, which will completely undermine a public key infrastructure.

#### Forging login requests
An attacker may forge a request to log the victim into a target website using the attacker's credentials; this is known as login CSRF. Login CSRF makes various novel attacks possible; for instance, an attacker can later log into the site with his legitimate credentials and view private information like activity history that has been saved in the account. The attack has been demonstrated against YouTube.

**Note:** [Using CSRF protection with Express and AngularJS](http://www.mircozeiss.com/using-csrf-with-express-and-angular/)

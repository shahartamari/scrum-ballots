# SCRUM Ballot Application

This React App + Node.js app combines a few development concepts into a voting application for a SCRUM sprint planning sessions. If you have no experience  you should read [Understanindg SCRUM Sprint](https://www.scrum.org/resources/what-is-a-sprint-in-scrum).  The voting application enalbes team members to vote on backlog items.  A sprint planning session is moderated by a SCRUM Master. Team members vote on the "size" of each item, where 1 represents "tiny", 21 is too-large-to-fit, and anything in between is represented by the other numbers.

The Sprint session starts when a SCRUM master initiates a session (after logging in) and projects it on a screen or online.   Team members join the session by typing the session number on their phone or laptop.  When the SCRUM master clicks the "START VOTING" button, members screen change to a dial panel.  once they vote their selection - the screen changes to show their vote as well as tabulation of vote results.
SCRUM master ends voting by clicking on "End Voting" button. Voting cycles continue until the SCRUM Master ends the session.

# Usage

To use this application you will need to register it with your Azure Active Directory.  This registration is required to allow users to authenticate via Azure and access Azure API.  If you have never done this before, then follow the instructions [here](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-integrating-applications).  You need [[to be]] an Azure administrator to create a new application, but once you are an owner of the registered application you can proceed to modify it at will. 
You need to give your application permission to `Azure Graph API`.  Assign delegated permissions for `Read-only access to Employee records` and `Access Azure Graph`.   Once the application is registered, note the Application (Client) ID. Create a Key (Secret) and write it down as well.  Also, you need to add the following to the Reply URLs blade:
* `http://localhost:3000` 
* `http://localhost:5000/auth/openid/return` 
* `https://login.microsoft.com`

Create a new file, `dev.js` under `config` directory in your application and copy the following code into it.  Replace tenant information with data that you collected during your application registration process.

```
module.exports = {
  identityMetadata:
    "https://login.microsoftonline.com/<tenant_name>/.well-known/openid-configuration",
  // or equivalently: 'https://login.microsoftonline.com/<tenant_guid>/.well-known/openid-configuration'
  //
  // or you can use the common endpoint
  // 'https://login.microsoftonline.com/common/.well-known/openid-configuration'
  // To use the common endpoint, you have to either set `validateIssuer` to false, or provide the `issuer` value.
  tenant: "<tenant_guid>",
  // Required, the client ID of your app in AAD
  clientID: "<Application_ID>",

  // Required, must be 'code', 'code id_token', 'id_token code' or 'id_token'
  responseType: "code id_token",

  // Required
  responseMode: "form_post",

  url : 'http://localhost:3000',

  // Required if we use http for redirectUrl
  allowHttpForRedirectUrl: true,

  // Required if `responseType` is 'code', 'id_token code' or 'code id_token'.
  // If app key contains '\', replace it with '\\'.
  clientSecret: "<Your key value>"
};

```
For production deployment, you should set the environment variables listed in the `config/prod.js` file.

### Start the application

With Azure regiratration done, type 
    `npm run dev` 
to start both client and server instances of the application.   In the browser log in to create a new session as a Scrum Master.  Start a version of a different browser to join the session as a team member.

## About The Code

Code hosted on GitHub under MIT license

The application demonstrates a set of technologies for working with React in a corporate environment.  Some of these patterns are well established while others are rapidly changing and do not have many samples available today.

### React + Redux

This application makes use of React with a Redux store as the front-end of the application utilitizing.  While React is evolving fast the patters for developing React are quite solid with great information, sample applications, and courses widely avaialbe.  Specifically we make use of
* React - for front-end presention
* React router - for moving between components
* Redux - for storing state throughout the appolication
* Redux Thunk - for async redux actions
* Redux Persist - for maintaing state through browser refreshes
* Materialize CSS - for quickly styling elements and pages

### Socket IO

Socket IO is used for real-time communication between the SCRUM Master and team members to allow them to interact during voting sessions.  Socket IO packages include
* `socket.io` package on the Node server, and
* `socket.io-client` package running on the 'client' portion with React
The messages are sent inside a Socket IO room and allow multiple sessions to run at the same time.

### NODE js

The server portion of the application is running on Node.js.  It includes an Express server to host the Socket IO and authentication portion of the application as well as a protected API

### Azure Open ID authencation

No corporate application can work without authentication.  While at best tangentical for this particular application, I added this Azure authentication as a lock down feature and a way to retrieve corporate data.
I use the [Azure Passport Library](https://github.com/AzureAD/passport-azure-ad/).  You can find the application registration process and usage notes in the link above.  These are necessary in order to successfully use the library.

### axios and Request

I make use of both these `axios.js` and `request-promise-native` to make async http calls. One of the two is probably enough.

### Charts and HTML 5 Canvass

I was looking for a charting package and could not find one to satisfy my very simple scenario of drawing voting results in a column presentation in a straight-forwards inside React. I'm sure that there are such a packages or combination of packages to do that, but I had fun writing the `barChart` React comonent myself to draw that simple chart on a canvass.


## Acknowledgements

I want to give a shout out to Stephen Girder and his excellent Fullstack Web Development course on Udemy, [Node with React: Fullstack Web Development](https://www.udemy.com/node-with-react-fullstack-web-development/learn/v4/overview).  The structure of this project and a lot of the React + Node techniques are closely following the material in that course.  If you are new to modern web development or want to understand how (and mostly why) this project is structured as it is, I encourage you to take that course.
I also want to thank anyone who ever shared an advice, code fragment, or a coding technique on the web.  I read and follow your advice often.  So, thank you! 

# About the Author

Shahar Tamari is a solution architect working mostly on Microsoft technologies in corporate environment with too many years experience to admit all of them.  
If you like this code and feel particularly generous you click below to show your gratitude

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/ShaharTamari)
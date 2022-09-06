# SimpleHealthTracker
A web app that is useful for daily logging of blood pressure, glucose, weight and meal information to send directly to your email. No information is stored as the user fills a form that is directly sent via SMTP. Users can then choose to extract the data from their emails at a later time.

# Technologies
This web application runs on Node.js + Express and was originally developed in 2020 using the package versions available at that time. See "Additional Notes"
* [Node.js](https://nodejs.org/en/) for app server.
* [Express](https://expressjs.com/) middleware to connect API routes to Node.js server.
* [Nodemailer](https://nodemailer.com/about/) for SMTP based emails using auth setup from [/config.js](/config.js) file.
* [Bootstrap](https://getbootstrap.com/) for UI theme & custom CSS.
* HTML & JavaScript for a simple single page app with forms using Bootstrap theme.

# How To
## Install
Clone the repo and at the root folder run
```
npm install
```

## SMTP Setup
This [note](https://stackoverflow.com/a/19879741) from StackOverflow tells you how to securely setup SMTP for Nodemailer.
> You should use an [XOAuth2](https://developers.google.com/gmail/imap/xoauth2-protocol) token to connect to Gmail. 
You'll need to go to the [Google Cloud Console](https://console.cloud.google.com/getting-started) to register your app. Then you need to retrieve access tokens for the accounts you wish to use.

More info here https://nodemailer.com/smtp/oauth2/

For keeping things simple (less secure though!), this example uses Gmail basic auth as of now.

## Run App
Run from command line to start Node.js server
```
node start
```
## Use 
Fill in the UI form fields and click "Email Me!" to send the results in a formatted HTML email that is input by the user.

# Demo
## Live
This app has been hosted at https://simplehealthtracker.nvarma.com/.

## Preview
![Screenshot of app](/SimpleHealthTracker_Preview.png)

# Additonal Notes
This was a project for a simple tool to track daily or weekly updates meant for personal record keeping. The traditional ways to do this are via your own devices, excel spreadsheets or via good ol' fashioned pen and paper. This single page app does not track any data within it, it merely passed on the entry you make via email. You can then filter the emails by sender and extract data out of it if needed. 

### Security Warning
This project currently uses SMTP via basic auth with plans to switch to OAuth2 once I have time to update the logic. 
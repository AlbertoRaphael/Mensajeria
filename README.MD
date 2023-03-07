## _Birdperson_

Birdperson is a microservice that allows send emails.

## Installation

- You need [Node.js](https://nodejs.org/) to run it
- (For now) Must create "mailApi" database
- Clone the repository somewhere then create an ` .env` file:

```sh
DB_USER=user
DB_PASSWORD=XXX
DB_HOST=hostname
DB_DEPLOY=url
PORT=3000

MAIL_HOST=email-smtp.us-east-1.amazonaws.com
MAIL_PORT=2525
MAIL_USER=user
MAIL_PASSWORD=XXX
```

Install the dependencies:

```sh
npm i
```

Run locally:

```sh
npm start
```

## API

The data payload can be JSON or URL-encoded (x-www-form-urlencoded).

- `to` - receiver name and/or mail ` "Name, User <baz@example.com"`
- `from` - sender name and/or mail `"asd@example.com"`
- `subject` - subject of the mail
- `html` - body content `"<html><h1>this is a msg test</h1></html>"`
- ` attachments` - attachments of the mail on base64 string[]


##### Whatsapp

Agregar al .env estas variables


```sh
TWILIO_ACCOUNT_SID =xxxxxxxxxxxxxxxxx
TWILIO_TOKEN =xxxxxxxxxxxxxxxxxxxx
```

allows to send messages and images and video through twilio for whatsapp service

- `to` - receiver cell phone number ` "cell phone number"`
- `from` - sender cell phone number `"twilio number"`
- `body` - body content `"<h1>this is a msg test</h1>"`
- ` media` - attachments of the mail on base64 string[]
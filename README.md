User Authentication baackend

SDT used 
*Node js
*Express js
*Cloud Servive (MongoDB),Mongoose
created an express application and installed required packeges
Mainted folder structure and created folders routes, models, comtroller and common

Routes Component:
* Requests are routes to specified function for better understanding and clean code
* Request from user components routs to Comtroller component

controller Component:
* Handles all the request of Get, Create, edit, delete and Login
* in login function the email is verified and token is generated

Model component:
* It provides an validation data that we are posting in oru DB
* This enables us in preventing unwanted data entering our DB

env file:
*Preventing exposure of confidential datas
*containing DB name, DB URL, Secret key, salt rounds and JTW-Exp time

Functionalities:
*Password Hassing using hash salt of 10rounds
*Token generation and sending encrypted data  using JSON web Token
* Enabled token expiration 
*validating users and providing access and prevent duplicate datas
* Inserting middlewares in between reques for better enabled security


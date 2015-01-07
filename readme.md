## Overview
Inventory is a single page web appliation created for keeping track of inventory at a school computer lab. The appliation is very javascript heavy, and uses backbone.js as the underlying client side framework. For the server side, the application uses slim php, which is a very small php framework that is used primarily as an API for the client side.

It should be known that this project is one of the very first web applications I ever wrote. The team I was with was very new to web technologies, and because of that, there are a lot of things that are not done very well, or correct at all. This project although functional was quite the trial by fire.

A demo of this application can be seen at the following [Link](http://barnesbrothers.homeserver.com/inventory). The application is wired up to an actual database, and although I don't mind you playing around to see how the application functions, please don't be a troll. Otherwise I will be forced to remove the database component and alter the behavior of the application to something different than what the code reflects.

## Technologies
### Slim PHP
Slim PHP is the framework used to do the server side communication to the database. There is a router that listens for routes, and maps them to functions. The functions then do the database operations and returns JSON that the client side uses to update the application.

### Backbone.js
Backbone is a popular client side JS framework that adds some basic MVC structure to appications. The dependencies for Backbone are: jQuery, and Underscore.js. All 3 files are required for the client side. All 3 files should be loaded with a CDN, but currently may not be???
  1. [backbone.js](http://backbonejs.org)
  2. [underscore.js](http://underscorejs.org)
  3. [jQuery.js](http://jquery.com)

## System Overview
### Login

The application does not use any particular framework to do the auth. The team I worked on this with decided we should roll our own, and it is not that great. If I had to fix one thing on this project, it would be the auth. Passwords are encrypted using a jquery md5 hasher, but knowing wheather a user is logged in or not is kind of wonkey.

### Sections

There are 8 main sections in the inventory app. They are Current Inventory, View Orders, Place Order, Add Item, View log, View Users, Add User, and Log Out. Current Inventory is the main page when entering the app. The other sections are accessed by the menu created by clickin the gear icon in the top right corner of the page.

#### Current Inventory

The current inventory screen shows all of the items that the CAE Center is tracking, and the assoicated quantities of each item. Next to the quantity there are increment and decrement buttons. Clicking them changes the quantity in the textbox next to the buttons. After the adjustments have been entered into the textboxes, the changes can be applied by clicking the Apply Adjustments button on the bottom of the screen. Single clicking on a row of an item will display details about the item in the left pane of the application. From here the item can be edited. Once edits are done, the item can be saved or deleted.

#### View Orders

The view orders page allows a user to see all of the orders that have ever been placed. It shows which vendor the order was for, and if it is open or not, as well as the number of items that were ordered. Single clicking the row of information for the order will display the details of the order, as well as a list of what was ordered. If the order is an open order, the detail view will give an option to accept the order. Accepting the order will close out the order and automatically update the quantities for the items in the order to current quantites plus the ordered amount.

#### Place Order

The place orders page shows the exact same information as the current inventory tab, however in place of the quanitity spot is a textbox that can be filled out to place an order. When the fields are filled out, and the submit order button is clicked, the system will create a new order for each vendor that items are being ordered from. The system does not currenlty send the order somewhere. It simply creates the order in the system. Future plans are to either have the order emailed to an account, or integrate it with some other ordering system. Once an order is submitted, the system will then switch tabs to the view orders tab so that the user can see the newly created orders.

#### Add Item

If a new item needs to be added to the system, the user can click the add new option in the gear icon menu. This will open a different but similar details pane that will allow the user to fill out the appropriate information. Once filled out the user can click save to add the new item to the inventory listing.

#### View Log

The view log page shows all of the transactions that have occurred during the use of the system. It sorts the log in reverse chronological order with the most recent transactions at the top.

#### View Users

Shows a list of the users that have access to the system. Single clicking on a user brings up detailed information about the user in the details pane. It is not possible to delete the currently logged in user. Logged in users can change thier own password by clicking the change password button in the details pane. There is currently no way for someone to reset a password. The fastest way would be to delete the user and remake them. 

#### Add User

Adding a new user can be accomplished by clicking the add new user option in the gear menu. Fill out the information for the new user, and click save.

#### Log Out

Clicking the logout menu option logs the user out of the system.

## Installation

To install this application you can folllow the following instructions:
  1. Clone or download the repository.
  2. Make sure that the web root for your domain points to the src folder of the project.
  3. Create the database that will be used for the application by restoring the database from the .sql file in the root of this project.
  4. Edit index.php in api/ and provide the database name and connection parameters into the getConnection function located at the bottom of the file.
  5. If all went well, you should be done.

## Database Information
### Database Name
By default the name of the database is: 

InvControl

This can easily be changed if needed in the index.php file located under the api/ directory.

### Tables

#### Category

| Field               | Type             | Null | Key | Default             | Extra        |
|---------------------|------------------|------|-----|---------------------|--------------|
| id                  | int(2)           | NO   |PRI  | NULL                |auto_increment|
| name                | varchar(15)     | NO   |     | NULL                |              |
| consumable          | tinyint(1)          | NO   |     | NULL                |              |

#### ItemType

| Field               | Type             | Null | Key | Default             | Extra          |
|---------------------|------------------|------|-----|---------------------|----------------|
| id                  | int(4)           | NO   | PRI | NULL                | auto_increment |
| name                | varchar(15)      | NO   |     | NULL                |                |
| description         | varchar(55)      | NO   |     | NULL                |                |
| quantity            | int(3)           | NO   |     | NULL                |                |
| categoryId          | int(2)           | NO   | MUL | 1                   |                |
| vendorId            | int(11)          | NO   | MUL | NULL                |                |
| emailThreshold      | int(11)          | YES  |     | NULL                |                |
| itemUrl             | varchar(150)     | YES  |     | NULL                |                |
| onOrderQuantity     | int(3)           | YES  |     | NULL                |                |
| created_at          | datetime         | YES  |     | NULL                |                |
| updated_at          | datetime         | YES  |     | NULL                |                |

#### Order_Item

| Field               | Type             | Null | Key | Default             | Extra          |
|---------------------|------------------|------|-----|---------------------|----------------|
| id                  | int(8)           | NO   | PRI | NULL                | auto_increment |
| orderId             | int(6)           | NO   | MUL | NULL                |                |
| itemId              | int(4)           | NO   | MUL | NULL                |                |
| orderQty            | int(3)           | NO   |     | NULL                |                |
| created_at          | datetime         | YES  |     | NULL                |                |
| updated_at          | datetime         | YES  |     | NULL                |                |

#### Orders

| Field               | Type             | Null | Key | Default             | Extra          |
|---------------------|------------------|------|-----|---------------------|----------------|
| id                  | int(6)           | NO   | PRI | NULL                | auto_increment |
| orderDate           | datetime         | NO   |     | NULL                |                |
| status              | tinyint(1)       | NO   |     | NULL                |                |
| created_at          | datetime         | YES  |     | NULL                |                |
| updated_at          | datetime         | YES  |     | NULL                |                |

#### TransactionLog

| Field               | Type             | Null | Key | Default             | Extra          |
|---------------------|------------------|------|-----|---------------------|----------------|
| id                  | int(6)           | NO   | PRI | NULL                | auto_increment |
| username            | varchar(50)      | YES  |     | NULL                |                |
| itemname            | varchar(25)      | YES  |     | NULL                |                |
| action              | varchar(25)      | NO   |     | NULL                |                |
| logDate             | datetime         | YES  |     | NULL                |                |

#### Users

| Field               | Type             | Null | Key | Default             | Extra          |
|---------------------|------------------|------|-----|---------------------|----------------|
| id                  | int(4)           | NO   | PRI | NULL                | auto_increment |
| username            | varchar(20)      | NO   | UNI | NULL                |                |
| password            | varchar(32)      | YES  |     | NULL                |                |
| email               | varchar(40)      | YES  |     | NULL                |                |
| roleId              | int(1)           | YES  |     | NULL                |                |

#### Vendor

| Field               | Type             | Null | Key | Default             | Extra          |
|---------------------|------------------|------|-----|---------------------|----------------|
| id                  | int(2)           | NO   | PRI | NULL                | auto_increment |
| name                | varchar(20)      | NO   |     | NULL                |                |
| url                 | varchar(50)      | NO   |     | NULL                |                |

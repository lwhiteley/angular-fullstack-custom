Node Custom Scaffolded App
========================

##How to  get started

####1. Download and install Git

If you dont have git installed go to the git site, download and install git.
While installing there will be an option to run git from your windows command line
Please select that option to broaden the scope of the git command.

[http://git-scm.com/](http://git-scm.com/)

####2. Download and install NodeJS

If you dont have NodeJS installed please go to the home site for Node,
download and install NodeJS

[http://nodejs.org/](http://nodejs.org/)

####3. Download and install MongoDB

If you dont have MongoDb installed then please go to the home site,
Download and install MongoDB

[http://www.mongodb.org/](http://www.mongodb.org/)

> - to setup mongo on a windows pc, please view [instructions](http://www.mkyong.com/mongodb/how-to-install-mongodb-on-windows/)

> ensure to add the mongo bin folder path tou your system PATH variable. view [instructions](http://www.windows-commandline.com/set-path-command-line/)

> - for mac users, its recommended to use `homebrew`

> `brew install mongodb`

####4. Run this command to install Global Node tools

If you dont have any of the tools listed after the `-g` statement in the following command.
then run this command from your command prompt

`npm install -g yo node-inspector nodemon grunt-cli bower karma istanbul npm-check-updates`

####5. Create And/or go to a development folder
If you have  prefered development folder navigate to that directory in your command prompt.

if you dont know how to navigate using the command prompt then
watch this video: [http://youtu.be/NAciFdtSkuc?t=4m27s](http://youtu.be/NAciFdtSkuc?t=4m27s)

Assuming this folder is currently on your c drive, this dev folder is easily accessible

run `cd \dev`


####6. Clone the Git Repository

Run this command once the cd command to you development folder is successful

`git clone https://github.com/lwhiteley/angular-fullstack-custom.git`

####7. change working directory

`cd angular-fullstack-custom`

####8. set git to track your own git repository to avoid checking in changes to the template

`git remote set-url origin git://new.url.here`

####9. Run this command to install all Node dependencies

` npm install`

##Hooray, your development environment has been set up. Its that easy!


##Commands to help during development
============

####To run all tests

run command `grunt test`


####To run the Server

run command `grunt serve`

This task now starts up all prerequisites including MongoDB

####Use bower to install new javascript libraries

eg. run command `bower install --save angular`

Then

run command `grunt injectr` to  inject libraries automatically into the HTML (index.html)

####Info

Happy Hacking away!!

Code coverage is handled for frontend, looking to support coverage for backend too



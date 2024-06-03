
# Checkmarx (home assignment).

Full-Stack application for Checkmarx.  
   
- Developer: Milad Bannourah.
- Portfolio: https://milad-bannourah-portfolio2.vercel.app/
- LinkedIn: https://www.linkedin.com/in/milad-bannourah/
- GitHub: https://github.com/miladBann


## Discription:
this is a Full-Stack application that fetches some microservice and resources from the backend and visualizes everything in a graph in the frontend.

**the app is designed for wide screens mainly so make sure you are on a horizontal display.**

## Features:
- **Physics mode**: this allows you to drag and control the graph with your mouse as well as see how clusters are connected together in a unique way.
- **Add a Microservice**: this allows you to add a microservice to the graph which is represented by a programing language.
- **Add a Resource**: this allows you to add a resource cluster and specify it's features as well as connect a programming language to it.
- **Add a connection**: this can be used to add any extra and new connections to the graph.
- **(Please note that when you are asked to provide a URL for a picture its recommended for it to be in a png or jpg formats.)**
## Tech Stack used:
Frontend: React

Backend: Node.js and express.js

tests: Jest, react testing library.


## Running the application
1- Clone this repo into your own github repo or just download the folders.

2- Open both the client folder and the server folder in your code editor.

3- (for this step and the next ones, if you use yarn instead of npm just replace any command that has npm with yarn).

4- From your terminal navigate to the client folder and run the command "npm install" to get the node_modules folder.

5- Repeat step 4 for the server folder.

6- Start the frontend of the application by running the command "npm start" from the terminal inside the client folder.

7- Start the backend of the application by running the command "npm run dev" from the terminal inside the server folder.(ther server uses nodemon for auto restarting).

8- Now the app is ready to be used.


## Testing

- Test are written with jest and the React testing library and you can use the command **npm test** to run them all.

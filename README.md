# Real Estate Frontend
## Hi! Thanks for taking time to look at this project.

### Clone into the project from GitHub
```
git clone https://github.com/intr00der/real_estate_frontend/
```
### Go into the directory
```
cd real_estate_frontend
```

### Install dependancies
```
npm install
```
### Run server
```
npm run serve
```
### From my perspective there was node module which goes by the name "chokidar", which is Mac OS specific, but it still doesn't let us run server for some reason, the solution is:
```
rm -rf node_modules package-lock.json yarn.lock
```
### And now you will be able to
```
npm run serve
```
## Visit 127.0.0.1/8080 to test the project's functionality
### P.S.: Sorry, I didn't find the time to put phone mask on a corresponding input, it takes 10 digits

var Express = require('express')
var path = require('path')
var body_pareser = require('body-parser')
var logger = require('morgan')
var http = require('http')

// create data storage for store local notes
var entries = []
    function main(){

        // create server
        const expressServer = Express()
        
        // views engine configuration 
        // set the views in views/ directory
        expressServer.set("views", path.resolve(__dirname, "views"));
        // setup the view engine as ejs
        expressServer.set("view engine", "ejs");
        
        // pass entries array as a property 
        expressServer.locals.entries= entries

        // setup first middleware which is represent the looger middleware
        expressServer.use(logger('dev'))
        // setup middleware for parsing the [boyd] of url 
        expressServer.use(body_pareser.urlencoded({ extended: false }));
        
        // setup middleware for request which is GET /  
        expressServer.get('/',(request,respond)=>{
            // make a rendering for page and send a respond
            respond.render('index')
        });
        // setup middleware for request which is  GET /entry 
        expressServer.get('/entry',(request,respond)=>{
           // make a rendering for page and send a respond
            respond.render('entry')
        })
        // setup miiddleware for request POST /entry 
        expressServer.post("/entry", function(request, response) {
            // check if body of request is empty send error 
            if (!request.body.title || !request.body.body) {
                console.log('so request with no body or title')
                response.status(400).send("Entries must have a title and a body.");
                return;
                
            }
            // otherwise push body of request into entry array
                entries.push({
                title: request.body.title,
                content: request.body.body,
                published: new Date()
                });
                console.log("post has body")
                //response.Redirect() sends an HTTP request to the browser, then the browser sends that request to the web server, 
                //then the web server delivers a response to the web browser
                response.redirect("/");
               
            });



        // last middleware executed if request need a file/resource does not exist
        expressServer.use((request,respond)=>{
            respond.status(404).render('404')
        })


        // run server ...
        http.createServer(expressServer).listen(3000,()=>{
            console.log('server start listening ...')
        })

        


    }


main()
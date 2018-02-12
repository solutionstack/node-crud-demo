const express = require('express');
const redis = require('redis');

//create Redis Client
let client = redis.createClient();

client.on('connect', ()=> {
    console.log('Connected to Redis....');
})
;

client.on('error', function (err) {
    console.log("Error " + err);
});

;

//set port
const port = 8081;

//init app
const app = express();


// index page, shows all cached data
app.get('/', (req, res)=> {

client.exists('demo-app-db', function (err, reply) {

    if (reply === 1) {

        client.hgetall("demo-app-db", (err, result)=> {

            if(result) {
                res.json(result).end();
                console.log("Data set retrieved");

            }
            else{
                res.send("An error occured :: " + err).end();
    }
    })


    } else {

        client.hmset('demo-app-db', //allocate redis storage

            {}, (err, reply)=> {

            console.log(reply);
        })
        ;

        res.send('No data inmemory, <br/> Defaut storage structure allocated');
        console.log("Data set retrieved");

    }
});

})
;

// create cached data
app.post('/api/add/:key/:value', (req, res) => {
				
				let data_key = req.params.key;
				const new_data ={};
				new_data[data_key]  = req.params.value;
			
			client.hmset('demo-app-db', new_data,//allocate redis storage
          
				(err, reply)=> {
	
				if(reply){
							res.send("<br/>Added key: "+data_key +" with value: "+req.params.value ).end();

				}else{
					res.send("<br/>Error adding new key/value pair").end();		
				}

			})
	
})
;

// read single key/value
app.get('/api/read/:key', (req, res) => {
		
		client.hgetall("demo-app-db", (err, result)=> {

            if(result) {
				
				if(result[req.params.key]){
					
                res.send("Cached value of key: "+req.params.key + " is --" +result[req.params.key]).end();
				console.log("Single data retrieved "+req.params.key+"=>"+result[req.params.key]);
				}
				else{
						res.send("Key: *"+req.params.key+"* Not found").end();
						console.log("Key: *"+req.params.key+"* Not found");
				}
                
	
            }
            else{
					res.send("An error occured :: " + err).end();
				}
				
	    })

	
	
})
;

// update cached data
app.post('/api/update/:key/:value', (req, res) => {
		
		client.hgetall("demo-app-db", (err, result)=> {

            if(result) {
				
				if(result[req.params.key]){
				
					let data_key = req.params.key;
					const new_data ={};
					new_data[data_key]  = req.params.value;
			
					client.hmset('demo-app-db', new_data,//allocate redis storage
          
						(err, reply)=> {
	
						if(reply){
							res.send("<br/>Updated key: "+data_key +" with value: "+req.params.value ).end();
							console.log("Data updated");

						}else{
							res.send("<br/>Error updating new key/value pair").end();		
							console.log("Update failed");		
						}

					});
                
                
	
            }else{
							res.send("Key: *"+req.params.key+"* Not found, nothing to update").end();
						console.log("Update Key: *"+req.params.key+"* Not found");
			
			}
		}
        else{
					res.send("An error occured :: " + err).end();
			}
				
	    })

	
	
})
;// delete cached data
app.post('/api/delete/:key', (req, res) => {
		
		client.hgetall("demo-app-db", (err, result)=> {

            if(result) {
				
				if(result[req.params.key]){
				
					let data_key = req.params.key;
			
					client.hdel('demo-app-db', data_key,//allocate redis storage
          
						(err, reply)=> {
	
						if(reply){
							res.send("<br/>Deleted entry with key: "+data_key ).end();
							console.log("Data updated");

						}else{
							res.send("<br/>Error deleting  key/value pair").end();		
							console.log("Update failed");		
						}

					});
                
                
	
            }else{
							res.send("Key: *"+req.params.key+"* Not found, nothing to delete").end();
						console.log("Delete Key: *"+req.params.key+"* Not found");
			
			}
		}
        else{
					res.send("An error occured :: " + err).end();
			}
				
	    })

	
	
})
;


app.listen(port, () => {
    console.log('Server started on port :' + port);
})
;

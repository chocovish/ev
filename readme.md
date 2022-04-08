## Simple Vehicle Tracking system 

### Get Started:
1.  npm i
1. npm start

### APIS

##### [GET] /api/cars => returns all the cars in db
##### [POST] /api/cars => create a car with a json body. example: {"name":"someone's car"}
##### [DELETE] /api/cars/:id => deletes the car with given id
##### [POST] /api/heartbeat => Send current location of the car with this api
example request body for heartbeat:
```
{
    "id":"624f5e93b2582669c5f58dc9",
    "type":"car",
    "timestamp": 1649366676000,
    "location": "22.55417272830956,88.28145014396407"
}
```
### Open / to see the map and latest car locations
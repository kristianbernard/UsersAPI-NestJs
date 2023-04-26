# UsersAPI-NestJs

#### Return all users and create in MongoDB

1st - GET request that has a function where it will list all the mongoDb users where the https://reqres.in users are registered.
```http
     GET /users/
```


| Parameter | Type | Description |
| :---------- | :-------- | :--------------------------------- |
| `api_key` | `chain` | **Mandatory**. Your API key |


#### Returns a user
2°- GET request that has the user ID as a parameter, thus bringing only the user information that corresponds to the ID.
```http
     GET /users/${id}
```


| Parameter | Type | Description |
| :---------- | :-------- | :--------------------------------- |
| `id` | `chain` | **Mandatory**. The ID of the item you want |
 

#### Returns the user's avatar
3rd- GET request that has the user ID as a parameter, but unlike the previous request, it is accompanied by ":id/avatar", which will bring only the user's avatar.
```http
     GET /users/${id}/avatar
```


| Parameter | Type | Description |
| :---------- | :-------- | :--------------------------------- |
| `id` | `chain` | **Mandatory**. The ID of the item you want |
 

#### Delete user avatar
4º- A DELETE request that also has the user ID as a parameter, and is accompanied by ":id/avatar", but unlike the previous request, it will delete the user's avatar.
```http
     DELETE /users/${id}/avatar
```


| Parameter | Type | Description |
| :---------- | :-------- | :--------------------------------- |
| `id` | `chain` | **Mandatory**. The ID of the item you want |
 

## MongoDB database access

The project accesses the database through a connection string found in the app.module file, which contains a username, password, and ulr for the connection.

To check if the data was being recorded, I downloaded the MongoDb Compass system where I put the URL: "mongodb+srv://admin:HKkXuG4MNRmFbvCq@cluster0.5c95dc1.mongodb.net/?retryWrites=true&w=majority" and gives access to the database data

## RabbitMQ

The project accesses RabbitMQ and sends the messages that I programmed when registering the user, looking for the user by ID, looking for the avatar by user ID.

Connection string ''amqp://guest:guest@localhost:5672/usersproject'' get user:password@access_url:port/queue

<h1 align="center">
    
    Twitee
</h1>



## About Twitee

TWITEE is a mini and substandard runoff of Twitter. Users register and login and can put up
anything that crosses their mind. The whole world can view their twits and comment on their
twits /and like them. 

## Routes Overview

| HTTP Verb    | Route          | Action | Used For    | Request | Expected Response/Action |
| :---:         |     :---:      |         :---: | :---: |  :---: | :---: |
| POST   | '/register'     | register action    | route to create a new user account   | {"name": "string", "email" : "string","password" : "string"} | {"status": true,"message": "User created successfully" |
| POST | '/login'      | login action     |route to login    |{"email" : "string","password" : "string"}    | Logged into Dashboard    |
| POST | '/create/twit/'     | create twit action    | creates one twit   |{"title": "string", "body": "string"} |{ "status": true, "message": "Twit created successfully"} |
| POST | '/create/twit/comment/' | create comment action     |adds a comment to a twit    | {"comment": "string", "twit_id": "string"} |{"_id": "string", "title": "string", "body": "string", "user_id": "string", "comments": [{ "user_id": "string","text": "string", "date": "Mon Jan 03 2022 20:53:25 GMT+0100 (West Africa Standard Time)", "_id": "string"}], "likes": [], "createdAt": "2022-01-03T19:51:25.281Z", "updatedAt": "2022-01-03T19:53:26.542Z"} |
| POST   | '/create/twit/like'     | create like action    | adds like to a twit   | {"twit_id": "string"}    | { "status": true, "message": "Twit liked successfully"}    |
| POST    | '/delete/twit'      | delete twit action     | deletes a twit if created by user    |{"id": "string"}    |{ "status": true, "message": "Twit deleted successfully"}    |


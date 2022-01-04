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
| POST    | '/login'      | login action     |route to login    |{"email" : "string","password" : "string"}    | Logged into Dashboard    |
| POST   | '/create/twit'     | create twit action    | creates one twit   |{
    "title": "vgvyvygvr",
    "body": "gcytctycytcvtycvyt"
}    |{
    "status": true,
    "message": "Twit created successfully"
}    |
| POST    | '/login'       | login action     |route to login    | route to login    |route to login    |
| POST   | '/register'     | register action    | route to create a new user account   |route to login    |route to login    |
| POST    | '/login       | login action     |route to login    |route to login    |route to login    |

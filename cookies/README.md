# Cookies

An HTTP server that handles authentication built using Deno. The goal here was to learn about how the "platform" handles authentication (i.e. just HTML and HTTP)!

## Running the Server

1. Install [Deno](https://deno.land/#installation)
2. Start the server with the following command:

```
deno --allow-net --allow-read server.ts
```

3. Open up your browser and navigate to `localhost:8000`
4. In the username and password form, type in `hello` as the username and `world` as the password
5. You should be redirected to the welcome page, and if you look in the network tab, you should see a new cookie was sent in the request

## Why Deno?

I knew I needed to write my own HTTP server for this but I _also_ knew I wanted to:

1. Use Typescript
2. Use as few dependencies as possible
3. Use the fetch API's interfaces if possible

It just so happens that Deno's HTTP standard library ticks all of these boxes out of the box.

## How does it work?

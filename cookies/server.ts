import { serve } from "https://deno.land/std@0.119.0/http/server.ts";

const BASE_URL = "http://localhost:8000";
const USERNAME = "hello";
const PASSWORD = "world";

function parseCookies(cookies: string) {
  return cookies
    .split(";")
    .map((pair) => pair.trim())
    .reduce((cookies, pair) => {
      const [cookie, value] = pair.split("=");
      return {
        ...cookies,
        [cookie]: value,
      };
    }, {} as Record<string, string>);
}

function isLoggedIn(cookies: string | null) {
  if (!cookies) {
    return false;
  }
  return parseCookies(cookies)["logged-in"] === "true";
}

async function handler(req: Request): Promise<Response> {
  const [, path] = req.url.split(BASE_URL);

  if (req.method === "GET" && path === "/") {
    const html = await Deno.readTextFile("./index.html");
    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
        "Set-Cookie": `logged-in=''; expires=${new Date(
          0
        ).toUTCString()}; HttpOnly;`,
      },
    });
  }

  if (req.method === "GET" && path === "/home") {
    if (!isLoggedIn(req.headers.get("Cookie"))) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "./",
        },
      });
    }

    const html = await Deno.readTextFile("./home.html");
    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  }

  if (req.method === "POST" && path === "/login") {
    const formData = await req.formData();
    const username = formData.get("username");
    const password = formData.get("password");

    if (username === USERNAME && password === PASSWORD) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "../home",
          "Set-Cookie": "logged-in=true; HttpOnly",
        },
      });
    } else {
      return new Response("Incorrect username or password", {
        status: 401,
      });
    }
  }

  return new Response("Not found", {
    status: 404,
  });
}

serve(handler);

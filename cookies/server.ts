import { serve } from "https://deno.land/std@0.119.0/http/server.ts";

const BASE_URL = "http://localhost:8000";
const USERNAME = "hello";
const PASSWORD = "world";

/**
 * Parses the cookies string into key-value pairs.
 * e.g. given the string "logged-in=true; user=hello",
 *  returns the object { 'logged-in': 'true', user: 'hello' }
 */
function parseCookies(cookies: string | null) {
  if (!cookies) {
    return {};
  }
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

/**
 * A redirect response is a response code with a 3xx code. When the browser
 * receives a 3xx code, it looks for the `Location` field in the response
 * headers to determine where it should redirect to.
 *
 * "Location" can be either a relative or absolute path.
 */
function redirect(to: string, headers: Record<string, string> = {}) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: to,
      ...headers,
    },
  });
}

async function html(path: string, headers: Record<string, string> = {}) {
  const html = await Deno.readTextFile(path + ".html");
  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
      ...headers,
    },
  });
}

async function handler(req: Request): Promise<Response> {
  const [, path] = req.url.split(BASE_URL);
  const cookies = parseCookies(req.headers.get("Cookie"));

  /**
   * Checks whether the user is logged in by checking if the
   * request cookies contains the cookie logged-in=true
   */
  function isLoggedIn() {
    return cookies["logged-in"] === "true";
  }

  /**
   * The root handler. If the user is logged in, redirects to the home page.
   * Otherwise it redirects to the login page.
   */
  if (req.method === "GET" && path === "/") {
    if (isLoggedIn()) {
      return redirect("./home");
    } else {
      return redirect("./login");
    }
  }

  /**
   * Returns the login page and deletes the 'logged-in' cookie. The correct way
   * to delete a cookie is to set the cookie value to an empty string and set
   * its expiration to a date in the past.
   *
   * See:
   *  - https://stackoverflow.com/questions/5285940/correct-way-to-delete-cookies-server-side
   */
  if (req.method === "GET" && path === "/login") {
    return html("./login", {
      "Set-Cookie": `logged-in=''; expires=${new Date(
        0
      ).toUTCString()}; HttpOnly;`,
    });
  }

  /**
   * Handler for authentication. Checks if the username and password matches
   * and if it does, redirects to the home page and sets the logged in cookie.
   */
  if (req.method === "POST" && path === "/login") {
    const formData = await req.formData();
    const username = formData.get("username");
    const password = formData.get("password");

    if (username === USERNAME && password === PASSWORD) {
      return redirect("../home", {
        "Set-Cookie": "logged-in=true; HttpOnly",
      });
    } else {
      return new Response("Incorrect username or password", {
        status: 401,
      });
    }
  }

  /**
   * If the user is logged in (i.e. the cookie exists), return the login page.
   * Otherwise redirect the user to the login form.
   *
   * I thought about returning a 403 instead of a redirect but it seems that
   * many large websites simply do a 302 (Facebook, Google, Amazon). See:
   *  - https://stackoverflow.com/questions/8775593/is-it-possible-to-send-a-401-unauthorized-and-redirect-with-a-location
   */
  if (req.method === "GET" && path === "/home") {
    if (isLoggedIn()) {
      return html("./home");
    }
    return redirect("./login");
  }

  /**
   * At this point, we're trying to handle a route that doesn't exist, so we
   * return a 404.
   */
  return new Response("Not found", {
    status: 404,
  });
}

serve(handler);

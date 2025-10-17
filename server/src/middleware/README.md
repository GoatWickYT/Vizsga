<div align="center">
<img style="border-radius:20px; border:2px solid white;"  src="../../../Images/magyar.png"/>
</div>

### [Vissza](../../README.md)

<div align="center">
<h1>
    Köztes rétegek (Middleware)
</h1>
</div>

> [dokumentáció a hitelesítésről](./auth/README.md)

> [dokumentáció az adatellenőrzésről](./validation/README.md)

<div align="center">
<h2>
404 Kezelő
</h2>
</div>

Alapértelmezett kezelő, amely akkor lép működésbe, ha a fejlesztők egy nem létező végponthoz próbálnak hozzáférni.

<div align="center">
<h2>
    Hiba Kezelő
</h2>
</div>

Hibát ad vissza, ha a felhasználó vagy a fejlesztő rossz paraméterekkel próbál elérni egy végpontot, vagy ha a szerverrel probléma van.

<div align="center">
<h2>
    Naplózó
</h2>
</div>

Naplózza a hozzáféréseket és a válaszidőket minden egyes szerverhez érkező kérés esetén.

<div align="center">
<h2>
    Kéréskorlátozó (Rate Limiter)
</h2>
</div>

Korlátozza a felhasználó által a szerverhez küldhető kérések számát (100 kérés 15 percenként).

<hr style="height:100px;">

<div align="center">
<img style="border-radius:20px; border:2px solid white;"  src="../../../Images/english.png"/>
</div>

### [Back](../../README.md)

<div align="center">
<h1>
    Middleware
</h1>
</div>

> [docs for authentication](./auth/README.md)

> [docs for validation](./validation/README.md)

<div align="center">
<h2>
404 Handler
</h2>
</div>

Basic handler made in case developers try accessing an endpoint which doesn't exist

<div align="center">
<h2>
    Error Handler
</h2>
</div>

Respond with an error if the user or developer accesses an endpoint with the wrong parameters or the server has an issue

<div align="center">
<h2>
    Logger
</h2>
</div>

Logs accesses and response times for each hit the server gets

<div align="center">
<h2>
    Rate Limiter
</h2>
</div>

Limits the number of hits from a user to the server (100 requests per 15 minutes)

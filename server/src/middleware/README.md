<div align="center">
<img src="../../../Images/magyar.png"/>
</div>

[Vissza](../../README.md)

<div align="center">
<h1>
    Köztes rétegek (Middleware)
</h1>
</div>

dokumentáció a hitelesítésről

dokumentáció az adatellenőrzésről

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

<div align="center">
<h2>
    Frissítésszámláló
</h2>
</div>

Egyszerű frissítésszámláló, amely biztosítja, hogy a felhasználó csak akkor küldjön `get` frissítést az adatbázisnak, ha az adatok valóban megváltoztak (teszteletlen funkció, előfordulhat, hogy nem működik — ha így van, egy új adatbázistábla váltja majd fel, vagy teljesen el lesz távolítva).

---

<div align="center">
<img src="../../../Images/english.png"/>
</div>

[Back](../../README.md)

<div align="center">
<h1>
    Middleware
</h1>
</div>

docs for authentication

docs for validation

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

<div align="center">
<h2>
    Update Counts
</h2>
</div>

Rudementary update counter, makes it so that the user only hits the database with an update `get` if data has changed (untested, could be non-working if it turns out to not work will be replaced by either a new table in the db or removed completely)

<div align="center">
<img src="../../Images/magyar.png"/>
</div>

[Vissza](../../README.md)

<div align="center">
<h1>
    Szerver
</h1>
</div>

A szerver sok különböző részből áll, az alap alkalmazástól kezdve, ami mindent összekapcsol.

<div align="center">
<h2>
    Alap alkalmazás
</h2>
</div>

Ahogy korábban említettük, az `app.ts` fájl az, ami az összes réteget együtt működteti, hogy a szerver gyorsan és biztonságosan működjön.

<div align="center">
<h2>
    Útvonalak
</h2>
</div>

Az útvonalak határozzák meg a végpontokat — ők az utak elágazásai és a táblák, amik megmutatják, melyik út hová vezet. Az útvonalak a felhasználót a megfelelő irányba terelik, és összekapcsolják az alkalmazást a vezérlőkkel.

További részletek itt -> [dokumentáció](./routes/DOCS.md)

<div align="center">
<h2>
    Vezérlők
</h2>
</div>

A vezérlők az útvonalak után következő lépést jelentik — gondolj rájuk, mint biztonsági ellenőrző pontokra. Biztosítják, hogy az elküldött vagy kért adatok biztonságosak, és a felhasználók jogosultak azokhoz hozzáférni. Ha visszatérünk az úthasonlathoz: ők azok, akik ellenőrzik az útleveled, és ha minden rendben van, beengednek — ha nem, akkor elutasítanak egy üzenettel.

További részletek itt -> [dokumentáció](./controllers/DOCS.md)

<div align="center">
<h2>
    Modellek
</h2>
</div>

A modellek az utolsó réteget jelentik, és kevés vagy semmilyen biztonsági funkcióval nem rendelkeznek. Egyetlen feladatuk az adatok beküldésének és lekérésének kezelése az adatbázisban. Minden jogosulatlan vagy szabálytalan hozzáférés korábban már le lett tiltva a szerver által, így itt csak az adatküldés és -fogadás történik.

További részletek itt -> [dokumentáció](./models/DOCS.md)

<div align="center">
<h2>
    Köztes rétegek (Middleware)
</h2>
</div>

A middleware segédfunkció a vezérlők és az útvonalak számára, amely ellenőrzi az adatok érvényességét, és csak a megtisztított adatokat engedi tovább. Kezeli a hibás hozzáféréseket, a belső hibákat, a naplózást és az adatellenőrzést.

További részletek itt -> [dokumentáció](./middleware/DOCS.md)

<div align="center">
<h2>
    Típusok
</h2>
</div>

A típusok elengedhetetlenek, ha `Typescript`-tel dolgozunk (ahogy a neve is sugallja). Segítenek a globális, gyakran használt értékek – például szerepkörök, státuszok, állatok – kezelésében, és biztosítják, hogy a `statikus` értékeket következetesen használjuk.

<code>
Példa:<br>
Három státusz létezik: egy hely, például egy étterem, lehet nyitva, zárva vagy piszkos. A Status típus segít ezeket a statikus változókat következetesen használni, így elkerülve a szöveges eltéréseket.
</code>

<div align="center">
<h2>
    Segédmodulok
</h2>
</div>

A segédmodulok jelenleg két fájlt tartalmaznak: a `jwt.ts` fájlt, ami a tokenizációért, hozzáférési tokenek generálásáért és ellenőrzéséért felelős, valamint a `hash.ts` fájlt, ami a jelszavak titkosítását és visszafejtését kezeli a regisztráció és a bejelentkezés során.

---

<div align="center">
<img src="../../Images/english.png"/>
</div>

[Back](../../README.md)

<div align="center">
<h1>
    Server
</h1>
</div>

The server is made up of many different parts starting from the base app that connects it all together

<div align="center">
<h2>
    Base App
</h2>
</div>

As stated earlier the `app.ts` file is what keeps all the layers working together as a whole, cooperating nicely so our server works fast and secure

<div align="center">
<h2>
    Routes
</h2>
</div>

The routes define the endpoints, the routes are the branches in the road, and the signs telling you what road leads where, they send the user down the path they need to go, they connect the app to the controllers

Read more in detail here -> [docs](./routes/DOCS.md)

<div align="center">
<h2>
    Controllers
</h2>
</div>

The controllers are the next step after the routes, think of them as security checkpoints, they make sure the data being sent or requested is secure and the users are allowed to access that data, going back to the road analogy they take your passport and make sure you are clear to enter, if not they deny access via a message.

Read more in detail here -> [docs](./controllers/DOCS.md)

<div align="center">
<h2>
    Models
</h2>
</div>

Models are the final layer containing little to no security, their only job is to handle the transaction of submitting data to and getting data from the database, every possible unauthorized or illegal access has been denied previously by the server so here it just sends and gets data.

Read more in detail here -> [docs](./models/DOCS.md)

<div align="center">
<h2>
    Middleware
</h2>
</div>

Middleware is a helper for controllers and routes to check data validity and only allow sanitized data through, it includes wrong accesses, internal errors, logging and validation.

Read more in detail here -> [docs](./middleware/DOCS.md)

<div align="center">
<h2>
    Types
</h2>
</div>

Types are a must have when working with `Typescript` (as the name suggests) they help in global use of some must haves, Roles, Statusses, Animals they make the use of some `static` values.

<code>
Example:<br>
Three statusses exist, a spot like a buffet can either be open closed or dirty the Status type helps use these static variables more consistently helping avoid string mismatches
</code>

<div align="center">
<h2>
    Utility
</h2>
</div>

Utility includes only two things currently `jwt.ts` which is responsible for tokenization and access token generation and checking and `hash.ts` which hashes and unhashes the passwords for registration and logins

<div align="center">
<img src="../../../Images/magyar.png"/>
</div>

[Vissza](../../../README.md)

<div align="center">
<h1>
    Adatbázis
</h1>
</div>

A `db.ts` kapcsolatot hoz létre a szerver és adatbázis között, avagy összeköti az adattárolást az adat kezeléssel, MySQL rendszert használva a kapcsolatot `pool`-ként kell megadni, és mivel külső helyen és lokálisan is futtatható (dockerrel) így a belépési adatokat `.env` fájl segítségével hozza létre

<div align="center">
<h2>
    Adatbázis táblák generálása
</h2>
</div>

Az adatbázis tábláinak legenerálására külön `script` íródott, részleteseben itt -> [docs](../scripts/DOCS.md)

<div align="center">
<h2>
    Adatbázis Modellek
</h2>
</div>

Az adatbázisban tárolt adatoknak modelleket és emellé interfészeket kellett definiálni, ezek a modellek külön kategorizálva lettek `map`, `ticket` és `news` kategóriákba, ezek tartalmazzás a kategóriák alá tartozó modellek definiálását emellett szerver oldalon a vezérlők és útvonalak is így lett szétosztva.

---

<div align="center">
<img src="../../../Images/english.png"/>
</div>

[Back](../../../README.md)

<div align="center">
<h1>
    Database
</h1>
</div>

`db.ts` creates the connection between database and server as in it makes a connection between data storage and data handling, in MySQL you create a connection via a `pool` and since you can run the database globally or locally (with docker) the credentials are gathered from a `.env` file

<div align="center">
<h2>
    Tables in the Database
</h2>
</div>

To generate the tables in the database we made a `script` which you can read about in detail here -> [docs](../scripts/DOCS.md)

<div align="center">
<h2>
    Models in the Database
</h2>
</div>

For the models and interfaces utilized by the database we categorized them into three main folders `map`, `ticket` and `news` , these are the later categories used for `controller` and `route` management.

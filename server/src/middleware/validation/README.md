<div align="center">
<img style="border-radius:20px; border:2px solid white;" src="../../../../Images/magyar.png"/>
</div>

### [Vissza](../README.md)

<div align="center">
<h2>
    Adatellenőrzés alapjai
</h2>
</div>

Annak biztosítása, hogy a felhasználók ne próbáljanak olyasmit tenni, amit nem szabad, a másik oldal feladata lesz — a mi oldalunkon viszont azt ellenőrizzük, hogy a feltételezetten már érvényes adatok valóban érvényesek legyenek, így a szerver biztonságosan tudjon velük dolgozni. Ellenőrizzük a bevitt mezőket, valamint frissítéskor azt, hogy pontosan mit módosítunk.

Ezen felül a lekérdezéseket (GET kéréseket) is ellenőrizzük — nem biztonsági, hanem felhasználói és fejlesztői kényelem érdekében. Ha érvénytelen azonosító (ID) paramétert kapunk, 400-as hibakódot küldünk vissza, és jelezzük, hogy az érték hibás, így a fejlesztő azonnal tudja, hol történt a hiba.

<hr style="height:100px;">

<div align="center">
<img style="border-radius:20px; border:2px solid white;"  src="../../../../Images/english.png"/>
</div>

### [Back](../README.md)

<div align="center">
<h2>
Basics for Validation
</h2>
</div>

To make sure users don't try anything they shouldn't will be the job of the other end, on our end we make sure that the presumably already valid data is actually valid so the server can work with it we validate input fields and on updates what we update.

Next to these we also validate get requests, not for security but for user friendliness and for now dev friendliness, if an invalid ID parameter is passed we throw a 400 code and tell them it's invalid so they know they messed up somewhere.

const express = require("express");
const jatvid = require("./lib/jatvid");
const app = express();

app.set("json spaces",2);

app.get("/", (req,res) => {
 res.send(`
  <h2>Simple Documentation</h2>
  <b>Made by Ricko Veriyanto</b>
  <p>Cek repository <a href="https://github.com/ricko-v">disini</a></p>
  <p>Lihat web <a href="http://twindev.herokuapp.com/doc/jatvid">Demo</a></p>
  <p><a href="/api/update">localhost:3000/api/update</a> => Untuk mengambil update data covid daerah Jawa Tengah</p>
  <p><a href="/api/rs">localhost:3000/api/rs</a> => Untuk mengambil data covid dari rumah sakit daerah Jawa Tengah</p>
  <a href="/api/kabkot">localhost:3000/api/kabkot</a> => Untuk mengambil data covid dari Kabupaten/Kota daerah Jawa Tengah
`);
});

app.get("/api/update", (req,res) => {
 jatvid.update()
 .then(data => res.json(data))
 .catch(er => res.json(er));
});

app.get("/api/rs", (req,res) => {
 jatvid.rs()
 .then(data => res.json(data))
 .catch(er => res.json(er));
});

app.get("/api/kabkot", (req,res) => {
 jatvid.kabkot()
 .then(data => res.json(data))
 .catch(er => res.json(er));
});


app.listen(3000, () => console.log("Berjalan di localhost:3000"));

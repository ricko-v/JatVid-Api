const req = require("request");
const co = require("cheerio");

const jatvid = {
  update: () => new Promise((resolve,reject) => {
    req("https://corona.jatengprov.go.id/data", (err,req,body) => {
    if(req.statusCode == 200){
    let $ = co.load(body);
    let hasil =  $(".font-counter").text();
    let upd = $(".alert-teks").find("span").text().split("\n");
    let tm = upd[1].trim();
    let a = hasil.replace(/[" "]/g, "").split(/[+\n]/);
    resolve({
     hari: tm.trim(),
     dirawat: a[0],
     tambahan_dirawat: a[1],
     sembuh: a[2],
     tambahan_sembuh: a[3],
     meninggal: a[4],
     tambahan_meninggal: a[5],
     terkonfirmasi: a[6],
     tambahan_terkonfirmasi: a[7],
     suspek: a[8],
     tambahan_suspek: a[9]
    });
    }
    else {
     resolve({
      error: true
     });
    }
    });
  }),

  rs: () => new Promise((resolve,reject) => {
    let resp = [];
    let tamrs = [];
    let rs = [];
    let konfirm = [];
    let rawat = [];
    let sembuh = [];
    let meninggal = [];
    let suspek = [];
    let suscard = [];
    req("https://corona.jatengprov.go.id/data", (err,req,body) => {
    if(req.statusCode == 200){
    let $ = co.load(body);
    let hasil =  $(".font-counter").text();
    let a = hasil.replace(/[" "]/g, "").split(/[+\n]/);
    $("#tabelRS").find("td").each( function(){
    let ab = $(this).text();
    tamrs.push(ab);
    });
    for(i=0; i<tamrs.length; i+=7){
    rs.push(tamrs[i]);
    }
    for(a=1; a<tamrs.length; a+=7){
    konfirm.push(tamrs[a]);
    }
    for(s=2; s<tamrs.length; s+=7){
    rawat.push(tamrs[s]);
    }
    for(b=3; b<tamrs.length; b+=7){
    sembuh.push(tamrs[b]);
    }
    for(c=4; c<tamrs.length; c+=7){
    meninggal.push(tamrs[c]);
    }
    for(d=5; d<tamrs.length; d+=7){
    suspek.push(tamrs[d]);
    }
    for(e=6; e<tamrs.length; e+=7){
    suscard.push(tamrs[e]);
    }
    for(o=0; o<rs.length; o++){
    resp.push({
    nama: rs[o],
    terkonfirmasi: konfirm[o],
    dirawat: rawat[o],
    sembuh: sembuh[o],
    meninggal: meninggal[o],
    suspek: suspek[o],
    suspek_discard: suscard[o]
    });
    }
    resolve(resp);
    }
   });
  }),

  kabkot: () => new Promise((resolve,reject) => {
    req("https://corona.jatengprov.go.id/data", (err,req,body) => {
    let resp = [];
    let tam = [];
    let kab = [];
    let konfirm = [];
    let rawat = [];
    let sembuh = [];
    let meninggal = [];
    let suspek = [];
    let suscard = [];
    if(req.statusCode == 200){
    let $ = co.load(body);
    $("tbody").find("td").each( function(){
    let h = $(this).text();
    tam.push(h)
    });
   for(i=0; i<245; i+=7){
   kab.push(tam[i]);
   }
   for(a=1; a<245; a+=7){
   konfirm.push(tam[a]);
   }
   for(s=2; s<245; s+=7){
   rawat.push(tam[s]);
   }
   for(b=3; b<245; b+=7){
   sembuh.push(tam[b]);
   }
   for(c=4; c<245; c+=7){
   meninggal.push(tam[c]);
   }
   for(d=5; d<245; d+=7){
   suspek.push(tam[d]);
   }
   for(e=6; e<245; e+=7){
   suscard.push(tam[e]);
   }
   for(o=0; o<kab.length; o++){
   resp.push({
   kab_kota: kab[o],
   terkonfirmasi: konfirm[o],
   dirawat: rawat[o],
   sembuh: sembuh[o],
   meninggal: meninggal[o],
   suspek: suspek[o],
   suspek_discard: suscard[o]
   });
   }
   resolve(resp);
   }
   });

   })
}

module.exports = jatvid;

const span=document.querySelector("span");

const kartTemplate = `
    <div class="kart-cerceve">
        <div class="kart-onyuz">
            <img src="https://via.placeholder.com/100x100?text=?">
        </div>

        <div class="kart-arkayuz">
            <img src="">
        </div>
    </div>
`;

const fotoNumaralari = [
    10, 20, 30, 20,
    10, 40, 40, 30
];

//Ödev 15 görev 2
//fotonumaralari elemanlarını atamak amacıyla rastgele sayı fonksiyonu yaratıldı
function rastgeleSayi(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}

//fotonumaralari elemanlarının yerlerini değiştirmek amacıyla shuffleArray fonksiyonunu yaratıldı
//kaynak: stackoverflow
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//fotoNumaralari dizisinin yeniden yaratılması rastgeleSayi ve shuffleArray fonksiyonlarından yararklanılarak reWrite fonksiyonu yaratıldı
function reWrite(fotoNumaralari){
    fotoNumaralari.splice((fotoNumaralari.length/2),fotoNumaralari.length);
   
    for(let i=0;i<(fotoNumaralari.length/2);i++){
        fotoNumaralari[i]=rastgeleSayi(1, 99);
        fotoNumaralari.push(fotoNumaralari[i]);
    }

    return shuffleArray(fotoNumaralari);
}
reWrite(fotoNumaralari);

for (fotoNumara of fotoNumaralari) {
    const yenikart = document.createElement("div");
    yenikart.innerHTML = kartTemplate;
    yenikart.classList.add("kart");
    yenikart.querySelector(".kart-arkayuz img").src = `https://lipsum.app/id/${fotoNumara}/100x100`;
    document.querySelector("div#oyun-cerceve").append(yenikart);

    //Her bir karta tıklandığında "kartTiklama" fonksiyonu çalışacak.
    yenikart.addEventListener("click", kartTiklama);
}

function kartTiklama(olay) {
    //Tıklanan kartı seçilen olarak değişkene atayalım
    const secilenKart = olay.currentTarget;

    //Tıklanan kart eslesti classına sahipse daha önce başka kartla eşleşmiş ve zaten açık durumda demektir, işlem yapmayacağız.
    if (secilenKart.classList.contains("eslesti") === true) {
        return;
    }

    //Tıklanan ve açılan karta tekrar tıklanırsa işlem yapmayacağız.
    if (secilenKart.classList.contains("acik") === true) {
        return;
    }

    //Peşpeşe kartlara tıklandığında 2'den fazla kart tıklanmasını engellememiz gerekiyor.
    const tumAcikKartlar = document.querySelectorAll(".acik");
    if (tumAcikKartlar.length === 2) {
        return;
    }

    //Açık olan kart varsa seçelim.
    const acikKart = document.querySelector(".acik");

    //Hiç açık kart yoksa tıklanan karta açık class veriyoruz ve fonksiyondan çıkıyoruz.
    if (acikKart === null) {
        secilenKart.classList.add("acik");

        setTimeout(
            () => {
                secilenKart.classList.remove("acik");
            }, 1500
        );
        return;
    }

    //Daha önce bir açık kartımız varmış, son seçilen karta da açık class vererek tersini çevirelim.
    secilenKart.classList.add("acik");

    //Açık kartlara ait img etiketlerinin src görsel dosyaları eşleşiyor mu?
    const acikKartImg = acikKart.querySelector(".kart-arkayuz img");
    const secilenKartImg = secilenKart.querySelector(".kart-arkayuz img");

    if (acikKartImg.src === secilenKartImg.src) {
        //İki açık kart arasında eşleşme var.
        acikKart.classList.add("eslesti");
        secilenKart.classList.add("eslesti");
        
        const tumEslesenler = document.querySelectorAll(".eslesti");
        let eslesenSayisi=tumEslesenler.length/2;
        span.innerHTML=eslesenSayisi;
        
                //odev 15 görev 1
                //Karar yapısı oluşturularak eşleşmeler tamamlandığında 5 saniye ekranda kalacak görsel için fonksiyon oluşturuldu
                if(eslesenSayisi==4){

                    let makeGif=document.createElement("img");
                    makeGif.src="tebrikler4.gif";
                    makeGif.classList.add("win");
                    document.querySelector("body").append(makeGif);

                    setTimeout(()=>{
                        makeGif.style.display="none"
                    }, 5000);
                }

        acikKart.classList.remove("acik");
        secilenKart.classList.remove("acik");

        setTimeout(() => {
            acikKart.removeEventListener("click", kartTiklama);
            secilenKart.removeEventListener("click", kartTiklama);
        }, 1000);
    } else {
        //İki açık kartın görsel dosya adı birbirinden farklı, eşleşme yok, kartlar kapansın.
        setTimeout(() => {
            acikKart.classList.remove("acik");
            secilenKart.classList.remove("acik");
        }, 1500);
    }

}

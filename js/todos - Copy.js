console.log("               todos.JS");

const logg = (l) => { console.log(l) }

/*
    * ödev başlıklarına cevap olacak seviyede, pratik bir çalışma olması hedeflendi

    * sıralama işlemleri client'ta yapılarak , 
      server'dan ve internet dünyasından enerji, zaman , güç
      optimizasyon gözetildi

    bazı iyileştirmeler yapılabilir;
    * PUBLIC DEĞİŞKENLER renderTodos içine de alınabilir
    * html'ler optimize edilebilir
    * react'a seri ve sade olabiliyor, 
    * sort action state'leri (Ascending / Descending ) TH'lara işlenebilir
*/

renderHeader();

const todosUrl = "https://jsonplaceholder.typicode.com/todos";

//  0: YOK | n0: Asc, n1: DeAsc 
// 10, 11 : a.title  | 20, 21 : a.id  | 30, 31 : a.completed
let SiralayisKriteri = 0
let AktifSayfa = 1
let SES = 5 // SayfaElemanSayısı 

// const root = document.querySelector("#root");
let todos = [];


function EditClick(e) {
    // const id = Number(e.currentTarget.getAttribute("data-id"));
    const id2 = Number(e.getAttribute("data-id"));
    logg({ id2 });
}


const renderTodos = () => {

    const addEventListeners = () => {
        document.querySelectorAll(".edit").forEach((item) => {
            item.addEventListener("click", (e) => {
                const id = Number(e.currentTarget.getAttribute("data-id"));
                logg({ id });
            });
        });

        document.querySelectorAll(".remove").forEach((item) => {
            item.addEventListener("click", (e) => {
                const id = Number(e.currentTarget.getAttribute("data-id"));
                if (confirm("kaydı silmek istediğinize emin misiniz?")) {
                    todos = todos.filter((x) => x.id !== id);
                    render();
                    addEventListeners();
                }
            });
        });
    };

    // todoları listele
    const table = document.createElement("table");
    table.setAttribute("class", "table table-hover");


    const thead = document.createElement("thead");
    thead.innerHTML = `
    <tr>
      <th scope="col" style="width:2cm" Id="idSiralamaKriteri_Id"           onClick="SiralamaKriteri_Id(this)"      >Id</th>
      <th scope="col" style="width:2cm" Id="idSiralamaKriteri_KId"          onClick="SiralamaKriteri_KId(this)"     >Şahıs Id</th>
      <th scope="col" style="width:4cm" Id="idSiralamaKriteri_Durum"        onClick="SiralamaKriteri_Durum(this)"   >Durum</th>
      <th scope="col" data-style="width:2cm" Id="idSiralamaKriteri_Baslik"  onClick="SiralamaKriteri_Baslik(this)"  >Başlık</th>
      <th scope="col" style="width:5cm" ></th>
    </tr>
  `;

    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    table.appendChild(tbody);

    const renderItem = (item) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
                            <td>${item.id}</td>
                            <td>${item.userId}</td>
                            <td>${item.completed ? "Tamamlandı" : "Yapılacak"}</td>
                            <td>${item.title}</td>
                            <td>
                            <button class="btn btn-xs btn-danger  remove" data-id=${item.id}>Sil</button>
                            <button class="btn btn-xs btn-warning edit  " data-id=${item.id}>Düzenle</button>
                            </td>
                            `;
        // <button class="btn btn-xs btn-warning Nedit"  data-id=${item.id} onClick="EditClick(this)" >2. Dzn [${item.id}]</button>
        // debugger
        tbody.appendChild(tr);
    };

    const render = () => {

        SiralamaAssist()

        // RenderSayfalamaButtonlari(tbody)

        const Baslangic = (AktifSayfa - 1) * SES; /* 4.sayfa * 5 eleman = 20 */
        todos.slice(Baslangic, Baslangic + SES).forEach((item) => { renderItem(item); });

        RenderSayfalamaButtonlari(tbody)
    };

    // todosları api'dan al
    fetch(todosUrl)
        .then((resp) => resp.json())
        .then((data = []) => {
            todos = data;
            root.innerHTML = ""
            render();
            root.appendChild(table);
            addEventListeners();
        })
        .catch((error) => { /* errorLogger(error); */ logg(error) });

};

renderTodos();


const AktifSayfaDegis = (YeniSayfa) => { logg(`YS: ${YeniSayfa} | AS: ${AktifSayfa}`); AktifSayfa = YeniSayfa; renderTodos() }

function SiralamaKriteri_Baslik(e) {
    logg("SiralamaKriteri_Baslik", SiralayisKriteri);
    SayfalayiciSifirla()
    SiralayisKriteri = 10 + (SiralayisKriteri % 2 == 0 ? 1 : 0)
    renderTodos()
}

function SiralamaAssist() {
    // for paging (0,15) => (n,n+15) olabilir
    if (SiralayisKriteri > 0) { root.innerHTML = "" }
    if (SiralayisKriteri == 10) { todos.sort((a, b) => { return a.title > b.title }) }
    if (SiralayisKriteri == 11) { todos.sort((b, a) => { return a.title > b.title }) }
    if (SiralayisKriteri == 20) { todos.sort((a, b) => { return a.id > b.id }) }
    if (SiralayisKriteri == 21) { todos.sort((b, a) => { return a.id > b.id }) }
    if (SiralayisKriteri == 30) { todos.sort((a, b) => { return a.completed > b.completed }) }
    if (SiralayisKriteri == 31) { todos.sort((b, a) => { return a.completed > b.completed }) }
}

const SiralamaKriteri_Id = (e) => {
    logg("SiralamaKriteri_Id", SiralayisKriteri);
    SayfalayiciSifirla()
    SiralayisKriteri = 20 + (SiralayisKriteri % 2 == 0 ? 1 : 0)
    renderTodos()
}

const SiralamaKriteri_KId = (e) => {
    logg("SiralamaKriteri_KId", SiralayisKriteri);
    SayfalayiciSifirla()
    SiralayisKriteri = 20 + (SiralayisKriteri % 2 == 0 ? 1 : 0)
    renderTodos()
}

const SiralamaKriteri_Durum = (e) => {
    logg("SiralamaKriteri_Durum", SiralayisKriteri);
    SayfalayiciSifirla()
    SiralayisKriteri = 30 + (SiralayisKriteri % 2 == 0 ? 1 : 0)
    renderTodos()
}

const SayfalayiciSifirla = () => { AktifSayfa = 1 }

const RenderSayfalamaButtonlari = (tbody) => {

    //root.innerHTML = ""
    //debugger
    const SayfaSayisi = parseInt(todos.length / SES);
    const Sayfalayici = `<td class="SayfalayiciTd" colspan="5" >
    <button onClick="AktifSayfaDegis(1)" > İLK SAYFA</button>
    <button onClick="AktifSayfaDegis(${AktifSayfa - 1})" > Önceki </button>
    
    ${AktifSayfa < SayfaSayisi ? `<button onClick="AktifSayfaDegis(${AktifSayfa + 1})" > Sonraki </button>` : ""} 
    <button onClick="AktifSayfaDegis(${SayfaSayisi})" > SON SAYFA [ ${SayfaSayisi} ]</button>

    &nbsp; | &nbsp; 
    
    
    ${AktifSayfa - 1 > 0 ? `<button onClick="AktifSayfaDegis(${AktifSayfa - 1})" > ${AktifSayfa - 1} </button>` : ""} 
    
    &nbsp; | &nbsp; 

    <span style="font-weight:100; font-size:20pt">${AktifSayfa}</span>
    
    &nbsp; | &nbsp; 
    
    ${AktifSayfa + 1 < SayfaSayisi ? `<button onClick="AktifSayfaDegis(${AktifSayfa + 1})" > ${AktifSayfa + 1} </button>` : ""} 


    &nbsp; | &nbsp; 
    ${AktifSayfa - 5 > 0 ? `<button onClick="AktifSayfaDegis(${AktifSayfa - 5})" > - 5 </button>` : ""} 
    ${AktifSayfa + 5 < SayfaSayisi ? `<button onClick="AktifSayfaDegis(${AktifSayfa + 5})" > +5 </button>` : ""} 
&nbsp; | &nbsp; 
    
    

    ..




    </td>`

    // logg("Sayfalayici:" + Sayfalayici)
    const tr = document.createElement("tr")
    tr.innerHTML = Sayfalayici
    tbody.appendChild(tr)

}



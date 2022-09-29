console.log("               todos.JS");

const logg = (l) => { console.log(l) }

renderHeader();

const todosUrl = "https://jsonplaceholder.typicode.com/todos";

let SıralayisKriteri = 0
let AktifSayfa = 1
let SES = 5 // SayfaElemanSayısı

const SayfalayıcıSıfırla = () => {
    AktifSayfa = 1
    SES = 5 // SayfaElemanSayısı
}

// const root = document.querySelector("#root");
let todos = [];


function EditClick(e) {
    // const id = Number(e.currentTarget.getAttribute("data-id"));
    const id2 = Number(e.getAttribute("data-id"));
    logg({ id2 });
}




const renderTodos = () => {



    const RenderSayfalayıcı = () => {
        root.innerHTML = ""
        //debugger
        const SayfaSayısı = parseInt(todos.length / 15);
        const Sayfalayıcı = `<td class="SayfalayıcıTd">        
        ${AktifSayfa > 1 ? `<button onClick="AktifSayfaDegis(1)" > 1</button><button onClick="AktifSayfaDegis(${AktifSayfa - 1})" > ${AktifSayfa - 1} - </button> .. ` : ''}
        <button style="font-weight:100">${AktifSayfa} </h3></button>
        .. ${AktifSayfa < SayfaSayısı ? `<button onClick="AktifSayfaDegis(${AktifSayfa + 1})" > ${AktifSayfa + 1}</button>` : ""} ..
        <button onClick="AktifSayfaDegis(${SayfaSayısı})" > ${SayfaSayısı}
        </td>`

        // logg("Sayfalayıcı:" + Sayfalayıcı)

        const tr = document.createElement("tr")
        tr.innerHTML = Sayfalayıcı
        tbody.appendChild(tr)
    }


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
      <th scope="col" Id="idSiralamaKriteri_Id"    onClick="SiralamaKriteri_Id(this)">Id</th>
      <th scope="col" Id="idSiralamaKriteri_Baslik" onClick="SiralamaKriteri_Baslik(this)">Başlık</th>
      <th scope="col" Id="idSiralamaKriteri_KId"    onClick="SiralamaKriteri_KId(this)">Kullanıcı Id</th>
      <th scope="col" Id="idSiralamaKriteri_Durum"  onClick="SiralamaKriteri_Durum(this)">Durum</th>
      <th scope="col"></th>
    </tr>
  `;

    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    table.appendChild(tbody);

    const renderItem = (item) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.title}</td>
      <td>${item.userId}</td>
      <td>${item.completed ? "Tamamlandı" : "Yapılacak"}</td>
      <td>
        <button class="btn btn-xs btn-danger  remove" data-id=${item.id}>Sil</button>
        <button class="btn btn-xs btn-warning edit  " data-id=${item.id}>Düzenle</button>
        <button class="btn btn-xs btn-warning Nedit"  data-id=${item.id} onClick="EditClick(this)" >2. Dzn [${item.id}]</button>
      </td>
    `;
        // debugger
        tbody.appendChild(tr);
    };

    const render = () => {

        // for paging (0,15) => (n,n+15) olabilir
        if (SıralayisKriteri > 0) { root.innerHTML = "" }
        if (SıralayisKriteri == 10) { todos.sort((a, b) => { return a.title > b.title }) }
        if (SıralayisKriteri == 11) { todos.sort((b, a) => { return a.title > b.title }) }
        if (SıralayisKriteri == 20) { todos.sort((a, b) => { return a.id > b.id }) }
        if (SıralayisKriteri == 21) { todos.sort((b, a) => { return a.id > b.id }) }
        if (SıralayisKriteri == 30) { todos.sort((a, b) => { return a.completed > b.completed }) }
        if (SıralayisKriteri == 31) { todos.sort((b, a) => { return a.completed > b.completed }) }

        // RenderSayfalayıcı()

        // todos.slice(0, SES).forEach((item) => { renderItem(item); });
        const AS2 = (AktifSayfa - 1) * SES;
        // debugger
        todos.slice(AS2 /*% todos.length*/, AS2 + SES).forEach((item) => { renderItem(item); });
        // debugger

        RenderSayfalayıcı()
    };



    // todosları api'dan al
    fetch(todosUrl)
        .then((resp) => resp.json())
        .then((data = []) => {
            todos = data;
            render();
            root.appendChild(table);
            addEventListeners();
        })
        .catch((error) => { errorLogger(error); });

};

renderTodos();


const AktifSayfaDegis = (Sayfa) => {
    // AktifSayfa += Sayfa
    const as0 = AktifSayfa
    AktifSayfa = Sayfa
    logg(`AS: ${as0} : ${AktifSayfa}`)
    renderTodos()
}

function SiralamaKriteri_Baslik(e) {
    logg("SiralamaKriteri_Baslik", SıralayisKriteri);
    SayfalayıcıSıfırla()
    SıralayisKriteri = 10 + (SıralayisKriteri % 2 == 0 ? 1 : 0)
    renderTodos()
}


const SiralamaKriteri_Id = (e) => {
    logg("SiralamaKriteri_Id", SıralayisKriteri);
    SayfalayıcıSıfırla()
    SıralayisKriteri = 20 + (SıralayisKriteri % 2 == 0 ? 1 : 0)
    renderTodos()
}
const SiralamaKriteri_KId = (e) => {
    logg("SiralamaKriteri_KId", SıralayisKriteri);
    SayfalayıcıSıfırla()
    SıralayisKriteri = 20 + (SıralayisKriteri % 2 == 0 ? 1 : 0)
    renderTodos()
}

const SiralamaKriteri_Durum = (e) => {
    logg("SiralamaKriteri_Durum", SıralayisKriteri);
    SayfalayıcıSıfırla()
    SıralayisKriteri = 30 + (SıralayisKriteri % 2 == 0 ? 1 : 0)
    renderTodos()
}

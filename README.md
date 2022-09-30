
# Sıralama ödevi algoritması

[Netlify: ToDoS App](https://k146-week2-todos.netlify.app/)

[ToDoS.js : Yapılacaklar Ödevi](./index.html) (<http://127.0.0.1:3000/index.html>)

##### todos.js dosyası içerisinde düzenlenecek

table thead kısmındaki sıralama yapılacak kolonlara event listener eklenecek.
event listener hangi kolon için tıklanıyorsa sort metodu kullanılarak sıralama yapılacak.
sıralanmış todos'todus içerisine atılacak.
renderTodos metodu çalıştırılacak.

# HTTP - Fetch Api Ödevi

* README.md dosyası, txt, js dosyası açarak yapılabilir;

* HTTP Status'ün
  * Görevleri nelerdir? Bu görevlerin anlamlarını açıklayınız.

* HTTP Request'in metodlari  nelerdir?
  
* Fetch API'nin metodlari ile örnekleri

___

### * HTTP Status'ün

* Görevleri nelerdir? Bu görevlerin anlamlarını açıklayınız.

    **HTTP Response**; Server'ın "Gelen İsteğe (RQ)" verdiği / vereceği Cevap (RS)'tır.
    **HTTP Response Status Codes**;
      Indicate whether a specific HTTP request has been successfully completed. Responses are grouped in five classes.
      ( Kaynak: <https://developer.mozilla.org/en-US/docs/Web/HTTP/Status> )
      RS'in durumu hakkında bilgi verir. 5 Grupta tanımlanmıştır

        1. Informational responses (100–199)  : Bilgi Amaçlı rs'ler
        2. Successful responses (200–299)     : Olumlu rs'ler
        3. Redirection messages (300–399)     : "Yeniden Yönlendirme" Amaçlı rs'ler
        4. Client error responses (400–499)   : İstemci Bazlı Hata rs'leri
        5. Server error responses (500–599)   : Server Bazlı Hata rs'leri

___

### * HTTP Request'in metodlari  nelerdir?

**HTTP Method'ları ;** ( <https://www.w3schools.com/tags/ref_httpmethods.asp> )

* GET
* POST
* PUT
* HEAD
* DELETE
* PATCH
* OPTIONS
* CONNECT
* TRACE

___

### *  Fetch API'nin metodlari ile örnekleri

### FETCH ÜZERİNE ÖRNEKLER

( <https://jasonwatmore.com/post/2020/11/11/react-fetch-http-delete-request-examples> )

    React + Fetch: GET, POST, PUT
    React + Axios: GET, POST, PUT, DELETE
    Angular: GET, POST, PUT, DELETE
    Vue + Fetch: GET, POST, PUT, DELETE
    Vue + Axios: GET, POST
    Blazor WebAssembly: GET, POST
    Axios: GET, POST, PUT, DELETE
    Fetch: GET, POST, PUT, DELETE

### GET

( <https://ozcanarican.com/article/kodlar/2021-07-29-js-fetch-nasil-kullanilir> )

const result =(){
  fetch('http://example.com/movies.json')
  .then((response) => response.json())
  .then((data) => console.log(data));
}

const verileriOku = async () => {
  const hamVeri = await fetch("https://randomuser.me/api/?results=50");
};

const verileriOku = async () => {
  const hamVeri = await fetch("https://randomuser.me/api/?results=50");
  const jsonSonuc = await hamVeri.json();
  console.log(jsonSonuc);
};

### POST

( <https://ozcanarican.com/article/kodlar/2021-07-29-js-fetch-nasil-kullanilir> )

const fd = new FormData();
fd.append("isim", "ÖZCAN ARICAN");
fd.append("email", "ozcan.arican@birmobil.com");
fd.append("sifre", "sifremcokgizli");
fd.append("telefon", "05330001212");

fetch("https://ozcanarican.com/post.php", {
  method: "POST",
  body: fd,
})
  .then((cevap) => cevap.json())
  .then((json) => dogrula(json));

const dogrula = (json) => {
  if (json.sonuc === "successful") {
    console.log("başarıyla kayıt yapıldı");
  } else {
    console.log("hatalı giriş");
  }
};

### DELETE

useEffect(() => {
    // DELETE request using fetch inside useEffect React hook
    fetch('https://jsonplaceholder.typicode.com/posts/1', { method: 'DELETE' })
        .then(() => setStatus('Delete successful'));

// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, []);

### DELETE + ERR HANDLER

useEffect(() => {
    // DELETE request using fetch with error handling
    fetch('https://jsonplaceholder.typicode.com/invalid-url', { method: 'DELETE' })
        .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            setStatus('Delete successful');
        })
        .catch(error => {
            setErrorMessage(error);
            console.error('There was an error!', error);
        });
}, []);

**Detaylı bilgiler için ;**

* <https://www.bezkoder.com/react-fetch-example/#React_Fetch_example_Overview>


const POKEAPI = "https://pokeapi.co/api/v2/pokemon?offset=50&limit=00";

let html = "";

const getPOKEAPI = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((datos) => {
      fillData(datos.results), pagination(datos);
    })
    .catch((error) => {
      console.log("Error ", error);
    });
};

const getDataImage = (url) => {
  return fetch(url)
    .then((Response) => Response.json())
    .then((datos) => {
      fillDataImage(datos);
    })
    .catch((error) => {
      console.log("error en la api" + error);
    });
};

const fillData = (data) => {
  data.forEach((poke) => {
    getDataImage(poke.url);
  });
};

const fillDataImage = (dataImage) => {
  html += '<div class="col">';
  html += '<div class="card h-100 bg-info bg-light mb-3 ">';
  html += `<img src="${dataImage.sprites.other.dream_world.front_default}" class="card-img-top" alt="...">`;
  html += '<div class="card-body">';
  html += `<h5 class="card-title">${dataImage.name}</h5>`;
  html += `<p>Altura: ${dataImage.height}</p>`;
  html += `<p>Tamaño: ${dataImage.weight}</p>`;
  html += "</div>";
  html += "</div>";
  html += "</div>";

  document.getElementById("pokemon").innerHTML = html;
};

const pagination = (info) => {
  let html = "";

  html += `<ul class="pagination justify-content-center"><liclass="page-item disabled" ${
    info.previous == null ? "disabled" : ""
  }"> <a class= "page-link" onclick="getPOKEAPI('${
    info.previous
  }')"> Prev < </a></li></ul>`;

  html += `<ul class="pagination justify-content-center"><liclass="page-item disabled" ${
    info.next == null ? "disabled" : ""
  }"> <a class= "page-link" onclick="getPOKEAPI('${
    info.next
  }')"> Next > </a></li></ul>`;
  document.getElementById("pagination").innerHTML = html;
};
getPOKEAPI(POKEAPI);

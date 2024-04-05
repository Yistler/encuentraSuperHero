$(document).ready(function () {
  $('.botonHero').on('click', function () {
    //al hacer click valido el numero ingresado
    let numero = parseInt($('#formGroup').val());
    if (numero >= 1 && numero <= 731 && Number.isInteger(numero)) {
      //si cumple la condicion le paso el valor ingresado a la funcion
      superHero(numero);
    } else {
      alert("debe ingresar un numero entre 1 y 731")
    }

  })

  function superHero(id) {
    console.log("el id a buscar es " + id)
    $.ajax({
      type: "GET",
      url: `https://www.superheroapi.com/api.php/4905856019427443/${id}`,
      dataType: "json",
      success: function (datos) {
        let card = `<div class="card mb-3 border-light text-bg-light" style="max-width: 540px;">
      <div class="row g-0">
          <div class="col-md-6 card-imagen">
              
          </div>
          <div class="col-md-6">
              <div class="card-header card-name"></div>
              <div class="card-body">
                  <p class="card-text card-connections"></p>
                  <p class="card-text"><small class="text-body-secondary card-publisher"></small></p>
              </div>
              <ul class="list-group list-group-flush">
                  <li class="list-group-item card-occupation"></li>
                  <li class="list-group-item card-first-appearance"></li>
                  <li class="list-group-item card-height"></li>
                  <li class="list-group-item card-weight"></li>
                  <li class="list-group-item card-aliases"></li>
              </ul>
          </div>
      </div>
  </div>
  `

        $('#card').append(card)
        $('.card-imagen').append(`<img src="${datos.image.url}"class="img-fluid rounded-start" alt="${datos.name}">`)
        $('.card-name').append(`<strong>Nombre: </strong>${datos.name}`)
        $('.card-connections').append(`<strong>Conexiones: </strong>${datos.connections['group-affiliation']}`)
        $('.card-publisher').append(`<strong>Publicado por: </strong>${datos.biography.publisher}`)
        $('.card-occupation').append(`<strong>Ocupación: </strong>${datos.work.occupation}`)
        $('.card-first-appearance').append(`<strong>Primera aparición: </strong>${datos.biography['first-appearance']}`)
        let alturaPies = datos.appearance['height'][0]
        let alturaCm = datos.appearance['height'][1]
        $('.card-height').append(`<strong>Altura: </strong>${alturaPies} - ${alturaCm}`)
        let pesoLb = datos.appearance['weight'][0]
        let pesoKg = datos.appearance['weight'][1]
        $('.card-weight').append(`<strong>Peso: </strong>${pesoLb} - ${pesoKg}`)
        $('.card-aliases').append(`<strong>Alianzas: </strong>${datos.biography.aliases}`)
      },
      error: function (error) {
        console.log(error);
      }
    })
  }

});


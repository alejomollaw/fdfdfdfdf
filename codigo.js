const request = async (cb)=>{
	let res = await axios("detalles.txt");
	cb(res.data);
}

const code = (req)=>{
	// Obtener la data del json
	let data = req;

	// Crear las Cards
	let cardContainer = document.querySelector(".main__card-container");
	const cardsFragment = document.createDocumentFragment();
	for(let i = 0; i < data.length; i++){
		const div = document.createElement("DIV");
		  div.classList.add("card");
		let cardCode = `<!-- Card img container -->
					<div class="card__img-container">
						<img src="img/ropa/img${data.info[i].numero}.jpg" class="card-img">
						<div class="overlay">
							<b style="letter-spacing: .5px;">Ver</b>
						</div>
					</div>`;
		div.innerHTML = cardCode;
		cardsFragment.appendChild(div)
	}
	cardContainer.appendChild(cardsFragment);
	let card = document.querySelectorAll(".card"); //esta variable sirve para el modal
	let cardOverlay = document.querySelectorAll(".overlay"); //esta variable sirve para el modal

	// Crear y abrir modal
	let modal = document.querySelector(".modal");
	let modalInfo = document.querySelector('.js-create');
	let modalImage = document.querySelector(".modal__img");
	for(let i = 0; i < data.length; i++){
		// Este for crea un listener click a todas las cards
		card[i].addEventListener("click",()=>{
			let modalCode = `<!-- Modal info content -->
						<h3 class="modal__item-descripcion fw-m">${data.info[i].descripcion}</h3>
						<div class="flex-items-modal">
							<h3 class="fw-m dir">Modelo: <b>${data.info[i].modelo}</b></h3>
							<h3 class="modal__item-talle fw-m dir">Talle: <b>${data.info[i].talle}</b></h3>
							<h3 class="modal__item-precio fw-m dir">Precio: <span class="green">${data.info[i].precio}</span></h3>
						</div>
						<a href="https://www.instagram.com/m.m.f_indumentaria/" class="modal__item-btn">Ir a ver</a>`;
			  modalInfo.innerHTML = modalCode;
			modalImage.src = `img/ropa/img${i}.jpg`;
			// Este for oculta los overlays para que no molesten al modal
			for(let i = 0; i < data.length; i++){
				cardOverlay[i].style.display = "none";
			}
			document.body.style.overflowY = "hidden"; //este style le quita el scroll al body
			modal.classList.add("aparecer"); //Hace aparecer el modal
		})
	}

	// Cerrar modal
	let modalContainer = document.querySelector(".modal__container");
	modal.addEventListener('click',()=>{ //Este es cuando se hace fuera del modalContainer
		modal.classList.remove("aparecer");
		document.body.style.overflowY = "auto"; //este style le devuelve el scroll al body
		// Este for les devuelve el overlay a las cards
		for(let i = 0; i < data.length; i++){
			cardOverlay[i].style.display = "flex";
		}
	});
	let modalClose = document.querySelector(".cerrar-modal");
	modalClose.addEventListener('click',(e)=>{ //Este es cuando se aprieta la x
		modal.classList.remove("aparecer");
		document.body.style.overflowY = "auto"; //este style le devuelve el scroll al body
		// Este for les devuelve el overlay a las cards
		for(let i = 0; i < data.length; i++){
			cardOverlay[i].style.display = "flex";
		}
		e.stopPropagation();
	});
	// Este es para cuando el modal cambia a movil o tablet
	let modalNoneClose = document.querySelector(".none");
	modalNoneClose.addEventListener('click',(e)=>{ //Este es cuando se aprieta la x
		modal.classList.remove("aparecer");
		document.body.style.overflowY = "auto"; //este style le devuelve el scroll al body
		// Este for les devuelve el overlay a las cards
		for(let i = 0; i < data.length; i++){
			cardOverlay[i].style.display = "flex";
		}
		e.stopPropagation();
	});
	modalContainer.addEventListener('click',(e)=>{ //Este hace que si esta tocando el modal container no se cierre
		e.stopPropagation(); //y aca detiene la propagacion asi no se ejecuta lo demas
	});
}
request(code);

// let descripcionDeLaPaginaWeb = axios("description.json");
// AlePingui06

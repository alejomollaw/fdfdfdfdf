let resultado, data;
const getInfo = async ()=>{
	resultado = await axios("detalles.txt");
	data = resultado.data;
	console.log(resultado);
	cardsCreate();
}
getInfo()

let card;
let modal = document.querySelector(".modal");
let modalImg = document.querySelector(".modal__img");
let infoContainer = document.querySelector('.modal__info-container');
let cerrarModal = document.querySelector('.cerrar-modal');

const cardsCreate = ()=>{
	const fragment = document.createDocumentFragment();
	try{
		for(let i = 0; i < data.length;i++){
			const div = document.createElement("DIV");
			div.classList.add("card");
			let htmlCode = `<!-- Card img container -->
					<div class="card__img-container">
						<img src="img/ropa/img${data.info[i].numero}.jpg" class="card-img">
						<div class="overlay">
							<b style="letter-spacing: .5px;">Ver</b>
						</div>
					</div>`;
			div.innerHTML = htmlCode;
			fragment.appendChild(div);
		}
	}catch(err){
			console.log(err)
			setTimeout(()=>{
				for(let i = 0; i < data.length;i++){
					const div = document.createElement("DIV");
					div.classList.add("card");
					let htmlCode = `<!-- Card img container -->
							<div class="card__img-container">
								<img src="img/ropa/img${data.info[i].numero}.jpg" class="card-img">
								<div class="overlay">
									<b style="letter-spacing: .5px;">Ver</b>
								</div>
							</div>`;
					div.innerHTML = htmlCode;
					fragment.appendChild(div);
				}
			},400)
		}
	document.querySelector(".main__card-container").appendChild(fragment);
	card = document.querySelectorAll(".card");
	overlay = document.querySelectorAll(".overlay");
}


addEventListener('load',()=>{
	try {
		// Crea el contenido del modal al hacer click en la targeta
		for(let i = 0; i < data.length;i++){
			card[i].addEventListener("click",()=>{
				let htmlCode = `
						<h3 class="modal__item-title">
							M&M Focks <span class="cerrar-modal">
						<svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
  							<path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
						</svg>
					</span>
						</h3>
						<h3 class="modal__item-descripcion fw-m">${data.info[i].descripcion}</h3>
						<div class="flex-items-modal">
							<h3 class="fw-m dir">Modelo: <b>${data.info[i].modelo}</b></h3>
							<h3 class="modal__item-talle fw-m dir">Talle: <b>${data.info[i].talle}</b></h3>
							<h3 class="modal__item-precio fw-m dir">Precio: <span class="green">${resultado.data.info[i].precio}</span></h3>
						</div>
						<a href="https://www.instagram.com/m.m.f_indumentaria/" class="modal__item-btn">Ir a ver</a>`;
				infoContainer.innerHTML = htmlCode;
				modalImg.src = `img/ropa/img${i}.jpg`
				modal.classList.add("aparecer");
				for(let i = 0; i < data.length; i++){
					// overlay[i].classList.remove("overlay");
					overlay[i].style.display = "none";
				}
			})
		}
	}
	catch(err) {
		console.log(err);
		setTimeout(()=>{
			for(let i = 0; i < data.length;i++){
				card[i].addEventListener("click",()=>{
					let htmlCode = `
						<h3 class="modal__item-title">
							M&M Focks <span class="cerrar-modal">
						<svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
  							<path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
						</svg>
					</span>
						</h3>
						<h3 class="modal__item-descripcion fw-m">${data.info[i].descripcion}</h3>
						<div class="flex-items-modal">
							<h3 class="fw-m dir">Modelo: <b>${data.info[i].modelo}</b></h3>
							<h3 class="modal__item-talle fw-m dir">Talle: <b>${data.info[i].talle}</b></h3>
							<h3 class="modal__item-precio fw-m dir">Precio: <span class="green">${resultado.data.info[i].precio}</span></h3>
						</div>
						<a href="https://www.instagram.com/m.m.f_indumentaria/" class="modal__item-btn">Ir a ver</a>`;
					infoContainer.innerHTML = htmlCode;
					modalImg.src = `img/ropa/img${i}.jpg`
					modal.classList.add("aparecer");
					for(let i = 0; i < data.length; i++){
						// overlay[i].classList.remove("overlay");
						overlay[i].style.display = "none";
					}
				})
			}
		},400)
	}
	// Quitan el modal
	modal.addEventListener('click',()=>{
		modal.classList.remove("aparecer");
		for(let i = 0; i < data.length;i++){
			overlay[i].style.display = "flex";
		}
	});
	cerrarModal.addEventListener('click',(e)=>{
		modal.classList.remove("aparecer");
		for(let i = 0; i < data.length;i++){
			overlay[i].style.display = "flex";
		}
		e.stopPropagation()
	},true);
	document.querySelector(".modal__container").addEventListener('click',(e)=>{
		e.stopPropagation()
	},true)
});


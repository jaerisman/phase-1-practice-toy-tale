let addToy = false

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json()
    .then(function(toys) {
      toys.forEach(function(toy) {
        let toyCard = document.createElement('div');
        toyCard.className = 'card';

        toyCard.innerHTML = `
          <h2>${toy.name}</h2>
          <img src="${toy.image}" alt="${toy.name}" class="toy-avatar"/>
          <p>${toy.likes} Likes</p>
          <button class="like-btn" id="{toy.id}">Like ❤️</button>
          `;

        let toyCollection = document.getElementById('toy-collection');
        toyCollection.appendChild(toyCard);

        toyCollection.addEventListener('click', function(event){
          if(event.target.classList.contains('like-btn')){
            const toyId = event.target.id;
            const toyLikesElement = event.target.previousElementSibling;
            const currentLikes = parseInt(toyLikesElement.textContent);
            const newLikes = currentLikes + 1;
            fetch(`http://localhost:3000/toys/${toy.id}`, {
              method: 'PATCH',
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: JSON.stringify({
                "likes": newLikes
              })
            })
            .then(function(response) {
              return response.json();
            })
            .then(function(updatedToy){
              const toyCard = event.target.parentNode;
              const toyLikesElement = toyCard.querySelector('p');
              toyLikesElement.textContent = `${updatedToy.likes} Likes`;
            })
          }
        })
      });
    });
    });
});

const submitToyForm = document.querySelector('.add-toy-form')

submitToyForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const toyName = document.querySelector('#toy-name').value;
  const toyImage = document.querySelector('#toy-image').value;
  const newToy = {
    name: toyName,
    image: toyImage,
    likes: 0 
  }
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify(newToy)
  })
  .then(function(response){
    return response.json();
  })
  .then(function(toy){
    let toyCard = document.createElement('div');
    toyCard.className = 'card';

    toyCard.innerHTML =`
      <h2>${toy.name}</h2>
      <img src="${toy.image}" alt="${toy.name}" class="toy-avatar"/>
          <p>${toy.likes} Likes</p>
          <button class="like-btn" id="${toy.id}">Like ❤️</button>
    `;
    
    let toyCollection = document.getElementById('toy-collection');
        toyCollection.appendChild(toyCard);
    
    submitToyForm.reset();
  }) 
})
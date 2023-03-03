
const loadAiUniverse = async() =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayAiUniverse(data.data.tools);
}
// display data in Ui
const displayAiUniverse = aiUniverse => {
const aiContainer = document.getElementById('ai-container')
aiUniverse.forEach(aiElement => {
    console.log(aiElement.features);
    const aiDiv = document.createElement('div')
    aiDiv.classList.add('col')
    // create innerHtml
    aiDiv.innerHTML = `
    <div class="card h-100">
    <img src="${aiElement.image}" class="card-img-top h-100" alt="...">
    <div class="card-body">
      <h5 class="card-title"><strong>Features</strong></h5>
      <p class="card-text"><ol>
      <li>${aiElement.features[0]}</li>
      <li>${aiElement.features[1]}</li>
      <li>${aiElement.features[2]}</li>
   </ol></p>
   <hr>
   <p><strong>${aiElement.name}</strong></p>
   <p> <i class="fas fa-calendar text-secondary"></i> ${aiElement.published_in}</p>
    </div>
  </div>

    `;
    aiContainer.appendChild(aiDiv);
});
}
  
loadAiUniverse();
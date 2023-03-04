const loadAiUniverse = async () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  displayAiUniverse(data.data.tools);
};

const displayAiCard = (aiElement) => {
  const aiDiv = document.createElement("div");
  aiDiv.classList.add("col");
  aiDiv.innerHTML = `
      <div class="card h-100">
        <img src="${aiElement.image}" class="card-img-top h-100" alt="...">
        <div class="card-body">
          <h5 class="card-title"><strong>Features</strong></h5>
          <p class="card-text">
            <ol>
              <li>${aiElement.features[0] ? aiElement.features[0] : ''}</li>
              <li>${aiElement.features[1] ? aiElement.features[1] : ''}</li>
              <li>${aiElement.features[2] ? aiElement.features[2] : ''}</li>
            </ol>
          </p>
          <hr>
          <div class="d-flex align-items-center justify-content-between">
         <div>
         <p><strong>${aiElement.name}</strong></p>
         <p> <i class="fas fa-calendar text-secondary"></i> ${aiElement.published_in}</p>
         </div>
         <div><button onclick="loadAiDetails('${aiElement.id}')" href="#" class="btn text-bg-danger" data-bs-toggle="modal" data-bs-target="#aiDetailModal"><span><i class="fas fa-arrow-right"></i></span></button></div>
         </div>
         </div>
      </div>
    `;
  return aiDiv;
};

const displayAiUniverse = (aiUniverse) => {
  const aiContainer = document.getElementById("ai-container");
  aiContainer.innerHTML = "";

  const limitedAiUniverse = aiUniverse.slice(0, 6);
  limitedAiUniverse.forEach((aiElement) => {
    const aiCard = displayAiCard(aiElement);
    aiContainer.appendChild(aiCard);
  });

  const seeAll = document.getElementById("btn-see-all");
  if (aiUniverse.length > 6) {
    seeAll.classList.remove("d-none");

    seeAll.addEventListener("click", function () {

      seeAll.classList.add("d-none");

      aiContainer.innerHTML = "";

      aiUniverse.forEach((aiElement) => {
        const aiCard = displayAiCard(aiElement);
        aiContainer.appendChild(aiCard);
      });
    });
  }
};

const loadAiDetails = async id => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url)
  const data = await res.json();
  displayAiDetails(data.data);
}
const displayAiDetails = (aiElement) => {
  console.log(aiElement.accuracy.score);
  const modalTitle = document.getElementById('aiDetailModalLabel');

  const aiDetails = document.getElementById('ai-details');
  console.log(aiElement);

  aiDetails.innerHTML = `
 <div class="col">
               <div class="card">
                 <div class="card-body">
                   <h5 class="card-title">${aiElement.description}</h5>
                   <div class="d-flex justify-content-evenly text-warning"><h6 class="card-text"><ul><small>
                    ${aiElement.pricing.map(aiElement => `<li>
                   ${aiElement.price}</li>
                 `).join('')}
                
                 </small></ul></h6>
                 <h6 class="card-text"><ul><small>
                 ${aiElement.pricing.map(aiElement => `<li>
                ${aiElement.plan}</li>
              `).join('')}
              </small></ul></h6>
              
              </div>
              </div>
              <div class=" container d-flex justify-content-between">
              <div><p><strong>Features</strong></p>
              <ul>
              <li><h6><small>${aiElement.features['1'].feature_name ? aiElement.features['1'].feature_name : ''}</small></h6></li>
             <li><h6><small>${aiElement.features['2'].feature_name ? aiElement.features['2'].feature_name : ''}</small></h6></li>
              <li><h6><small>${aiElement.features['3'].feature_name ? aiElement.features['3'].feature_name : ''}</small></h6></li>
              </ul>
              </div>
              <div><p><strong>Integrations</strong></p>
              <ul>
              <li><h6><small>${aiElement.integrations[0] ? aiElement.integrations[0] : ''}</small></h6></li>
             <li><h6><small>${aiElement.integrations[1] ? aiElement.integrations[1] : ''}</small></h6></li>
              <li><h6><small>${aiElement.integrations[2] ? aiElement.integrations[2] : ''}</small></h6></li>
              </ul>
              </div>
              </div>
              </div>
              </div>
            <div class="col">
               <div class="card border-0">
               
    <div class="position-absolute top-0 end-0 pt-2 pe-1">
    <button type="button" class="btn btn-danger">${aiElement.accuracy.score * 100}% accuracy</button>
     </div>
                 <img src="${aiElement.image_link[0]}" class="card-img-top" alt="">
                 <div class="card-body">
                   <h5 class="card-title">${aiElement.input_output_examples['0'].input}</h5>
                   <p class="card-text">${aiElement.input_output_examples['1'].input}</p>
                 </div>
               </div>
             </div>
    `
}


loadAiUniverse();

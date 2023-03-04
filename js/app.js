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
              <li>${aiElement.features[0] ? aiElement.features[0] : 'NO Data found'}</li>
              <li>${aiElement.features[1] ? aiElement.features[1] : 'NO Data found'}</li>
              <li>${aiElement.features[2] ? aiElement.features[2] : 'NO Data found'}</li>
            </ol>
          </p>
          <hr>
          <div class="d-flex">
         <div>
         <p><strong>${aiElement.name}</strong></p>
         <p> <i class="fas fa-calendar text-secondary"></i> ${aiElement.published_in}</p>
         </div>
         <div><button onclick="loadAiDetails('${aiElement.id}')" href="#" class="btn text-bg-danger d-flex me-auto" data-bs-toggle="modal" data-bs-target="#aiDetailModal"><span><i class="fas fa-arrow-right"></i></span></button></div>
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
    console.log(aiElement.pricing);
    const modalTitle = document.getElementById('aiDetailModalLabel');

    const aiDetails = document.getElementById('ai-details');
    console.log(aiElement); 
        
    aiDetails.innerHTML =`
 <div class="col">
               <div class="card">
                 <div class="card-body">
                   <h5 class="card-title">${aiElement.description}</h5>
                   <div class="d-flex justify-content-between text-warning"><p class="card-text"><ul>
                    ${aiElement.pricing.map(aiElement => `<li>
                   ${aiElement.price}</li>
                 `).join('')}
                
                 </ul></p>
                   <p class="card-text">$50/<br>Month<br>Pro</p>
                   <p class="card-text">Contact<br>Us<br>Enterprise</p>
                   </div>
                 </div>
               </div>
             </div>
            <div class="col">
               <div class="card">
                 <img src="${aiElement.image_link[0]}" class="card-img-top" alt="...">
                 <div class="card-body">
                   <h5 class="card-title">Card title</h5>
                   <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                 </div>
               </div>
             </div>
    `
}


loadAiUniverse();

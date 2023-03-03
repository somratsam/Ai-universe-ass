const loadAiUniverse = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayAiUniverse(data.data.tools);
}

const displayAiUniverse = (aiUniverse) => {
    const aiContainer = document.getElementById('ai-container')
    aiContainer.innerHTML = '';
// display default 6 cards

    const limitedAiUniverse = aiUniverse.slice(0, 6);

    limitedAiUniverse.forEach(aiElement => {
        const aiDiv = document.createElement('div')
        aiDiv.classList.add('col')

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
// display all cards

    if (aiUniverse.length > 6) {
        const seeAll = document.getElementById('btn-see-all');
        seeAll.addEventListener('click', function () {
            seeAll.classList.add('d-none');
            aiContainer.innerHTML = '';
            aiUniverse.forEach(aiElement => {
                const aiDiv = document.createElement('div')
                aiDiv.classList.add('col')
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
            
        });

    }
}
loadAiUniverse();

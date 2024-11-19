const strains = [
    { id: 1, name: "Cepa A", ratings: [] },
    { id: 2, name: "Cepa B", ratings: [] },
    { id: 3, name: "Cepa C", ratings: [] }
  ];
  
  const strainList = document.getElementById('strain-list');
  const popularStrains = document.getElementById('popular-strains');
  
  function renderStrains() {
    strainList.innerHTML = '';
    strains.forEach((strain) => {
      const strainItem = document.createElement('div');
      strainItem.className = 'strain';
      strainItem.innerHTML = `
        <span>${strain.name}</span>
        <div class="rating" data-id="${strain.id}">
          ${[...Array(5).keys()]
            .map(
              (i) =>
                `<span class="star" data-value="${i + 1}">★</span>`
            )
            .join('')}
        </div>
      `;
      strainList.appendChild(strainItem);
  
      const stars = strainItem.querySelectorAll('.star');
      stars.forEach((star) =>
        star.addEventListener('click', (e) =>
          rateStrain(strain.id, parseInt(e.target.dataset.value))
        )
      );
    });
  }
  
  function rateStrain(id, rating) {
    const strain = strains.find((s) => s.id === id);
    strain.ratings.push(rating);
    renderStrains();
    updatePopularStrains();
  }
  
  function updatePopularStrains() {
    popularStrains.innerHTML = '';
  
    const sortedStrains = strains
      .map((strain) => ({
        ...strain,
        averageRating:
          strain.ratings.length > 0
            ? strain.ratings.reduce((a, b) => a + b, 0) /
              strain.ratings.length
            : 0,
      }))
      .sort((a, b) => b.averageRating - a.averageRating);
  
    sortedStrains.forEach((strain) => {
      const strainItem = document.createElement('div');
      strainItem.className = 'popular-strain';
      strainItem.innerHTML = `
        <strong>${strain.name}</strong>
        <p>Média: ${strain.averageRating.toFixed(1)} ⭐ (${strain.ratings.length} avaliações)</p>
      `;
      popularStrains.appendChild(strainItem);
    });
  }
  
  renderStrains();
  
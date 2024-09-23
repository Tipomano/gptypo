(function () {
  // Látogatás nyomon követése
  const visitData = {
    url: window.location.href, // Oldal URL-je
    referrer: document.referrer, // Hivatkozási forrás
    screenWidth: window.screen.width, // Képernyő szélessége
    screenHeight: window.screen.height, // Képernyő magassága
    timestamp: new Date().toISOString(), // Látogatás időbélyegzője
  };

  // Adatok küldése a szervernek (például /track URL-re)
  fetch("/TRACK", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(visitData), // Adatok küldése JSON formátumban
  })
    .then((response) => {
      if (!response.ok) {
        console.error("Hiba történt az adatok küldése közben.");
      }
    })
    .catch((error) => {
      console.error("Hálózati hiba: ", error);
    });
})
();

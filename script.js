const participants = [];
const result = [];

function addParticipant() {
  const nameInput = document.getElementById("nameInput");
  const name = nameInput.value.trim();
  
  if (name !== "") {
    participants.push(name);
    nameInput.value = "";
    updateParticipantsList();
  }
}

function updateParticipantsList() {
  const participantsList = document.getElementById("participantsList");
  participantsList.innerHTML = "";
  
  participants.forEach(participant => {
    const listItem = document.createElement("li");
    listItem.textContent = participant;
    participantsList.appendChild(listItem);
  });
}

function assignSecretFriends() {
  if (participants.length < 2) {
    alert("Debe haber al menos dos participantes para hacer el sorteo.");
    return;
  }

  // Reiniciamos el resultado
  result.length = 0;

  const tempParticipants = [...participants];

  // Asignación aleatoria de amigos secretos
  for (let i = 0; i < participants.length; i++) {
    let randomIndex = Math.floor(Math.random() * tempParticipants.length);
    let selectedFriend = tempParticipants[randomIndex];
    
    // Evitar que alguien se saque a sí mismo
    while (participants[i] === selectedFriend) {
      randomIndex = Math.floor(Math.random() * tempParticipants.length);
      selectedFriend = tempParticipants[randomIndex];
    }
    
    result.push({ giver: participants[i], receiver: selectedFriend });
    tempParticipants.splice(randomIndex, 1);
  }

  showResult();
}

function showResult() {
  const resultList = document.getElementById("resultList");
  resultList.innerHTML = "";

  result.forEach(item => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.giver} le regala a ${item.receiver}`;
    resultList.appendChild(listItem);
  });

  const resultDiv = document.getElementById("result");
  resultDiv.classList.remove("hidden");
}

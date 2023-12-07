const towers = document.getElementsByClassName('towers');
const body = document.querySelector('body');
let selectedDisk = null;

for (let i = 0; i < towers.length; i++) {
  towers[i].addEventListener('click', function() {
    if (selectedDisk === null && towers[i].firstElementChild !== null) {
      selectedDisk = towers[i].firstElementChild;
      moveElementWithMouse();
      selectedDisk.remove();
      body.prepend(selectedDisk);
      selectedDisk.style.display = 'none';
      for (let j = 0; j < towers.length; j++) {
        if (towers[j].childElementCount > 0) {
        towers[j].style.paddingTop = 510 - (towers[j].childElementCount * 50) + 'px';
        }
      }
    } else if (selectedDisk !== null && canPlaceDisk(i)) {
      towers[i].prepend(selectedDisk);
      selectedDisk.style.position = '';
      selectedDisk = null;
      for (let j = 0; j < towers.length; j++) {
        if (towers[j].childElementCount > 0) {
        towers[j].style.paddingTop = 510 - (towers[j].childElementCount * 50) + 'px';
        }
      }
      // verifier si on a gagné
      if (towers[2].childElementCount === 10) {
        alert('You win!');
      }
    } 
  });
}

function canPlaceDisk(towersIndex) {
  if (towers[towersIndex].firstElementChild === null || towers[towersIndex].firstElementChild.clientWidth > selectedDisk.clientWidth) {
    return true;
  } else {
    return false;
  }
}

function moveElementWithMouse() {
  document.addEventListener('mousemove', function(event) {
    if (!selectedDisk) {
      return;
    }
    selectedDisk.style.position = 'absolute';
    selectedDisk.style.display = 'flex';
    selectedDisk.style.left = event.clientX - (0.5 * selectedDisk.clientWidth) + 'px';
    selectedDisk.style.top = event.clientY - (1.2 * selectedDisk.clientHeight) + 'px';
  });
}
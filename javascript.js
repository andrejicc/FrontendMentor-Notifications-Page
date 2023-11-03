const nDivs = document.querySelectorAll('.notification-div');
const number = document.querySelector('.number');
const dots = document.querySelectorAll('.dot');
const MarkAsRead = document.querySelector('.read');
MarkAsRead.addEventListener('click', readAll);
MarkAsRead.setAttribute("role", "button");
MarkAsRead.setAttribute("aria-label", "Mark all notifications as read");

let numberOfNotification = ''

function readAll(){
  for(let i=0; i<nDivs.length; i++){
    nDivs[i].style.backgroundColor = 'transparent';
    dots[i].classList.add('read-dot');
    nDivs[i].setAttribute("aria-label", "Notification has been read");
  }
  updateCount();
}

const divElements = Array.from(document.querySelectorAll('.notification-div'));

function updateCount() {
  const unreadDivs = divElements.filter(div => !div.classList.contains('readed'));
  number.textContent = unreadDivs.length;
}

function clickHandler(i) {
    return () => {
        dots[i].classList.add('read-dot');
        nDivs[i].setAttribute("aria-label", "Notification has been read");
        nDivs[i].style.backgroundColor = 'transparent';
        // Remove the event listener from the clicked div
        divElements[i].removeEventListener('click', clickHandler(i));

        // Update notification count
        updateCount();
    };
}

divElements.forEach((div, i) => {
    div.addEventListener('click', clickHandler(i));
    div.setAttribute("role", "button");
    div.setAttribute("tabindex", "0");
    div.setAttribute("aria-label", "Unread Notification");
    
});

updateCount();

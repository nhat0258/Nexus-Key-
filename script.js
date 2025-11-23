const LINK = "https://link-target.net/1450819/ogLjpv5RsBT5";
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');
const closeToastBtn = document.getElementById('closeToast');
const getKeyBtn = document.getElementById('getKeyBtn');

getKeyBtn.addEventListener('click', copyLink);
closeToastBtn.addEventListener('click', hideToast);

function copyLink() {
  let copied = false;

  // Modern Clipboard API (HTTPS + secure context)
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(LINK).then(() => {
      showToast("Your Link Copied! Paste anywhere (Ctrl+V)");
    }).catch(() => {
      copied = fallbackCopy();
    });
  } else {
    copied = fallbackCopy();
  }

  if (!copied) {
    showToast(`Copy manually: <a href="${LINK}" class="toast-link" target="_blank">${LINK}</a>`);
  }
}

function fallbackCopy() {
  const textarea = document.createElement('textarea');
  textarea.value = LINK;
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  const success = document.execCommand('copy');
  document.body.removeChild(textarea);

  if (success) showToast("Your Link Copied! Paste anywhere (Ctrl+V)");
  return success;
}

function showToast(message) {
  toastMessage.innerHTML = message;
  toast.classList.add('show');
  clearTimeout(toast.timeout);
  toast.timeout = setTimeout(hideToast, 5000);
}

function hideToast() {
  toast.classList.remove('show');
}

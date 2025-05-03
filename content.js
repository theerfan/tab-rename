// Function to remove the rename UI
function removeRenameUI() {
  const existingUI = document.getElementById('tab-renamer-ui');
  if (existingUI) {
    existingUI.remove();
  }
}

// Function to create and show the rename UI
function showRenameUI(currentTitle) {
  // Remove any existing UI first
  removeRenameUI();

  // Create container
  const container = document.createElement('div');
  container.id = 'tab-renamer-ui';
  container.style.position = 'fixed';
  container.style.top = '10px';
  container.style.right = '10px';
  container.style.zIndex = '999999'; // Ensure it's on top
  container.style.backgroundColor = '#f9f9f9';
  container.style.border = '1px solid #ccc';
  container.style.padding = '10px';
  container.style.borderRadius = '5px';
  container.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
  container.style.display = 'flex';
  container.style.gap = '5px';

  // Create input field
  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentTitle;
  input.placeholder = 'Enter new tab name';
  input.style.padding = '5px';
  input.style.border = '1px solid #ccc';
  input.style.borderRadius = '3px';

  // Create rename button
  const renameButton = document.createElement('button');
  renameButton.textContent = 'Rename';
  renameButton.style.padding = '5px 10px';
  renameButton.style.border = 'none';
  renameButton.style.backgroundColor = '#007bff';
  renameButton.style.color = 'white';
  renameButton.style.borderRadius = '3px';
  renameButton.style.cursor = 'pointer';

  // Create cancel button
  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.style.padding = '5px 10px';
  cancelButton.style.border = '1px solid #ccc';
  cancelButton.style.backgroundColor = '#eee';
  cancelButton.style.color = '#333';
  cancelButton.style.borderRadius = '3px';
  cancelButton.style.cursor = 'pointer';

  // Append elements
  container.appendChild(input);
  container.appendChild(renameButton);
  container.appendChild(cancelButton);
  document.body.appendChild(container);

  // Focus input and select text
  input.focus();
  input.select();

  // Handle rename action
  const performRename = () => {
    const newTitle = input.value.trim();
    if (newTitle) {
      document.title = newTitle;
      localStorage.setItem('customTabTitle', newTitle); // Persist title
    }
    removeRenameUI();
  };

  // Event listeners
  renameButton.addEventListener('click', performRename);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      performRename();
    } else if (event.key === 'Escape') {
      removeRenameUI();
    }
  });
  cancelButton.addEventListener('click', removeRenameUI);

  // Optional: Click outside to close
  document.addEventListener('click', (event) => {
    if (!container.contains(event.target)) {
      // Check if the click was outside the UI
      // We need a small delay because this listener might fire before the button listeners
      setTimeout(removeRenameUI, 100);
    }
  }, { once: true, capture: true }); // Use capture and once for efficiency
}


// Listen for messages from background script
browser.runtime.onMessage.addListener((request, sender) => {
  if (request.action === 'setTabTitle') { // Keep this for potential future use?
    const newTitle = request.title;
    if (newTitle) {
      document.title = newTitle;
      localStorage.setItem('customTabTitle', newTitle);
    }
  } else if (request.action === 'getTabTitle') {
    return Promise.resolve({ title: document.title });
  } else if (request.action === 'showRenameUI') {
    showRenameUI(request.currentTitle);
  } else if (request.action === 'showRenameFeedback') {
    // Remove this feedback logic as it's replaced by the UI
    // console.log('This tab is selected for renaming...');
  }
});

// On page load, check if there's a custom title to apply
window.addEventListener('load', () => {
  const customTitle = localStorage.getItem('customTabTitle');
  if (customTitle) {
    document.title = customTitle;
  }
});

// Handle page navigation to maintain custom title
window.addEventListener('popstate', () => {
  const customTitle = localStorage.getItem('customTabTitle');
  if (customTitle) {
    setTimeout(() => {
      // Re-apply title if it was changed by navigation
      if (document.title !== customTitle) {
         document.title = customTitle;
      }
    }, 100); // Slight delay
  }
}); 
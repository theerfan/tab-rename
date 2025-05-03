// Create context menu item
browser.contextMenus.create({
  id: "rename-tab",
  title: "Rename Tab",
  contexts: ["tab"]
});

// Handle context menu click
browser.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "rename-tab") {
    try {
      // Send message to content script to show the rename UI
      await browser.tabs.sendMessage(tab.id, {
        action: "showRenameUI",
        currentTitle: tab.title
      });
    } catch (error) {
      // Log error if the content script isn't ready or page doesn't allow it
      console.error("Error sending message to content script:", error);
      // Optionally notify user about the failure
      // browser.notifications.create({ ... }); // Requires 'notifications' permission
    }
  }
}); 
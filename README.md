# Tab Renamer Firefox Extension

A simple Firefox extension that allows you to rename browser tabs through a context menu.

## Features

- Right-click on any tab to rename it
- Simple and intuitive interface
- Preserves original page title on refresh

## Installation

Since this is a temporary extension, you'll need to load it manually in Firefox:

1. Open Firefox and go to `about:debugging`
2. Click on "This Firefox" in the left sidebar
3. Click on "Load Temporary Add-on"
4. Navigate to the extension folder and select the `manifest.json` file

## Usage

1. Right-click on any tab you want to rename
2. Click on "Rename Tab" in the context menu
3. Enter the new name in the prompt window
4. Press Enter to confirm or Cancel to keep the original name

## Note

The renamed tab will revert to its original title if you refresh the page, as this is a limitation of how browser tabs work. The original page title is stored in the webpage's `<title>` tag.

## License

MIT
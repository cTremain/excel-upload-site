# Excel Website Requirements

## Overview

Build a server-backed website that allows users to upload an Excel file, view the spreadsheet content in an Excel-like web interface, edit cells, and download the edited file.

The website is intended to be a demo project. Anyone should be able to use the upload and edit flow without signing in.

## Core User Flow

1. User opens the website.
2. User uploads an Excel file.
3. The file is sent to the server for processing.
4. The website displays the Excel content as an editable spreadsheet grid.
5. User edits cell values directly in the web page.
6. User downloads the updated spreadsheet as an Excel file.

## Functional Requirements

### File Upload

- The website must allow users to upload an Excel file.
- Anyone should be able to upload a file without creating an account or logging in.
- The uploaded file must be sent to the server.
- Uploaded files must be saved permanently on the server.
- The initial supported format should be `.xlsx`.
- The application should validate the uploaded file type.
- The application should show a clear error message for invalid or failed uploads.

### Excel Processing

- The server must read the uploaded Excel file.
- The application only needs to support one worksheet.
- If a workbook contains multiple sheets, the application should use the first sheet by default unless a later requirement changes this behavior.
- Spreadsheet data must be converted into a format the frontend can display and edit.
- Existing formulas should be preserved where possible.
- Existing spreadsheet formatting should be preserved where possible, including colors, bold text, merged cells, and column widths.

### Spreadsheet Display

- The uploaded spreadsheet must be displayed on the website.
- The display should look and feel similar to Excel.
- The grid should include visible rows and columns.
- Users should be able to click into cells and edit values.
- The interface should support common spreadsheet-style navigation where practical.

### Editing

- Users must be able to edit cell values in the browser.
- Edited values must be tracked by the application.
- The edited spreadsheet data must be sent back to the server when preparing the download.
- Cell edits should not intentionally remove formulas or formatting from unrelated cells.

### Download

- Users must be able to download the edited spreadsheet.
- The downloaded file should be in `.xlsx` format.
- The downloaded file should include the user's cell edits.

## Non-Functional Requirements

- The application should be simple and easy to use.
- The upload, edit, and download flow should be clear to the user.
- The page should provide loading and error states.
- The first version should focus on reliability over advanced spreadsheet features.

## Suggested Technical Approach

### Frontend

- Build a web page with an upload control and editable spreadsheet grid.
- Recommended frontend stack: React.
- Recommended grid approach: use an existing spreadsheet/grid library that supports editable cells and an Excel-like experience.

### Backend

- Use a backend server to receive uploads, parse Excel files, and generate downloads.
- Recommended backend stack: Node.js with Express.
- Recommended Excel library: `exceljs`.

## Initial Scope

The first version should include:

- `.xlsx` upload
- Maximum upload size of 10 MB
- Server-side Excel parsing
- Display of one worksheet
- Excel-like editable grid
- Cell value editing
- Download edited spreadsheet as `.xlsx`
- Basic validation, loading, and error messages
- Permanent storage of uploaded files on the server
- No admin/history page in the initial version
- Basic upload validation only

## Out of Scope for Initial Version

The following features are not required for the first version unless added later:

- User accounts or login
- Multiple worksheet selection
- Charts
- Pivot tables
- Collaboration or multi-user editing
- File sharing links
- Admin/history page for saved uploads
- Advanced rate limiting

## Open Questions

1. Should a later version add an admin/history page for permanently saved uploads?
2. Should a later version add stronger security limits, such as rate limiting?

# Excel Website Demo

Upload an `.xlsx` file, edit the first worksheet in an Excel-like grid, and download the edited workbook.

## Run With The Bundled Python Runtime

```bash
C:\Users\cTremain\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe server.py
```

Open `http://localhost:3000`.

If Python is already installed locally with `openpyxl`, you can also run:

```bash
python server.py
```

## MVP Defaults

- Anyone can upload without login.
- Upload limit is 10 MB.
- Uploaded files are saved permanently in `uploads/originals`.
- Edited downloads are saved in `uploads/edited`.
- Only the first worksheet is displayed.
- Existing formulas and formatting are preserved where practical by applying edits to the original workbook with `openpyxl`.

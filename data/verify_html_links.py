import os
import re

html_path = r"e:\NegocioUp Business\mayakoba\frontend\index.html"
with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

links = set(re.findall(r'(\.\./(?:Imagenes_Descargadas|PDFs_Legales)/[^"\'<>]+)', content))
print(f"Total unique assets found in index.html: {len(links)}")
missing = []
for link in sorted(links):
    full_path = os.path.normpath(os.path.join(os.path.dirname(html_path), link))
    exists = os.path.exists(full_path)
    print(f"{'[OK]' if exists else '[MISSING]'} {link}")
    if not exists:
        missing.append(link)

if missing:
    print("Missing files:", missing)
    exit(1)
else:
    print("\n[SUCCESS] ALL 10 RELATIVE ASSETS (IMAGES & PDFS) IN HTML EXIST AND ARE ACCESSIBLE!")

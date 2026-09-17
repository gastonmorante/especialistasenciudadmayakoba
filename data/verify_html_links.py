import os
import re

def check_html(path, base_dir):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    srcs = re.findall(r'src=[\x22\x27]([^\x22\x27]+)[\x22\x27]', content)
    hrefs = re.findall(r'href=[\x22\x27]([^\x22\x27]+)[\x22\x27]', content)
    local_refs = sorted(set([r for r in (srcs + hrefs) if not r.startswith('http') and not r.startswith('#') and not r.startswith('data:') and not r.startswith('tel:') and not r.startswith('mailto:')]))
    
    print(f"=== Verificando {path} ({len(local_refs)} referencias locales) ===")
    missing = []
    for ref in local_refs:
        full_path = os.path.normpath(os.path.join(base_dir, ref))
        if os.path.exists(full_path):
            print(f"  [OK] {ref}")
        else:
            print(f"  [MISSING] {ref} -> {full_path}")
            missing.append(ref)
            
    if missing:
        print(f"\n[ERROR] Faltan {len(missing)} archivos en {path}.")
        return False
    else:
        print(f"[EXITOSO] Todos los {len(local_refs)} activos de {path} existen en disco.\n")
        return True

if __name__ == "__main__":
    ok1 = check_html("index.html", ".")
    ok2 = check_html("frontend/index.html", "frontend")
    if not (ok1 and ok2):
        exit(1)
    print("[TODO VERIFICADO AL 100% EN DISCO]")

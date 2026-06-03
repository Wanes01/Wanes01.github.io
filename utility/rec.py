#!/usr/bin/env python3
import shutil
import re
from pathlib import Path

SRC_DIR = "./doodles"
DST_DIR = "./doodles_dark"

COLOR_RULES = [
    ("#0066cc", "#4d9de0"),  # ocean
    ("#f26419", "#f57c3a"),  # blaze
    ("#212529", "#f4f4f6"),  # carbon to paper
    ("#e2e8f0", "#212529"),  # background icone work ed edu to carbon
]

RESET  = "\033[0m";  BOLD   = "\033[1m"
CYAN   = "\033[36m"; GREEN  = "\033[32m"
YELLOW = "\033[33m"; RED    = "\033[31m"

def info(msg):    print(f"{CYAN}[INFO]{RESET}  {msg}")
def ok(msg):      print(f"{GREEN}[OK]{RESET}    {msg}")
def warn(msg):    print(f"{YELLOW}[WARN]{RESET}  {msg}")
def error(msg):   print(f"{RED}[ERR]{RESET}   {msg}")


def build_replacer(rules: list[tuple[str, str]]):
    compiled = [(re.compile(re.escape(old), re.IGNORECASE), new)
                for old, new in rules]

    def replace_all(text: str) -> str:
        for pattern, new in compiled:
            text = pattern.sub(new, text)
        return text

    return replace_all


def main():
    src = Path(SRC_DIR)
    dst = Path(DST_DIR)

    if not src.is_dir():
        error(f"Cartella sorgente non trovata: '{src}'")
        error("Modifica SRC_DIR nella sezione CONFIGURAZIONE.")
        raise SystemExit(1)

    if not COLOR_RULES:
        error("Nessuna regola definita in COLOR_RULES.")
        raise SystemExit(1)

    info(f"Sorgente : {BOLD}{src.resolve()}{RESET}")
    info(f"Dest.    : {BOLD}{dst.resolve()}{RESET}")

    if dst.exists():
        warn(f"'{dst}' esiste già — verrà eliminata e ricreata.")
        shutil.rmtree(dst)

    shutil.copytree(src, dst)
    ok("Cartella copiata.")

    print()
    for i, (old, new) in enumerate(COLOR_RULES, 1):
        info(f"Regola {i}: {BOLD}{old}{RESET} → {BOLD}{new}{RESET}")
    print()

    replacer = build_replacer(COLOR_RULES)

    svg_files = list(dst.rglob("*.svg"))

    if not svg_files:
        warn(f"Nessun file .svg trovato in '{src}'.")
        raise SystemExit(0)

    changed = 0
    for svg in svg_files:
        original = svg.read_text(encoding="utf-8", errors="replace")
        updated  = replacer(original)

        svg.write_text(updated, encoding="utf-8")

        if original != updated:
            changed += 1
            info(f"  modificato → {svg.relative_to(dst)}")

    print()
    ok(f"Elaborati {len(svg_files)} file SVG, {changed} modificati.")
    print(f"\n{GREEN}{BOLD}✔ Completato.{RESET} File recolorati in: {BOLD}{dst.resolve()}{RESET}")


if __name__ == "__main__":
    main()
#!/usr/bin/env python3
"""Restore illustration sources, remove backgrounds with rembg, strip checker leftovers."""

from __future__ import annotations

import io
import shutil
from pathlib import Path

from PIL import Image
from rembg import remove

ROOT = Path(__file__).resolve().parents[1]
ILLU = ROOT / "public/images/illustrations"
ASSETS = Path("/Users/eve/.cursor/projects/Users-eve-Desktop/assets")
PREV = ROOT / "meow/style-previews"

SOURCES: dict[str, Path] = {
    "pets-trio-group.png": ASSETS / "pets-trio-group.png",
    "characters/cat/cat-sitting-curious.png": PREV / "style-preview-BC-hybrid.png",
    "characters/cat/cat-lying-belly.png": PREV / "style-preview-BC-hybrid-lying.png",
    "characters/cat/cat-pounce.png": ASSETS / "cat-pounce.png",
    "characters/cat/cat-side-rest.png": ASSETS / "cat-side-rest.png",
    "characters/dog/dog-sitting-happy.png": ASSETS / "dog-sitting-happy.png",
    "characters/dog/dog-head-tilt.png": ASSETS / "dog-head-tilt.png",
    "characters/dog/dog-sniffing.png": ASSETS / "dog-sniffing.png",
    "characters/dog/dog-trotting.png": ASSETS / "dog-trotting.png",
    "characters/fox/fox-sitting.png": ASSETS / "fox-sitting-v2.png",
    "characters/fox/fox-reading.png": ASSETS / "fox-reading-v2.png",
    "characters/fox/fox-playful.png": ASSETS / "fox-playful-v2.png",
}

CHECKER_COLORS = [
    (255, 255, 255),
    (254, 254, 254),
    (253, 253, 253),
    (252, 252, 252),
    (204, 204, 204),
    (207, 207, 207),
    (203, 203, 203),
    (205, 205, 205),
    (192, 192, 192),
    (238, 238, 238),
    (221, 221, 221),
    (187, 187, 187),
    (153, 153, 153),
    (128, 128, 128),
]


def near_checker(r: int, g: int, b: int, tol: int = 6) -> bool:
    if abs(r - g) > tol or abs(g - b) > tol:
        return False
    return any(all(abs(channel - c) <= tol for channel, c in zip((r, g, b), color)) for color in CHECKER_COLORS)


def strip_checker(img: Image.Image) -> Image.Image:
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a > 0 and near_checker(r, g, b):
                px[x, y] = (r, g, b, 0)
    return img


def process_file(dst: Path, src: Path | None = None) -> None:
    if src and src.exists():
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy(src, dst)
    elif not dst.exists():
        print(f"skip missing {dst}")
        return

    with dst.open("rb") as f:
        out = remove(f.read())
    img = Image.open(io.BytesIO(out)).convert("RGBA")
    img = strip_checker(img)
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
    img.save(dst, "PNG")
    print(f"ok {dst.relative_to(ROOT)} {img.size}")


def main() -> None:
    for rel, src in SOURCES.items():
        process_file(ILLU / rel, src)

    # also fix any other png already in illustrations tree
    for path in sorted(ILLU.rglob("*.png")):
        rel = str(path.relative_to(ILLU))
        if rel not in SOURCES:
            process_file(path)


if __name__ == "__main__":
    main()

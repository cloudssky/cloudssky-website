#!/usr/bin/env python3
"""Deterministic transparent PNG exports from approved CSG SVG sources."""
from pathlib import Path
import cairosvg

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "branding" / "logo" / "exports"

SIZES = {"signature": [800, 1200, 1600], "monogram": [400, 600, 900]}
for variant, widths in SIZES.items():
    for tone in ("dark", "light"):
        input_svg = SOURCE / f"csg-{variant}-{tone}-transparent.svg"
        for width in widths:
            output = SOURCE / f"csg-{variant}-{tone}-transparent-{width}.png"
            cairosvg.svg2png(url=str(input_svg), write_to=str(output), output_width=width)
            print(f"exported {output.relative_to(ROOT)}")

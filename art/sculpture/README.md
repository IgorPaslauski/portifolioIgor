# Signature Lock — export pipeline

## Rebuild
```
blender --background --python art/sculpture/build_signature_lock.py
```

## Outputs
- `signature_lock.blend` — source of truth (Z-up, five meshes)
- `public/sculpture/monogram.glb` — named meshes: spine, bowl, cap, key, pin
- `renders/front.png` — frontal elevation
- `renders/three_quarter.png` — ¾ hero framing
- `renders/exploded.png` — architecture reveal

## Runtime
Pivots sit on assembly joints. Closed pose = zero local offset from authored rest.

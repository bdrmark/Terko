# Directive: Advanced Image Reconstruction (Photorealistic Street Renovation)

## Goal
Perform a photorealistic reconstruction of a street scene by replacing its pavement while preserving the original architecture, lighting, and geometry.

## Input Requirements
- **Image A (Pavement Reference)**: Provides the texture, color, and pattern of the new pavement.
- **Image B (Scene Reference)**: Provides the environment (buildings, lighting, camera angle) to be preserved.

## Core SOP (Nano Banana Pro)

### Objective
Recreate Image B, but replace its ground surface with the pavement from Image A, ensuring:
- Pavement looks physically installed, not overlaid.
- Perspective, scale, and vanishing lines are mathematically correct.
- Lighting, shadows, and wear match the environment.
- Result is indistinguishable from a real photograph.

### Execution Steps
1. **Extract Pavement DNA (Image A)**: Dimensions, pattern logic, color variation, surface roughness, grout spacing.
2. **Extract Scene Geometry (Image B)**: Camera height, vanishing points, street slope, building-ground contact lines, lighting direction.
3. **Perspective Mapping**: Warp pavement pattern to follow street slope and compress naturally toward the horizon.
4. **Physical Integration**: Tuck pavement under buildings/curbs; ensure no floating tiles or seams.
5. **Lighting & Realism Pass**: Match global illumination, apply correct shadow falloff, preserve natural imperfections.

### Constraints
- ❌ NO changes to buildings, colors, or architecture from Image B.
- ❌ NO stylization or "improvement" of the scene.
- ❌ NO invented patterns or unnatural blurring.
- ✅ Pavement MUST match Image A exactly.
- ✅ Scene composition MUST match Image B exactly.

## Execution Tool
- `execution/nano_banana_pro.py`

## Output
- A single photorealistic image with the same resolution and framing as Image B.

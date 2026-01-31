
# Hardscaping Visualization Website Template

A clean, modern website template for a hardscaping business where customers can upload backyard photos and preview different pavement stone options. Ready to connect to OpenRouter when deployed to Vercel.

---

## Page Structure

### Hero Section
- Bold headline: "Visualize Your Dream Backyard"
- Subheadline explaining the service
- Clean, minimal design with professional typography
- Smooth scroll to the visualization tool

### Visualization Tool Section
A card-based interface with:

1. **Image Upload Area**
   - Drag-and-drop zone with upload button
   - Image preview after upload
   - Option to remove/change image

2. **Stone Type Selector**
   - Grid of stone options with visual thumbnails:
     - Flagstone
     - Brick Pavers
     - Concrete Pavers
     - Cobblestone
     - Slate
   - Clear selection state for chosen stone

3. **Generate Button**
   - Prominent CTA to trigger the AI transformation
   - Loading state with spinner/progress indicator
   - *Note: Will show placeholder behavior until you wire up OpenRouter*

4. **Result Display**
   - Side-by-side or toggle view of original vs. generated image
   - Download option for the result

5. **Request Quote Form**
   - Appears after generation
   - Fields: Name, Email, Phone, Address, Message
   - Submit button sends data (form ready for backend integration)
   - Success confirmation message

---

## Design Details

- **Style**: Clean, modern, lots of whitespace
- **Colors**: Neutral palette with subtle accent color
- **Typography**: Professional, readable fonts
- **Responsive**: Works on desktop, tablet, and mobile
- **Interactions**: Subtle hover effects, smooth transitions

---

## Technical Notes

The template will include placeholder functions where you can add your OpenRouter API calls:
- `generateVisualization()` - where AI image editing will happen
- Form submission handler ready for your backend

You'll be able to add your OpenRouter API key as an environment variable in Vercel and wire up the API calls in these placeholder functions.


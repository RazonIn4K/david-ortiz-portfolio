#!/bin/bash

# Add images to Prime Properties
sed -i.bak '6a\
    <meta http-equiv="Content-Security-Policy" content="default-src '\''self'\''; script-src '\''self'\'' '\''unsafe-inline'\'' https://cdn.tailwindcss.com; connect-src '\''self'\''; frame-src '\''none'\''; img-src '\''self'\'' data: blob: https://images.unsplash.com; style-src '\''self'\'' '\''unsafe-inline'\'' https://fonts.googleapis.com; font-src '\''self'\'' https://fonts.gstatic.com; object-src '\''none'\''; base-uri '\''self'\''; form-action '\''self'\''; frame-ancestors '\''self'\''">
' projects/prime-properties/index.html

sed -i.bak 's|/assets/placeholders/prime-hero.svg|https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600\&q=80|g' projects/prime-properties/index.html
sed -i.bak 's|/assets/placeholders/prime-property.svg|https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800\&q=80|g' projects/prime-properties/index.html
sed -i.bak 's|/assets/placeholders/prime-agent.svg|https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600\&q=80|g' projects/prime-properties/index.html

# Add images to PowerFit Studios
sed -i.bak '6a\
    <meta http-equiv="Content-Security-Policy" content="default-src '\''self'\''; script-src '\''self'\'' '\''unsafe-inline'\'' https://cdn.tailwindcss.com; connect-src '\''self'\''; frame-src '\''none'\''; img-src '\''self'\'' data: blob: https://images.unsplash.com; style-src '\''self'\'' '\''unsafe-inline'\'' https://fonts.googleapis.com; font-src '\''self'\'' https://fonts.gstatic.com; object-src '\''none'\''; base-uri '\''self'\''; form-action '\''self'\''; frame-ancestors '\''self'\''">
' projects/powerfit-studios/index.html

sed -i.bak 's|/assets/placeholders/powerfit-hero.svg|https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600\&q=80|g' projects/powerfit-studios/index.html
sed -i.bak 's|/assets/placeholders/powerfit-class.svg|https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800\&q=80|g' projects/powerfit-studios/index.html

# Add images to Urban Thread
sed -i.bak '6a\
    <meta http-equiv="Content-Security-Policy" content="default-src '\''self'\''; script-src '\''self'\'' '\''unsafe-inline'\'' https://cdn.tailwindcss.com; connect-src '\''self'\''; frame-src '\''none'\''; img-src '\''self'\'' data: blob: https://images.unsplash.com; style-src '\''self'\'' '\''unsafe-inline'\'' https://fonts.googleapis.com; font-src '\''self'\'' https://fonts.gstatic.com; object-src '\''none'\''; base-uri '\''self'\''; form-action '\''self'\''; frame-ancestors '\''self'\''">
' projects/urban-thread/index.html

sed -i.bak 's|/assets/placeholders/urban-hero.svg|https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600\&q=80|g' projects/urban-thread/index.html
sed -i.bak 's|/assets/placeholders/urban-product.svg|https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600\&q=80|g' projects/urban-thread/index.html

# Clean up backup files
rm -f projects/*/index.html.bak

echo "✅ All images added successfully!"

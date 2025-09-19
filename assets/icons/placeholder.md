# Skill Icons Directory

This directory should contain optimized skill icons for the portfolio website.

## Icon Requirements

- **Format**: SVG preferred, PNG as fallback
- **Size**: Maximum 50KB per icon
- **Dimensions**: 64x64px recommended
- **Optimization**: Use tools like SVGO for SVG optimization

## Required Icons

Based on the skills section in index.html, you'll need icons for:

1. `github.svg` - GitHub
2. `aws.svg` - Amazon Web Services
3. `gcp.svg` - Google Cloud Platform
4. `azure.svg` - Microsoft Azure
5. `datadog.svg` - Datadog
6. `beautiful-ai.svg` - Beautiful.ai
7. `postgresql.svg` - PostgreSQL
8. `mysql.svg` - MySQL
9. `python.svg` - Python
10. `sql.svg` - SQL
11. `docker.svg` - Docker
12. `kubernetes.svg` - Kubernetes
13. `terraform.svg` - Terraform
14. `monitoring.svg` - Monitoring
15. `analytics.svg` - Analytics

## Icon Sources

### Free Icon Libraries
- **Heroicons**: https://heroicons.com/
- **Feather Icons**: https://feathericons.com/
- **Simple Icons**: https://simpleicons.org/
- **DevIcons**: https://devicon.dev/
- **Tabler Icons**: https://tabler-icons.io/

### Brand Icons
- Most technology companies provide official brand assets
- Check the official websites for brand guidelines and downloadable icons
- Ensure you comply with brand usage guidelines

## Usage in HTML

Icons are referenced in the HTML like this:
```html
<img src="assets/icons/github.svg" alt="GitHub" class="skill-icon" loading="lazy">
```

## Accessibility

- Always include descriptive `alt` text
- Icons should be decorative since they have text labels
- Ensure sufficient color contrast if icons have color

## Performance Tips

1. **Optimize SVGs**: Remove unnecessary metadata and comments
2. **Use SVG sprites**: Consider combining frequently used icons
3. **Lazy loading**: Icons are set to `loading="lazy"` for better performance
4. **Fallback images**: Have PNG fallbacks for older browsers if needed

## Replacement Instructions

1. Download or create your icons
2. Optimize them for web use
3. Save them in this directory with the exact filenames listed above
4. Test the website to ensure all icons load correctly
5. Update the `alt` text if needed for better accessibility
## MODIFIED Requirements

### Requirement: Brand asset usage
The system SHALL use the official YM² brand assets for their designated
purposes: the light-background logo variant on any light-colored surface,
the dark-background logo variant on any dark-colored surface (including the
default dark navbar/footer), and the supplied icon artwork (a cropped,
square derivation of the YM² wordmark) as the site favicon, the PWA/app
icon, and the source for the social share (Open Graph) image.

#### Scenario: Logo contrast on dark navbar
- **WHEN** the navbar (dark surface) is rendered
- **THEN** the logo variant intended for dark backgrounds is used, and the
  logo remains legible against the surface

#### Scenario: Favicon and share image are branded
- **WHEN** the site is loaded in a browser tab or shared as a link
- **THEN** the browser tab icon and the link preview image both derive from
  the official YM² icon artwork, not a generic placeholder or the retired
  MFlow mark

```scss
$color: red;

@mixin generateContent( $otherColor: $color ) {
      background-color: $otherColor;
}

body {
  @include generateContent();
}

```

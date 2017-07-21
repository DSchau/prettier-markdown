```javascript
import React from 'react';

const Heading = (props) => <h1 {...props}    >{props.children   }</h1>

export     default   function HelloWorld({prop, otherProp, anotherProp, anotherOtherProp,    ...rest}) {
  const { destructured} = prop;

  return (
         <div className="asdf">
      <Heading prop={prop} otherProp={otherProp} anotherProp={anotherProp} anotherOtherProp={anotherOtherProp}          {...rest}>asdfasdfasdfasdfadsfasdfasdf</Heading>
    </div>
  )
}
```

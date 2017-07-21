```typescript{1,2,3-5}
import { Component, OnInit } from  "@angular/core";

@Component({
  selector: 'sample-hello-world',
templateUrl: './hello-world.html',
    styleUrls: ['./hello-world.scss']
})
export default    class  HelloWorld implements  OnInit {
  ngOnInit() {
    console.log('on init') ;
  }
} 
```

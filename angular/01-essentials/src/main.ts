import { bootstrapApplication } from "@angular/platform-browser";

import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent).catch((err) => console.error(err));

/*
  main.ts

  - bootstrapApplication
    - 컴포넌트를 인자로 받음
    - 인자로 받은 컴포넌트의 selector의 값을 식별자로하여 index.html에서 동일한 이름의 태그를 찾음
    - 만약 해당 태그가 존재한다면, 해당 태그 위치에 해당 컴포넌트 마크업으로 대체함 
*/

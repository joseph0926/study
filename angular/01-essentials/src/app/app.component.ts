import { Component } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { UserComponent } from "./user/user.component";
import { DUMMY_USERS } from "../data/dummy-users";

/*
  - @Component
    - 일반 자바스크립트 class가 해당 `@Component` 데코레이터로 인해 angular 컴포넌트로 변환됨
    - 해당 데코레이터는 인자로 객체를 받음
      - 객체에는 컴포넌트에 대한 구성이 존재
*/

@Component({
  selector: "app-root", // html에서 어떤 요소를 찾아서 대체해야할지 알려줌
  standalone: true,
  imports: [HeaderComponent, UserComponent], // 해당 컴포넌트 마크업(html)에 사용되는 다른 컴포넌트를 임포트함
  templateUrl: "./app.component.html", // html 요소를 대체하는 마크업
  styleUrl: "./app.component.css", // 로컬 스타일임 - 스타일이 해당 컴포넌트에만 적용됨
  // styleUrls: [] => 예전 angular 버전에는 styleUrl이 존재하지 않음,, 오직 styleUrls를 사용
})
export class AppComponent {
  users = DUMMY_USERS;
}

import { Component } from "@angular/core";

import { DUMMY_USERS } from "../../data/dummy-users";

@Component({
  selector: "app-user",
  standalone: true,
  imports: [],
  templateUrl: "./user.component.html",
  styleUrl: "./user.component.css",
})
export class UserComponent {
  selectedUser: UserType = DUMMY_USERS[0];

  get imagePath() {
    return "assets/users/" + this.selectedUser.avatar;
  }

  onSelectUser() {
    const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
    this.selectedUser = DUMMY_USERS[randomIndex];
  }
}

/*
  - 기본적으로 Angular는 자동으로 상태 변경을 감지하고, UI 변경을 수행한다

  - Angular가 상태 변경을 감지하는 메커니즘 (Angular v2 ~)
    - 상태 변경을 자동으로 감지하는 것은 Angular 기본 내장 패키지인 zone.js에 의해서 이루어짐
    1. `zone.js`는 가능한 모든 사용자 이벤트, 브라우저 이벤트 등을 자동으로 수신함
    2. 만약 이벤트가 발생하면 `zone.js`는 모든 angular 컴포넌트를 확인하면서 상태 변경을 체크함
    3. 변경된 상태를 기반으로 UI를 업데이트함
  
  - Angular가 상태 변경을 감지하는 메커니즘 (Angular v16 ~)
    - 
*/

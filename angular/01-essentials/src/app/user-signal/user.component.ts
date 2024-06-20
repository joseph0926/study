import { Component, computed, input, signal } from "@angular/core";

import { DUMMY_USERS } from "../../data/dummy-users";

@Component({
  selector: "app-user-signal",
  standalone: true,
  imports: [],
  templateUrl: "./user.component.html",
  styleUrl: "./user.component.css",
})
export class UserSignalComponent {
  avatar = input.required<string>();
  name = input.required<string>();

  onSelectUser() {
    const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
    this.selectedUser.set(DUMMY_USERS[randomIndex]); // set(): singal이 상태를 업데이트하는 방법
  }
}

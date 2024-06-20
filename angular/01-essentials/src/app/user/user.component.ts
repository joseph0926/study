import { Component, Input } from "@angular/core";

@Component({
  selector: "app-user",
  standalone: true,
  imports: [],
  templateUrl: "./user.component.html",
  styleUrl: "./user.component.css",
})
export class UserComponent {
  @Input({ required: true }) avatar!: string;
  @Input({ required: true }) name!: string;
  // @Input(): 컴포넌트 외부에서 값을 설정할 수 있게 해줌

  get imagePath() {
    return "assets/users/" + this.avatar;
  }

  onSelectUser() {}
}

import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-user",
  standalone: true,
  imports: [],
  templateUrl: "./user.component.html",
  styleUrl: "./user.component.css",
})
export class UserComponent {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) avatar!: string;
  @Input({ required: true }) name!: string;
  @Output() select = new EventEmitter<string>();
  // EventEmitter()를 통해 커스텀 값을 해당 변수에 담아 어떤 상위 컴포넌트로든 내보낼 수 있음

  get imagePath() {
    return "assets/users/" + this.avatar;
  }

  onSelectUser() {
    this.select.emit(this.id);
    // select에 id를 담아 상위 컴포넌트로 보냄
  }
}

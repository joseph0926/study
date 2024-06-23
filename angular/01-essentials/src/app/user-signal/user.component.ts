import { Component, InputSignal, computed, input, output } from "@angular/core";

@Component({
  selector: "app-user-signal",
  standalone: true,
  imports: [],
  templateUrl: "./user.component.html",
  styleUrl: "./user.component.css",
})
export class UserSignalComponent {
  id = input.required<string>();
  avatar = input.required<string>();
  name = input.required<string>();
  select = output<InputSignal<string>>();
  // output은 signal, input등과 달리 signal과 관련없는 이벤트이미터임

  imagePath = computed(() => "assets/users/" + this.avatar());

  onSelectUser() {
    this.select.emit(this.id);
  }
}

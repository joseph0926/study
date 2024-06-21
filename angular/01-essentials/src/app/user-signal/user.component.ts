import { Component, computed, input } from "@angular/core";

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

  imagePath = computed(() => "assets/users/" + this.avatar());

  onSelectUser() {}
}

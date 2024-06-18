import { Component } from "@angular/core";

@Component({
  selector: "app-header", // 관해적으로 selector의 이름은 xxx-컴포넌트명 으로 명명함 (충돌 방지)
  standalone: true, // 해당 컴포넌트를 standalone component로 설정함 (다른 컴포넌트 타입: module base component)
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {}

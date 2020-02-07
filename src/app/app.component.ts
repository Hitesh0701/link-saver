import { Component, OnInit } from "@angular/core";
import { SPINNER } from "ngx-ui-loader";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "link-saver-frontend";
  SPINNER: SPINNER;
  fgsType: any;
  fgsSize: number;
  pbColor: string;

  ngOnInit() {
    this.fgsType = SPINNER.squareLoader;
  }
}

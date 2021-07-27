import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  newProduct() {
    window.location.href = `/produto/post`;
  }

  voltar(): void {
    window.history.back();
  }

}
